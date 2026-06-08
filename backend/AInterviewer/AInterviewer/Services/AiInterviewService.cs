using AInterviewer.DTOs;
using AInterviewer.Models;
using Microsoft.Extensions.AI;
using System.Text;
using System.Text.Json;

namespace AInterviewer.Services;

public class AiInterviewService : IAiInterviewService
{

    private readonly ILogger<AiInterviewService> _logger;
    private readonly IChatClient _chatClient;

    public AiInterviewService(
        ILogger<AiInterviewService> logger,
        IChatClient chatClient)
    {
        _logger = logger;
        _chatClient = chatClient;
    }
    private const string SystemPrompt = """
        Ты профессиональный Senior Technical Interviewer.

        Правила:

        1. Задавай только вопросы по вакансии.
        2. Усложняй вопросы постепенно.
        3. Не задавай повторяющиеся вопросы.
        4. Оценивай строго.
        5. Отвечай только JSON.
        """;
    public async Task<GeneratedQuestionDto> GenerateQuestionAsync(
        Interview interview,
        string[]? previousQuestions = null,
        string? suggestedNextTopic = "-",
        CancellationToken ct = default)
    {
        if (previousQuestions == null) previousQuestions = Array.Empty<string>();
        var prompt = $$"""
        Ты технический интервьюер.

        Позиция: {{interview.Category.Name}}
        Описание позиции: {{interview.Category.InterviewPrompt}}
        Общий уровень сложности интервью (1-100): {{interview.DifficultyLevel}}
        Предыдущие вопросы:{{string.Join(";", previousQuestions)}}
        Рекомендуемая тема: {{suggestedNextTopic}}

        Сгенерируй один технический вопрос.

        Ответ верни в JSON:

        {
            "topic": "",
            "content": "",
            "difficulty": 50,
        }
        """;
        
        var response = await SendPromptAsync(
            prompt,
            ct);

        return JsonSerializer.Deserialize<GeneratedQuestionDto>(
            response)!;
    }
    public async Task<List<GeneratedQuestionDto>> GenerateQuestionsAsync(Interview interview, CancellationToken ct = default)
    {
        var prompt = $$"""
        Ты технический интервьюер.

        Позиция: {{interview.Category.Name}}
        Описание позиции: {{interview.Category.InterviewPrompt}}
        Общий уровень сложности интервью (1-100): {{interview.DifficultyLevel}}

        Сгенерируй {{interview.Category.MaxQuestions}} технических вопрос.

        Ответ верни в JSON:
        [
            {
                "topic": "",
                "content": "",
                "difficulty": 15
            },
            {
                "topic": "",
                "content": "",
                "difficulty": 25
            },
            {
                "topic": "",
                "content": "",
                "difficulty": 30
            }
        ]
        """;

        var response = await SendPromptAsync(
            prompt,
            ct);

        return JsonSerializer.Deserialize<List<GeneratedQuestionDto>>(
            response)!;
    }
    public async Task<AnswerEvaluationAndSuggestionDto> EvaluateAnswerAsync(Interview interview, string question, string answer, CancellationToken ct = default)
    {
        var prompt = $$"""
        Ты опытный технический интервьюер.

        Позиция: {{interview.Category.Name}}
        Описание позиции: {{interview.Category.InterviewPrompt}}
        Общий уровень сложности интервью (1-100): {{interview.DifficultyLevel}}
        Рекомендации по оценке: {{interview.Category.EvaluationPrompt}}

        Вопрос:
        {{question}}

        Ответ кандидата:
        {{answer}}

        Оцени ответ от 0 до 100.

        Верни JSON:
        {
            "score": 0,
            "feedback": "",
            "suggestedNextTopic": ""
        }
        """;

        var response = await SendPromptAsync(
            prompt,
            ct);

        return JsonSerializer.Deserialize<AnswerEvaluationAndSuggestionDto>(
            response)!;
    }
    public async Task<List<AnswerEvaluationDto>> EvaluateAnswersAsync(Interview interview, List<KeyValuePair<GeneratedQuestionDto, string>> questionsAnswers, CancellationToken ct = default)
    {

        var sb = new StringBuilder();
        foreach (var qa in questionsAnswers)
        {
            sb.AppendLine($"Question topic: {qa.Key.Topic}\nQuestion content: {qa.Key.Content}\nQuestion difficulty: {qa.Key.Difficulty}\nAnswer: {qa.Value}\n");
        }

        var prompt = $$"""
        Ты опытный технический интервьюер.

        Позиция: {{interview.Category.Name}}
        Описание позиции: {{interview.Category.InterviewPrompt}}
        Общий уровень сложности интервью (1-100): {{interview.DifficultyLevel}}
        Рекомендации по оценке: {{interview.Category.EvaluationPrompt}}

        Вопросы и ответы кандидата:
        {{sb.ToString()}}

        Оцени ответы от 0 до 100.

        Верни JSON:
        [
            {
                "score": 0,
                "feedback": ""
            },
            {
                "score": 0,
                "feedback": ""
            },
            {
                "score": 0,
                "feedback": ""
            },
        ]

        """;

        var response = await SendPromptAsync(
            prompt,
            ct);

        return JsonSerializer.Deserialize<List<AnswerEvaluationDto>>(
            response)!;
    }
    public async Task<InterviewResultDto> GenerateResultAsync(Interview interview, IEnumerable<Answer> answers, CancellationToken ct = default)
    {
        var totalScore = answers.Sum(a => a.Score);
        var answersText = string.Join(
            "\n",
            answers.Select(a =>
                $"Question topic: {a.Question.Topic}\nQuestion content: {a.Question.Content}\nAnswer: {a.Content}\nScore: {a.Score}"));

        var prompt = $$"""
        Проанализируй результаты интервью.

        Позиция: {{interview.Category.Name}}
        Описание позиции: {{interview.Category.InterviewPrompt}}
        Общий уровень сложности интервью (1-100): {{interview.DifficultyLevel}}
        Рекомендации по оценке: {{interview.Category.EvaluationPrompt}}

        Ответы кандидата:
        {{answersText}}




        Верни JSON:

        {
            "grade": "",
            "recomendations": "",
            "level": "",
            "strengths": [],
            "weaknesses": []
        }
        recomendations - рекомендации по улучшению навыков кандидата.
        level - предполагаемый уровень кандидата (Junior, Junior+, Middle, Middle+, Senior).
        """;
        var response = await SendPromptAsync(
                prompt,
                ct);
        var result = JsonSerializer.Deserialize<InterviewResultDto>(
            response)!;
        result = result with { TotalScore = totalScore, TotalAnswers = answers.Count(), CorrectAnswers = answers.Count(a => a.Score >= 60) };
        return result;
    }

