﻿using System;
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

        public IEnumerable<Entities.Task> GetAllByProjectId(int parentProjectId)
        {
            return _TaskManagerDbContext.Tasks
                .Include(task => task.Reporter)
                .Include(task => task.Assignee)
                .Where(task => task.ParentProject.Id == parentProjectId)
                .OrderBy(task => task.Status)
                .ThenByDescending(task => task.CreationDate)
                .ToList();
        }

        public Entities.Task GetWithRelatedDataIncluded(int id)
        {
            return _TaskManagerDbContext.Tasks
                .Include(task => task.ParentProject)
                .Include(task => task.Reporter)
                .Include(task => task.Assignee)
                .FirstOrDefault(task => task.Id == id);
        }

        public override void Add(Entities.Task entity)
        {
            entity.ParentProject.Owner = null;
            _dbContext.Set<Entities.Task>().Add(entity);
            _dbContext.Entry(entity.ParentProject).State = EntityState.Unchanged;
            _dbContext.Entry(entity.Assignee).State = EntityState.Unchanged;
            _dbContext.Entry(entity.Reporter).State = EntityState.Unchanged;
            _dbContext.SaveChanges();
        }

        public TaskManagerDbContext _TaskManagerDbContext
        {
            get { return _dbContext as TaskManagerDbContext; }
        }
    }
}
