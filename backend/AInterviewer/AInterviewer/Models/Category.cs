namespace AInterviewer.Models;
public class Category
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string InterviewPrompt { get; set; }
    public string EvalaationPrompt { get; set; }
    public int DefaultDifficalty { get; set; }
    public int MaxQuestions { get; set; }
    public bool isActive { get; set; } // Доступна ли категория для выбора при создании интервью
    public DateTime CreatedAt { get; set; }
}
