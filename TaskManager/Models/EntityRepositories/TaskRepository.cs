using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.Models.DatabaseContext;
using TaskManager.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace TaskManager.Models.EntityRepositories
{
    public class TaskRepository : Repository<Entities.Task>, ITaskRepository
    {
        public TaskRepository(TaskManagerDbContext dbContext)
            : base(dbContext)
        {
        }

        public IEnumerable<Entities.Task> GetAllWithRelatedDataIncluded()
        {
            return _TaskManagerDbContext.Tasks
                .Include(task => task.Reporter)
                .Include(task => task.Assignee)
                .ToList();
        }

        public Entities.Task GetWithRelatedDataIncluded(int id)
        {
            return _TaskManagerDbContext.Tasks
                .Include(task => task.ParentProject)
                .Include(task => task.Reporter)
                .Include(task => task.Assignee)
                .Include(task => task.Comments)
                .FirstOrDefault(task => task.Id == id);
        }

        public TaskManagerDbContext _TaskManagerDbContext
        {
            get { return _dbContext as TaskManagerDbContext; }
        }
    }
}
