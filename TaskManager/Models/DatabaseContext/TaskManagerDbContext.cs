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
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<Entities.Task> Tasks { get; set; }
    }
}
