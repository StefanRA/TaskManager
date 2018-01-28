﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManager.Models.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public User Owner { get; set; }
    }
}
