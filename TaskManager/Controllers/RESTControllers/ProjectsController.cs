using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Models.EntityRepositories;
using TaskManager.Models.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskManager.Controllers.RESTControllers
{
    [Route("api/[controller]")]
    public class ProjectsController : Controller
    {
        private IProjectRepository _projectRepository;

        public ProjectsController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        // GET: api/users
        [HttpGet]
        public IEnumerable<Project> GetAll()
        {
            return _projectRepository.GetAllWithRelatedDataIncluded();
        }

        // GET api/users/5
        [HttpGet("{id}")]
        public Project Get(int id)
        {
            return _projectRepository.Get(id);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Project project)
        {
            if (project == null)
            {
                return BadRequest();
            }
            _projectRepository.Add(project);
            return new ObjectResult(project);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _projectRepository.Remove(_projectRepository.Get(id));
        }
    }
}
