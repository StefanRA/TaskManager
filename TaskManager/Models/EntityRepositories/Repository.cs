using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TaskManager.Models.EntityRepositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly DbContext _dbContext;

        public Repository(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public virtual TEntity Get(int id)
        {
            return _dbContext.Set<TEntity>().Find(id);
        }

        public virtual IEnumerable<TEntity> GetAll()
        {
            return _dbContext.Set<TEntity>().ToList();
        }

        public virtual IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbContext.Set<TEntity>().Where(predicate);
        }

        public virtual void Add(TEntity entity)
        {
            _dbContext.Set<TEntity>().Add(entity);
            _dbContext.SaveChanges();
        }

        public virtual void AddRange(IEnumerable<TEntity> entities)
        {
            _dbContext.Set<TEntity>().AddRange(entities);
            _dbContext.SaveChanges();
        }

        public virtual void Remove(TEntity entity)
        {
            _dbContext.Set<TEntity>().Remove(entity);
            _dbContext.SaveChanges();
        }

        public virtual void RemoveRange(IEnumerable<TEntity> entities)
        {
            _dbContext.Set<TEntity>().RemoveRange(entities);
            _dbContext.SaveChanges();
        }
    }
}
