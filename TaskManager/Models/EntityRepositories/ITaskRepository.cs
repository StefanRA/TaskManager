using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManager.Models.EntityRepositories
{
    public interface ITaskRepository : IRepository<Entities.Task>
    {
        Entities.Task GetWithRelatedDataIncluded(int id);
        IEnumerable<Entities.Task> GetAllWithRelatedDataIncluded();
    }
}
