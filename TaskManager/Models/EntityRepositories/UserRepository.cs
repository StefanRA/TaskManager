using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.Models.DatabaseContext;
using TaskManager.Models.Entities;

namespace TaskManager.Models.EntityRepositories
{
    public class UserRepository : IUserRepository
    {
        private readonly TaskManagerDbContext _dbContext;

        public UserRepository(TaskManagerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<User> GetAll()
        {
            return _dbContext.Users;
        }
        
        public User FindById(int id)
        {
            return _dbContext.Users.FirstOrDefault(user => user.UserId == id);
        }

        public void Delete(int id)
        {
            _dbContext.Users.Remove(FindById(id));
            _dbContext.SaveChanges();
        }

        public void Insert(User user)
        {
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
        }
    }
}
