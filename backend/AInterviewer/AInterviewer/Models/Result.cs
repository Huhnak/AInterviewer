namespace AInterviewer.Models;

public class result
{
    public Guid Id { get; set;  } = Guid.NewGuid();
    public Guid InterviewId { get; set; }
    public int TotalScore { get; set; }
    public int CorrectAnswers { get; set; }
    public int TotalAnswers{ get; set; }
    public string Level { get; set; } = string.Empty;
    public string Strengths { get; set; } = string.Empty;
    public string Weaknesses{ get; set; } = string.Empty;
    public string Recomendations{ get; set; } = string.Empty;
    public DateTime CompletedAt { get; set; }


    public Interview Interview { get; set; }

}
