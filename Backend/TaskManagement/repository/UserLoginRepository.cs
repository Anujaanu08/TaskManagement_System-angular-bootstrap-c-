using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;
using TaskManagement.databae;
using TaskManagement.Models;

namespace TaskManagement.repository
{
    public class UserLoginRepository
    {
        private readonly TaskDbContext _context;

        public UserLoginRepository(TaskDbContext context)
        {
            _context = context;
        }

        public async Task<UserLogin> AddUser(UserLogin userLogin)
        {
           var data =   await _context.userlogin.AddAsync(userLogin);
            await _context.SaveChangesAsync();
            return data.Entity;
        }

        public async Task<UserLogin> Login(string email)
        {
            var data = await _context.userlogin.SingleOrDefaultAsync(User => User.Email==email);
            return data;
        }
    }
}
