using System.ComponentModel.DataAnnotations;

namespace TaskManagement.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }
        public string Addressline1 { get; set; }
        public string? Addressline2 { get; set; }
        public string? city { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }

    }
}
