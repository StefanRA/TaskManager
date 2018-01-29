using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Models.EntityRepositories;
using TaskManager.Models.Entities;

namespace TaskManager.Controllers.RESTControllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        
        [HttpGet]
        public IEnumerable<User> GetAll()
        {
            return _userRepository.GetAll();
        }
        
        [HttpGet("{id}")]
        public User Get(int id)
        {
            return _userRepository.Get(id);
        }
        
        [HttpPost]
        public IActionResult Post([FromBody]User user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            _userRepository.Add(user);
            return new ObjectResult(user);
        }
        
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _userRepository.Remove(_userRepository.Get(id));
        }
    }
}
