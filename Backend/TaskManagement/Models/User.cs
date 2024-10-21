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
        public string phone { get; set; }
        public string email { get; set; }
        public string address { get; set; }
    }
}
