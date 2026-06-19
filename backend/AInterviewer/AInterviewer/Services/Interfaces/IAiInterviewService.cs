using AInterviewer.DTOs;
using AInterviewer.Models;

namespace AInterviewer.Services.Interfaces;

public interface IAiInterviewService
{
    Task<GeneratedQuestionDto> GenerateQuestionAsync(
        Interview interview,
        string[]? previousQuestions,
        string? suggestedNextTopic,
        CancellationToken ct);
    Task<List<GeneratedQuestionDto>> GenerateQuestionsAsync(
        Interview interview,
        CancellationToken ct);
    Task<AnswerEvaluationAndSuggestionDto> EvaluateAnswerAsync(
        Interview interview,
        string question,
        string answer,
        CancellationToken ct);
    Task<List<AnswerEvaluationDto>> EvaluateAnswersAsync(
        Interview interview,
        List<KeyValuePair<GeneratedQuestionDto, string>> questionsAnswers,
        CancellationToken cancellationToken);
    Task<InterviewResultDto> GenerateResultAsync(
        Interview interview,
        IEnumerable<Answer> answers,
        CancellationToken ct);
}
