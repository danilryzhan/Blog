using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text; 
using System.Threading.Tasks;

namespace Persistence
{
    internal class DataContext:DbContext
    {
        public DataContext(DbContextOptions options):base(options) { 
        
        
        }

        public DbSet<Activity> activities { get; set; }
    }
}
