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
    public class TaskCommentsController : Controller
    {
        private readonly UserManager<User> _userManager;
        private ITaskCommentRepository _taskCommentRepository;

        public TaskCommentsController(
            ITaskCommentRepository taskCommentRepository,
            UserManager<User> userManager)
        {
            _taskCommentRepository = taskCommentRepository;
            _userManager = userManager;
        }

        [HttpGet]
        public IEnumerable<Models.Entities.TaskComment> GetAll()
        {
            return _taskCommentRepository.GetAll();
        }

        [HttpGet("byTask/{taskId}")]
        public IEnumerable<Models.Entities.TaskComment> GetAllByTaskId(int taskId)
        {
            return _taskCommentRepository.GetAllByTaskId(taskId);
        }

        [HttpGet("{id}")]
        public Models.Entities.TaskComment Get(int id)
        {
            return _taskCommentRepository.Get(id);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]Models.Entities.TaskComment taskComment)
        {
            if (taskComment == null)
            {
                return BadRequest();
            }

            if (taskComment.Poster != null)
            {
                var user = await _userManager.FindByNameAsync(taskComment.Poster.UserName);
                taskComment.Poster = user;
            }

            _taskCommentRepository.Add(taskComment);
            return new ObjectResult(taskComment);
        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, [FromBody] Models.Entities.TaskComment item)
        {
            if (item == null || item.Id != id)
            {
                return BadRequest();
            }

            var existingTask = _taskCommentRepository.Find(task => task.Id == item.Id);
            if (existingTask == null)
            {
                return NotFound();
            }

            _taskCommentRepository.Update(item);
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _taskCommentRepository.Remove(_taskCommentRepository.Get(id));
        }
    }
}
