namespace AInterviewer.Models;
public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid RoleId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


    public Role Role { get; set; }
    public ICollection<Interview> Interviews = new List<Interview>();
}
