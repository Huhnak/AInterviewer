using AInterviewer.DTOs;
using AInterviewer.Models;
using Microsoft.AspNetCore.Mvc;

namespace AInterviewer.Services.Interfaces;

public interface IInterviewService
{
    Task<ApiResult<Guid>> CreateAsync(InterviewCreateRequest interview, HttpContext httpContext, CancellationToken ct);
    Task<ApiResult<List<InterviewDto>>> GetMyInterviewsAsync(HttpContext httpContext, CancellationToken ct);
    Task<ApiResult<InterviewDto>> GetInterviewByIdAsync(Guid Id, HttpContext httpContext, CancellationToken ct);
    Task<ApiResult<QuestionDto>> GetCurrentQuestionAsync(Guid Id, HttpContext httpContext, CancellationToken ct);
    Task<ApiResult> SubmitAnswer(SubmitAnswerDto request, HttpContext httpContext, CancellationToken ct);
    Task<ApiResult> StartInterviewAsync(Guid Id, HttpContext httpContext, CancellationToken ct);
    Task<ApiResult> FinishInterviewAsync(Guid Id, HttpContext httpContext, CancellationToken ct);
    Task<ApiResult<ResultDto>> InterviewResultAsync(Guid Id, HttpContext httpContext, CancellationToken ct);
}
