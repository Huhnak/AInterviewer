using AInterviewer.DTOs;
using AInterviewer.Models;
using AInterviewer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace AInterviewer.Controllers;

[Authorize]
public class InterviewController : ApiControllerBase
{
    private readonly IInterviewService _interviewService;
    public InterviewController(IInterviewService interviewService)
    {
        _interviewService = interviewService;
    }
    [HttpPost("create")]
    public async Task<ActionResult<Guid>> Create([FromBody] InterviewCreateRequest request, CancellationToken ct)
    {
        var result = await _interviewService.CreateAsync(request, HttpContext, ct);
        if(result.IsFailure)
            return BadRequest(result.Error);
        return Ok(result.Value);
    }
    [HttpGet("list")]
    public async Task<ActionResult<List<InterviewDto>>> GetMyInterviews(CancellationToken ct)
    {
        var result = await _interviewService.GetMyInterviewsAsync(HttpContext, ct);
        if (result.IsFailure)
            return BadRequest(result.Error);
        return Ok(result.Value);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<InterviewDto>> GetById(Guid id, CancellationToken ct)
    {
        var result = await _interviewService.GetInterviewByIdAsync(id, HttpContext, ct);
        if (result.IsFailure)
            return BadRequest(result.Error);
        return Ok(result.Value);
    }
    [HttpPost("{id}/start")]
    public async Task<IActionResult> Start(Guid id, CancellationToken ct)
    {
        var result = await _interviewService.StartInterviewAsync(id, HttpContext, ct);
        if (result.IsFailure)
            return BadRequest(result.Error);
        return Ok();
    }
    [HttpGet("{id}/current-question")]
    public async Task<ActionResult<QuestionDto>> GetCurrentQuestion(Guid id, CancellationToken ct)
    {
        var result = await _interviewService.GetCurrentQuestionAsync(id, HttpContext, ct);
        if (result.IsFailure)
            return BadRequest(result.Error);
        return Ok(result.Value);
    }

    public record SubmitAnswerRequest(Guid QuestionId, string Answer);
    [HttpPost("{id}/submit-answer")]
    public async Task<IActionResult> SubmitAnswer([FromRoute] Guid id, [FromBody] SubmitAnswerRequest submitAnswerRequest, CancellationToken ct)
    {
        var result = await _interviewService.SubmitAnswer(new SubmitAnswerDto(id, submitAnswerRequest.QuestionId, submitAnswerRequest.Answer), HttpContext, ct);
        if (result.IsFailure)
            return BadRequest(result.Error);
        return Ok();
    }
    [HttpPost("{id}/finish")]
    public async Task<IActionResult> Finish(Guid id, CancellationToken ct)
    {
        var result = await _interviewService.FinishInterviewAsync(id, HttpContext, ct);
        if (result.IsFailure)
            return BadRequest(result.Error);
        return Ok();
    }
    [HttpGet("{id}/result")]
    public async Task<ActionResult<ResultDto>> GetResult(Guid id, CancellationToken ct)
    {
        var result = await _interviewService.InterviewResultAsync(id, HttpContext, ct);
        if (result.IsFailure)
            return BadRequest(result.Error);
        return Ok(result.Value);
    }
    [HttpGet("interview-category/list")]
    public async Task<ActionResult<List<Category>>> GetInterviewCategories(CancellationToken ct)
    {
        var result = await _interviewService.GetInterviewCategories(HttpContext, ct);
        if (result.IsFailure)
            return BadRequest(result.Error);
        return Ok(result.Value);
    }
}
