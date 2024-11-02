namespace TaskManagement.Models
{
    public class checklist
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsDone { get; set; }
        public int? TaskId { get; set; }
        public TaskItem? Task { get; set; }
    }
}
