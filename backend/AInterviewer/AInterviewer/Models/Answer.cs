namespace AInterviewer.Models;
public class Answer
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid QuestionId { get; set; }
    public Question Question { get; set; }
    public string Content { get; set; } = string.Empty;
    public int Score { get; set; }
    public string Feedback { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
