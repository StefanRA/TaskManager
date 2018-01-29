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
    public class ProjectsController : Controller
    {
        private IProjectRepository _projectRepository;

        public ProjectsController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }
        
        [HttpGet]
        public IEnumerable<Project> GetAll()
        {
            return _projectRepository.GetAllWithRelatedDataIncluded();
        }
        
        [HttpGet("{id}")]
        public Project Get(int id)
        {
            return _projectRepository.GetWithRelatedDataIncluded(id);
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
        
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _projectRepository.Remove(_projectRepository.Get(id));
        }
    }
}
