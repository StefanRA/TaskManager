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
    public class TaskCommentsController : Controller
    {
        private ITaskCommentRepository _taskCommentRepository;

        public TaskCommentsController(ITaskCommentRepository taskCommentRepository)
        {
            _taskCommentRepository = taskCommentRepository;
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
        public IActionResult Create([FromBody]Models.Entities.TaskComment taskComment)
        {
            if (taskComment == null)
            {
                return BadRequest();
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
