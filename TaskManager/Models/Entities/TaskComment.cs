using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManager.Models.Entities
{
    public class TaskComment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreationDate { get; set; }
        public User Poster { get; set; }
        public Entities.Task ParentTask { get; set; }
    }
}
