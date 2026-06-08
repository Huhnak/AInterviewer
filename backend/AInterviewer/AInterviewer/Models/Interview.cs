namespace AInterviewer.Models;

public class Interview
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid CategoryId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int DifficultyLevel { get; set; }
    public int CurrentQuestionIndex { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime StartedAt { get; set; }
    public DateTime FinishedAt { get;set; }
    public TimeSpan MaxDuration { get; set; } = TimeSpan.FromMinutes(30);
    public InterviewStatus Status { get; set; } = InterviewStatus.NotStarted;


    public User User { get; set; }
    public Category Category { get; set; }
    public ICollection<Question> Questions { get; set; } = new List<Question>();
    public Result Result { get; set; } 
}
