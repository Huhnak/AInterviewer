namespace AInterviewer.Models;

public class QuestionType
{
    public Guid Id { get; set; } = new Guid();
    public string Name { get; set; } = string.Empty;

    public ICollection<Question> Questions { get; set; } = new List<Question>();
}