    //public async Task<ResumeAnalysisDto> AnalyzeResumeAsync(
    //    string resumeText,
    //    CancellationToken cancellationToken = default)
    //{
    //    var prompt = $"""
    //    Проанализируй резюме.

    //    Резюме:

    //    {resumeText}

    //    Верни JSON:
    //    {{
    //        "skills": [],
    //        "experienceYears": 0,
    //        "recommendedLevel": ""
    //    }}
    //    """;

    //    var response = await SendPromptAsync(
    //        prompt,
    //        cancellationToken);

    //    return JsonSerializer.Deserialize<ResumeAnalysisDto>(
    //        response)!;
    //}

    private async Task<string> SendPromptAsync(
        string prompt,
        CancellationToken ct)
    {
        var options = new ChatOptions
        {
            ResponseFormat = ChatResponseFormat.Json
        };
        ChatMessage[] messages =
        [
            new ChatMessage(ChatRole.System, SystemPrompt),
            new ChatMessage(ChatRole.User, prompt)
        ];
        var result = await _chatClient.GetResponseAsync(messages, options, ct);
        
        var response = result.Text.Trim();
        if (response.StartsWith("```"))
        {
            var firstNewLine = response.IndexOf('\n');

            response = response[(firstNewLine + 1)..];

            response = response[..response.LastIndexOf("```")];
        }
        return response;
    }
}
