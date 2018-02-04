using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Models.Entities;
using TaskManager.Models.EntityRepositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

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

        [Authorize(Policy = "UserOnly")]
        [HttpGet]
        public IEnumerable<Models.Entities.Task> GetAll()
        {
            return _taskRepository.GetAllWithRelatedDataIncluded();
        }

        [Authorize(Policy = "UserOnly")]
        [HttpGet("byProject/{projectId}")]
        public IEnumerable<Models.Entities.Task> GetAllByProjectId(int projectId)
        {
            return _taskRepository.GetAllByProjectId(projectId);
        }

        [Authorize(Policy = "UserOnly")]
        [HttpGet("{id}")]
        public Models.Entities.Task Get(int id)
        {
            return _taskRepository.GetWithRelatedDataIncluded(id);
        }

        [Authorize(Policy = "UserOnly")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]Models.Entities.Task task)
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

        [Authorize(Policy = "UserOnly")]
        [HttpPut("{id}")]
        public IActionResult Update(long id, [FromBody] Models.Entities.Task item)
        {
            if (item == null || item.Id != id)
            {
                return BadRequest();
            }

            var existingTask = _taskRepository.Get(item.Id);
            if (existingTask == null)
            {
                return NotFound();
            }

            existingTask.Name = item.Name;
            existingTask.Description = item.Description;
            existingTask.Status = item.Status;

            _taskRepository.Update(existingTask);
            return new NoContentResult();
        }

        [Authorize(Policy = "UserOnly")]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _taskRepository.Remove(_taskRepository.Get(id));
        }
    }
}
