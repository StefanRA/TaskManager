﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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
                    .Where(comment => comment.ParentTask.Id == id)
                    .Include(comment => comment.Poster)
                    .ToList();
        }

        public override void Add(TaskComment entity)
        {
            entity.ParentTask.ParentProject = null;
            entity.ParentTask.Reporter = null;
            entity.ParentTask.Assignee = null;
            _dbContext.Set<TaskComment>().Add(entity);
            _dbContext.Entry(entity.ParentTask).State = EntityState.Unchanged;
            _dbContext.Entry(entity.Poster).State = EntityState.Unchanged;
            _dbContext.SaveChanges();
        }

        public TaskManagerDbContext _TaskManagerDbContext
        {
            get { return _dbContext as TaskManagerDbContext; }
        }
    }
}
