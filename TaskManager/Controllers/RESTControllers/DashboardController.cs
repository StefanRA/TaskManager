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
using TaskManager.Models.DataTransferObjects;

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
        public async Task<UserProfileDTO> GetCurrentUserProfile()
        {            
            var userName = _caller.Claims.Single(c => c.Type == JwtRegisteredClaimNames.Sub).Value;
            
            var user = await _userManager.FindByNameAsync(userName);
            
            var userProfile = new UserProfileDTO
            {
                Id = user.Id,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email
            };
            return userProfile;
        }

        [Authorize(Policy = "UserOnly")]
        [HttpPut]
        public async Task<IActionResult> UpdateUserProfile([FromBody] UserProfileDTO userProfile)
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
            existingUser.Email = userProfile.Email;

            await _userManager.UpdateAsync(existingUser);

            return new NoContentResult();
        }
    }
}
