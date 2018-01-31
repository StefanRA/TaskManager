using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManager.Models.Entities
{
    public class Task
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime DueDate { get; set; }
        public User Reporter { get; set; }
        public User Assignee { get; set; }
        public Project ParentProject { get; set; }
        public ICollection<TaskComment> Comments { get; set; }
    }
}
