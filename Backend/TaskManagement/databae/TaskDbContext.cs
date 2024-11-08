﻿using Microsoft.EntityFrameworkCore;
using TaskManagement.Models;

namespace TaskManagement.databae
{
    public class TaskDbContext : DbContext
    {
        public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options)
        {
        }

        public DbSet<TaskItem> tasks { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<UserLogin> userlogin { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasOne(a => a.Address)
                .WithOne(u => u.User)
                .HasForeignKey<Address>(a => a.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(a => a.Tasks)
                .WithOne(u => u.Assignee)
                .HasForeignKey(a => a.AssigneeId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TaskItem>()
                .HasMany(a => a.checklists)
                .WithOne(u => u.Task)
                .HasForeignKey(a => a.TaskId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }

    }
}
