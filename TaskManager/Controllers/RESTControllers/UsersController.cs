using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Models.EntityRepositories;
using TaskManager.Models.Entities;
using Microsoft.AspNetCore.Identity;

namespace TaskManager.Controllers.RESTControllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly UserManager<User> _userManager;

        public UsersController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }
        
        [HttpGet]
        public IEnumerable<User> GetAll()
        {
            return _userManager.Users.ToList();
        }
        
        [HttpGet("{id}")]
        public async Task<User> Get(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }
        
        [HttpPost]
        public IActionResult Post([FromBody]User user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            _userManager.CreateAsync(user);
            return new ObjectResult(user);
        }
        
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            var result = await _userManager.DeleteAsync(user);
            return Ok();
        }
    }
}
