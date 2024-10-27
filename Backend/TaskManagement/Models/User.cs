using System.ComponentModel.DataAnnotations;

namespace TaskManagement.Models
{
    public class User
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public string email { get; set; }
        public string password { get; set; }
        public Address? Address { get; set; }
        public ICollection<TaskItem>? Tasks { get; set; }
    }
}
