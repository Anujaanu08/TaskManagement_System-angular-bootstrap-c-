using Microsoft.EntityFrameworkCore;
using TaskManagement.Models;

namespace TaskManagement.databae
{
    public class TaskDbContext : DbContext
    {
        public TaskDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<TaskItem> tasks { get; set; }
        public DbSet<User> users { get; set; }

    }
}
