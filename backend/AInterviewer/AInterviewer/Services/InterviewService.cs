using AInterviewer.Data;
using AInterviewer.DTOs;
using AInterviewer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AInterviewer.Services;

public class InterviewService : IInterviewService
{
    private readonly ApplicationDbContext _context;
    private readonly IAiInterviewService _aiService;
    private readonly ILogger<InterviewService> _logger;

    public InterviewService(ApplicationDbContext context, IAiInterviewService aiService, ILogger<InterviewService> logger)
    {
        _context = context;
        _aiService = aiService;
        _logger = logger;
    }
    public async Task<ApiResult<Guid>> CreateAsync(InterviewCreateRequest interview, HttpContext httpContext, CancellationToken ct)
    {
        Category? category = await _context.Categories.FirstAsync(c => c.Name == interview.CategoryName,ct);
        if (category == null)
            return ApiResult<Guid>.Failure(new Error(400, "No such category.", ErrorType.Failure));
        Interview newInterview = new Interview
        {
            Id = Guid.NewGuid(),
            CategoryId = category.Id,
            UserId = GetUserId(httpContext)
        };
        _context.Interviews.Add(newInterview);
        await _context.SaveChangesAsync(ct);
        return ApiResult<Guid>.Success(newInterview.Id);
    }

    public async Task<ApiResult> FinishInterviewAsync(Guid Id, HttpContext httpContext, CancellationToken ct)
    {
        var userId = GetUserId(httpContext);
        Interview interview = await _context.Interviews
            .Include(i => i.Category)
            .FirstAsync(i => i.Id == Id, ct);
        if (interview.UserId != userId)
            return ApiResult.Failure(new Error(400, "This is not your interview.", ErrorType.Failure));
        if (interview.Status != InterviewStatus.InProgress)
            return ApiResult.Failure(new Error(400, "This interview is not in progress.", ErrorType.Failure));
        var questions = _context.Questions
            .Include(q => q.Answer)
            .Where(q => q.InterviewId == interview.Id)
            .ToList();
        var missingAnswers = new List<Answer>();
        foreach(var question in questions)
        {
            if(question.Answer == null)
            {
                missingAnswers.Add(new Answer()
                {
                    Content = "Ответ не предоставлен.",
                    CreatedAt = DateTime.UtcNow,
                    QuestionId = question.Id,
                    Score = 0
                });
            }
        }
        _context.Answers.AddRange(missingAnswers);
        await _context.SaveChangesAsync(ct);
        List<KeyValuePair<GeneratedQuestionDto, string>> questionsAnswers = _context.Questions
            .Include(q=>q.Answer)
            .Where(q=>q.InterviewId == interview.Id)
            .OrderBy(q=>q.OrderIndex)
            .Select(q=> new KeyValuePair<GeneratedQuestionDto, string>(
                    new GeneratedQuestionDto()
                    {
                        Content = q.Content,
                        Difficulty = q.Difficulty,
                        Topic = q.Topic
                    },
                    q.Answer.Content
                )
            )
            .ToList();
        var answerEvaulations = await _aiService.EvaluateAnswersAsync(interview, questionsAnswers, ct);
        for( int i = 0; i < answerEvaulations.Count; i++)
        {
            var answer = _context.Answers
                .Include(a => a.Question)
                .FirstOrDefault(a => a.Question.OrderIndex == i + 1
                                  && a.Question.InterviewId == interview.Id);
            if (answer != null)
                answer.Score = answerEvaulations[i].Score;
        }
        var interviewResult = await _aiService.GenerateResultAsync(interview,
            _context.Answers
                .Include(a => a.Question)
                .Where(a=> a.Question.InterviewId == interview.Id)
        ,ct);
        _context.Results.Add(new Result()
        {
            CompletedAt = DateTime.UtcNow,
            CorrectAnswers = interviewResult.CorrectAnswers,
            InterviewId = interview.Id,
            Recomendations = interviewResult.Recomendations,
            Strengths = interviewResult.Strengths,
            Weaknesses = interviewResult.Weaknesses,
            TotalAnswers = interviewResult.TotalAnswers,
            TotalScore = interviewResult.TotalScore,
            Level = interviewResult.Level,
        });
        interview.Status = InterviewStatus.Completed;
        interview.FinishedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(ct);

        return ApiResult.Success();
        
    }

    public async Task<ApiResult<QuestionDto>> GetCurrentQuestionAsync(Guid id, HttpContext httpContext, CancellationToken ct)
    {
        Guid userId = GetUserId(httpContext);
        var interviewDb = await _context.Interviews
            .AsNoTracking()
            .FirstAsync(i => i.UserId == userId && i.Id == id, ct);
        var questionDb = await _context.Questions
            .Include(q => q.Type)
            .FirstAsync(q => q.InterviewId == interviewDb.Id && q.OrderIndex == interviewDb.CurrentQuestionIndex,ct);
        if (questionDb == null)
            return ApiResult<QuestionDto>.Failure(new Error(400, "No such question.", ErrorType.Failure));
        var questionDto = new QuestionDto(
            questionDb.Id,
            questionDb.Type.Name,
            questionDb.Topic,
            questionDb.Content,
            questionDb.Difficulty,
            questionDb.OrderIndex
            );
        return ApiResult<QuestionDto>.Success(questionDto);
    }

