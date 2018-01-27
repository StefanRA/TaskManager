using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.Models.Entities;

namespace TaskManager.Models.EntityRepositories
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAll();
        User FindById(int id);
        void Delete(int id);
        void Insert(User user);
    }
}
