namespace AInterviewer.Models;
public class Category
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; }
    public string Description { get; set; }
    public string InterviewPrompt { get; set; }
    public string EvaluationPrompt { get; set; }
    public int DefaultDifficulty { get; set; }
    public int MaxQuestions { get; set; }
    public bool IsActive { get; set; } = true; // Доступна ли категория для выбора при создании интервью
    public DateTime CreatedAt { get; set; } 
}
