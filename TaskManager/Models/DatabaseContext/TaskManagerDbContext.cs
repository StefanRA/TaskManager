using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using TaskManager.Models.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace TaskManager.Models.DatabaseContext
{
    public class TaskManagerDbContext : IdentityDbContext<User>
    {
        public TaskManagerDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Entities.Task>()
                .HasMany<Entities.TaskComment>(t => t.Comments)
                .WithOne(tc => tc.ParentTask)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Entities.Project>()
                .HasMany<Entities.Task>(project => project.Tasks)
                .WithOne(task => task.ParentProject)
                .OnDelete(DeleteBehavior.Cascade);
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<Entities.Task> Tasks { get; set; }
        public DbSet<TaskComment> TaskComments { get; set; }
    }
}
