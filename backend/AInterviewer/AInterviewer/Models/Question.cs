namespace AInterviewer.Models;
public class Question
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid InterviewId { get; set; }
    public string Content { get; set; } = string.Empty;
    public int Difficalty { get; set; }
    public string Type { get; set; }
    public int OrderIndex { get; set; }
    public DateTime CreatedAt { get; set; }

    public Interview Interview { get; set; }
    public Answer Answer { get; set; }
}
