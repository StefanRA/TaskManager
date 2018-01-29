using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Models.Entities;
using TaskManager.Models.EntityRepositories;

namespace TaskManager.Controllers.RESTControllers
{
    [Route("api/[controller]")]
    public class TasksController : Controller
    {
        private ITaskRepository _taskRepository;

        public TasksController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }
        
        [HttpGet]
        public IEnumerable<Models.Entities.Task> GetAll()
        {
            return _taskRepository.GetAllWithRelatedDataIncluded();
        }
        
        [HttpGet("{id}")]
        public Models.Entities.Task Get(int id)
        {
            return _taskRepository.GetWithRelatedDataIncluded(id);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Models.Entities.Task task)
        {
            if (task == null)
            {
                return BadRequest();
            }
            _taskRepository.Add(task);
            return new ObjectResult(task);
        }
        
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _taskRepository.Remove(_taskRepository.Get(id));
        }
    }
}
