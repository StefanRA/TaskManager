using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.Models.Entities;

namespace TaskManager.Models.EntityRepositories
{
    public interface IProjectRepository : IRepository<Project>
    {
        Project GetWithRelatedDataIncluded(int id);
        IEnumerable<Project> GetAllWithRelatedDataIncluded();
    }
}
