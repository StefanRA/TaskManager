using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Models.EntityRepositories;
using TaskManager.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace TaskManager.Controllers.RESTControllers
{
    [Route("api/[controller]")]
    public class ProjectsController : Controller
    {
        private readonly UserManager<User> _userManager;
        private IProjectRepository _projectRepository;

        public ProjectsController(
            IProjectRepository projectRepository,
            UserManager<User> userManager)
        {
            _projectRepository = projectRepository;
            _userManager = userManager;
        }

        [Authorize(Policy = "UserOnly")]
        [HttpGet]
        public IEnumerable<Project> GetAll()
        {
            return _projectRepository.GetAllWithRelatedDataIncluded();
        }

        [Authorize(Policy = "UserOnly")]
        [HttpGet("{id}")]
        public Project Get(int id)
        {
            return _projectRepository.GetWithRelatedDataIncluded(id);
        }

        [Authorize(Policy = "UserOnly")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]Project project)
        {
            if (project == null)
            {
                return BadRequest();
            }

            if (project.Owner != null)
            {
                var user = await _userManager.FindByNameAsync(project.Owner.UserName);
                project.Owner = user;
            }

            _projectRepository.Add(project);
            return new ObjectResult(project);
        }

        [Authorize(Policy = "UserOnly")]
        [HttpPut("{id}")]
        public void Update(int id, [FromBody]string value)
        {
        }

        [Authorize(Policy = "UserOnly")]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _projectRepository.Remove(_projectRepository.Get(id));
        }
    }
}
