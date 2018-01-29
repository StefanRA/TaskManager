using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.Models.DatabaseContext;
using TaskManager.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace TaskManager.Models.EntityRepositories
{
    public class ProjectRepository : Repository<Project>, IProjectRepository
    {
        public ProjectRepository(TaskManagerDbContext dbContext)
            : base(dbContext)
        {
        }

        public IEnumerable<Project> GetAllWithRelatedDataIncluded()
        {
            return _TaskManagerDbContext.Projects
                .Include(project => project.Owner)
                .ToList();
        }

        public Project GetWithRelatedDataIncluded(int id)
        {
            return _TaskManagerDbContext.Projects
                .Include(project => project.Owner)
                .FirstOrDefault(project => project.Id == id);
        }

        public TaskManagerDbContext _TaskManagerDbContext
        {
            get { return _dbContext as TaskManagerDbContext; }
        }
    }
}
