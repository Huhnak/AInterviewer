namespace AInterviewer.Models;

public class Interview
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid CategoryId { get; set; }
    public int Score { get; set; }



    public User User { get; set; }
    public Category Category { get; set; }
    public ICollection<Question> Questions { get; set; } = new List<Question>();
    public result result { get; set; } 
}
