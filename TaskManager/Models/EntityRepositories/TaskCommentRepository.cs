using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.Models.DatabaseContext;
using TaskManager.Models.Entities;

namespace TaskManager.Models.EntityRepositories
{
    public class TaskCommentRepository : Repository<TaskComment>, ITaskCommentRepository
    {
        public TaskCommentRepository(TaskManagerDbContext dbContext)
            : base(dbContext)
        {
        }

        public IEnumerable<TaskComment> GetAllByTaskId(int id)
        {
            return _TaskManagerDbContext.TaskComments
                    .Where(comment => comment.Task.Id == id)
                    .ToList();
        }

        public TaskManagerDbContext _TaskManagerDbContext
        {
            get { return _dbContext as TaskManagerDbContext; }
        }
    }
}
