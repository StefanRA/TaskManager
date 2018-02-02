using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Models.Entities;
using TaskManager.Models.EntityRepositories;
using Microsoft.AspNetCore.Identity;

namespace TaskManager.Controllers.RESTControllers
{
    [Route("api/[controller]")]
    public class TasksController : Controller
    {
        private readonly UserManager<User> _userManager;
        private ITaskRepository _taskRepository;

        public TasksController(
            ITaskRepository taskRepository,
            UserManager<User> userManager)
        {
            _taskRepository = taskRepository;
            _userManager = userManager;
        }
        
        [HttpGet]
        public IEnumerable<Models.Entities.Task> GetAll()
        {
            return _taskRepository.GetAllWithRelatedDataIncluded();
        }

        [HttpGet("byProject/{projectId}")]
        public IEnumerable<Models.Entities.Task> GetAllByProjectId(int projectId)
        {
            return _taskRepository.GetAllByProjectId(projectId);
        }

        [HttpGet("{id}")]
        public Models.Entities.Task Get(int id)
        {
            return _taskRepository.GetWithRelatedDataIncluded(id);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Models.Entities.Task task)
        {
            if (task == null)
            {
                return BadRequest();
            }

            if (task.Reporter != null)
            {
                var user = await _userManager.FindByNameAsync(task.Reporter.UserName);
                task.Reporter = user;
            }

            if (task.Assignee != null)
            {
                var user = await _userManager.FindByNameAsync(task.Assignee.UserName);
                task.Assignee = user;
            }

            _taskRepository.Add(task);
            return new ObjectResult(task);
        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, [FromBody] Models.Entities.Task item)
        {
            if (item == null || item.Id != id)
            {
                return BadRequest();
            }

            var existingTask = _taskRepository.Find(task => task.Id == item.Id);
            if (existingTask == null)
            {
                return NotFound();
            }

            _taskRepository.Update(item);
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _taskRepository.Remove(_taskRepository.Get(id));
        }
    }
}
