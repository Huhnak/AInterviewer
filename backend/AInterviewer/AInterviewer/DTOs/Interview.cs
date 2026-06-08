using AInterviewer.Models;
using System.Security.Cryptography.X509Certificates;
using System.Text.Json.Serialization;

namespace AInterviewer.DTOs;

public record InterviewCreateRequest
(
    string CategoryName,
    string DifficultyLevel
);
public record SubmitAnswerDto
(
    Guid InterviewId,
    Guid QuestionId,
    string Answer
);
public record InterviewDto
(
    Guid Id,
    string Name,
    string CategoryName,
    int DifficultyLevel,
    DateTime CreatedAt,
    string Status,
    int Score
);
public record QuestionDto
(
    Guid Id,
    string Type,
    string Topic,
    string Content,
    int Difficulty,
    int OrderIndex
);
public class GeneratedQuestionDto
{
    [JsonPropertyName("topic")]
    public string Topic { get; set; } = "";
    [JsonPropertyName("content")]
    public string Content { get; set; } = "";
    [JsonPropertyName("difficulty")]
    public int Difficulty { get; set; }
}
public record AnswerEvaluationAndSuggestionDto(
    int Score,
    string Feedback,
    string SuggestedNextTopic
);
public record AnswerEvaluationDto(
    int Score,
    string Feedback
);

public record InterviewResultDto(
    int TotalScore,
    int CorrectAnswers,
    int TotalAnswers,
    string Level,
    string Strengths,
    string Weaknesses,
    string Recomendations
);