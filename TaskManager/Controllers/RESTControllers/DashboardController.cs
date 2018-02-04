using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using TaskManager.Models.Entities;
using System.IdentityModel.Tokens.Jwt;

namespace TaskManager.Controllers.RESTControllers
{
    [Route("api/[controller]")]
    public class DashboardController : Controller
    {
        private readonly ClaimsPrincipal _caller;
        private readonly UserManager<User> _userManager;

        public DashboardController(UserManager<User> userManager, IHttpContextAccessor httpContextAccessor)
        {
            _caller = httpContextAccessor.HttpContext.User;
            _userManager = userManager;
        }

        [Authorize(Policy = "UserOnly")]
        [HttpGet]
        public async Task<User> Home()
        {            
            var userName = _caller.Claims.Single(c => c.Type == JwtRegisteredClaimNames.Sub).Value;
            
            return await _userManager.FindByNameAsync(userName);
        }

        [Authorize(Policy = "UserOnly")]
        [HttpPut]
        public async Task<IActionResult> UpdateUserProfile([FromBody] User userProfile)
        {
            if (userProfile == null)
            {
                return BadRequest();
            }

            var userName = _caller.Claims.Single(c => c.Type == JwtRegisteredClaimNames.Sub).Value;

            User existingUser = _userManager.FindByNameAsync(userName).Result;
            if (existingUser == null)
            {
                return NotFound();
            }

            existingUser.FirstName = userProfile.FirstName;
            existingUser.LastName = userProfile.LastName;

            await _userManager.UpdateAsync(existingUser);

            return new NoContentResult();
        }
    }
}
