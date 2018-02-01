using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.Models.Entities;

namespace TaskManager.Models.EntityRepositories
{
    public interface ITaskCommentRepository : IRepository<TaskComment>
    {
        IEnumerable<Entities.TaskComment> GetAllByTaskId(int id);
    }
}
