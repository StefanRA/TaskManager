using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.Models.DatabaseContext;
using TaskManager.Models.Entities;

namespace TaskManager.Models.EntityRepositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(TaskManagerDbContext dbContext)
            : base(dbContext)
        {
        }
    }
}