    public async Task<ApiResult<InterviewDto>> GetInterviewByIdAsync(Guid id, HttpContext httpContext, CancellationToken ct)
    {
        Guid userId = GetUserId(httpContext);
        var interviewDb = await _context.Interviews
            .AsNoTracking()
            .FirstAsync(i => i.UserId == userId && i.Id == id);
        var interviewDto = new InterviewDto(
                interviewDb.Id,
                interviewDb.Name,
                interviewDb.Category.Name,
                interviewDb.DifficultyLevel,
                interviewDb.CreatedAt,
                interviewDb.Status.ToString(),
                interviewDb.Result.TotalScore
            );
        if (interviewDto == null)
            return ApiResult<InterviewDto>.Failure(new Error(400, "No such interview or not your interview.", ErrorType.Failure));
        return ApiResult<InterviewDto>.Success(interviewDto);
    }

    public async Task<ApiResult<List<InterviewDto>>> GetMyInterviewsAsync(HttpContext httpContext, CancellationToken ct)
    {
        Guid userId = GetUserId(httpContext);
        var interviews = await _context.Interviews
            .AsNoTracking()
            .Where(i => i.UserId == userId)
            .Select(i => new InterviewDto(
                i.Id,
                i.Name,
                i.Category.Name,
                i.DifficultyLevel,
                i.CreatedAt,
                i.Status.ToString(),
                i.Result.TotalScore
            ))
            .ToListAsync(ct);
        return ApiResult<List<InterviewDto>>.Success(interviews);
    }

    public async Task<ApiResult<Result>> InterviewResultAsync(Guid Id, HttpContext httpContext, CancellationToken ct)
    {
        var userId = GetUserId(httpContext);
        Interview interview = await _context.Interviews
            .Include(i => i.Category)
            .FirstAsync(i => i.Id == Id, ct);
        if (interview.UserId != userId)
            return ApiResult<Result>.Failure(new Error(400, "This is not your interview.", ErrorType.Failure));
        if (interview.Status != InterviewStatus.Completed)
            return ApiResult<Result>.Failure(new Error(400, "This interview is not completed.", ErrorType.Failure));
        var interviewResult = await _context.Results
            .AsNoTracking()
            .FirstAsync(r => r.InterviewId == interview.Id);
        return ApiResult<Result>.Success(interviewResult);
    }

    public async Task<ApiResult> StartInterviewAsync(Guid Id, HttpContext httpContext, CancellationToken ct)
    {
        var userId = GetUserId(httpContext);
        Interview interview = await _context.Interviews
            .Include(i=>i.Category)
            .FirstAsync(i => i.Id == Id,ct);
        if (interview.UserId != userId)
            return ApiResult.Failure(new Error(400, "This is not your interview.", ErrorType.Failure));
        if(interview.Status != InterviewStatus.NotStarted)
            return ApiResult.Failure(new Error(400, "Interview was already started.", ErrorType.Failure));
        int maxQuestions = interview.Category.MaxQuestions;
        var previousQuestions = new List<string>();
        string suggestedNextTopic = string.Empty;
        var questions = await _aiService.GenerateQuestionsAsync(interview,ct);


        Guid typeId = _context.QuestionTypes.First(q => q.Name == "Text").Id;

        foreach(var (index, question) in questions.Index())
        {
            _context.Questions.Add(new Question
            {
                Difficulty = question.Difficulty,
                OrderIndex = index + 1,
                InterviewId = interview.Id,
                Content = question.Content,
                Topic = question.Topic,
                TypeId = typeId,
            });
        }
        interview.Status = InterviewStatus.InProgress;
        interview.CurrentQuestionIndex = 1;
        interview.StartedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(ct);
        return ApiResult.Success();

    }

    public async Task<ApiResult> SubmitAnswer(SubmitAnswerDto request, HttpContext httpContext, CancellationToken ct)
    {
        var userId = GetUserId(httpContext);
        Interview interview = await _context.Interviews
            .Include(i=>i.Category)
            .FirstAsync(i => i.Id == request.InterviewId, ct);
        if (interview.UserId != userId)
            return ApiResult.Failure(new Error(400, "This is not your interview.", ErrorType.Failure));
        if (interview.Status != InterviewStatus.InProgress)
            return ApiResult.Failure(new Error(400, "Interview in not in progress.", ErrorType.Failure));
        if (_context.Answers.Any(a=>a.QuestionId == request.QuestionId))
            return ApiResult.Failure(new Error(400, "The answer already exist.", ErrorType.Failure));


        if (interview.StartedAt + interview.MaxDuration < DateTime.UtcNow)
        {
            interview.Status = InterviewStatus.Completed;
            return ApiResult.Failure(new Error(400, "Time is over.", ErrorType.Failure));
        }

        var answer = new Answer()
        {
            Content = request.Answer,
            QuestionId = request.QuestionId
        };
        _context.Answers
            .Add(answer);
        if(interview.CurrentQuestionIndex < interview.Category.MaxQuestions)
            interview.CurrentQuestionIndex += 1;
        await _context.SaveChangesAsync(ct);

        return ApiResult.Success();

    }
    
    private Guid GetUserId(HttpContext httpContext)
    {
        return Guid.Parse(httpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
    }
}
