namespace AInterviewer.Models;
public class Question
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid InterviewId { get; set; }
    public Guid TypeId { get; set; }
    public string Topic { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public int Difficulty { get; set; }
    
    public int OrderIndex { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public QuestionType Type { get; set; }
    public Interview Interview { get; set; }
    public Answer Answer { get; set; }
}
