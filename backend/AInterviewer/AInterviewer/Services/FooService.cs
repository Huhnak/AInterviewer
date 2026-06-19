using AInterviewer.Data;
using AInterviewer.DTOs;
using AInterviewer.Models;
using AInterviewer.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AInterviewer.Services;

public class FooService : IFooService
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<InterviewService> _logger;

    public FooService(ApplicationDbContext context, IAiInterviewService aiService, ILogger<InterviewService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<ApiResult<CategoryDto>> ChangeCategoryActivityAsync(Guid Id, bool isActive, HttpContext httpContext, CancellationToken ct)
    {
        var mutableCategory = await _context.Categories.FirstOrDefaultAsync(c => c.Id == Id, ct);
        if (mutableCategory == null)
            return ApiResult<CategoryDto>.Failure(new Error(404, "No such category.", ErrorType.NotFound));
        if (mutableCategory.IsActive != isActive)
            mutableCategory.IsActive = isActive;
        return ApiResult<CategoryDto>.Success(new CategoryDto(
            mutableCategory.Id,
            mutableCategory.Name,
            mutableCategory.Description,
            mutableCategory.InterviewPrompt,
            mutableCategory.EvaluationPrompt,
            mutableCategory.DefaultDifficulty,
            mutableCategory.MaxQuestions,
            mutableCategory.IsActive,
            mutableCategory.CreatedAt
            ));
    }

    public async Task<ApiResult<CategoryDto>> ChangeCategoryAsync(ChangeCategoryDto changeCategoryDto, HttpContext httpContext, CancellationToken ct)
    {
        var mutableCategory = await _context.Categories.FirstOrDefaultAsync(c => c.Id == changeCategoryDto.Id, ct);
        if (mutableCategory == null)
            return ApiResult<CategoryDto>.Failure(new Error(404, "No such category.",ErrorType.NotFound));
        mutableCategory.Name = changeCategoryDto.Name;
        mutableCategory.Description = changeCategoryDto.Description;
        mutableCategory.InterviewPrompt = changeCategoryDto.InterviewPrompt;
        mutableCategory.EvaluationPrompt = changeCategoryDto.EvaluationPrompt;
        mutableCategory.DefaultDifficulty = changeCategoryDto.DefaultDifficulty;
        mutableCategory.MaxQuestions = changeCategoryDto.MaxQuestions;
        mutableCategory.IsActive = changeCategoryDto.IsActive;
        await _context.SaveChangesAsync(ct);

        return ApiResult<CategoryDto>.Success(new CategoryDto(
            mutableCategory.Id,
            mutableCategory.Name,
            mutableCategory.Description,
            mutableCategory.InterviewPrompt,
            mutableCategory.EvaluationPrompt,
            mutableCategory.DefaultDifficulty,
            mutableCategory.MaxQuestions,
            mutableCategory.IsActive,
            mutableCategory.CreatedAt
            ));
    }

    public async Task<ApiResult<CategoryDto>> CreateCategoryAsync(CreateCategoryDto categoryDto, HttpContext httpContext, CancellationToken ct)
    {
        var toAdd = new Category()
        {
            Name = categoryDto.Name,
            Description = categoryDto.Description,
            InterviewPrompt = categoryDto.InterviewPrompt,
            EvaluationPrompt = categoryDto.EvaluationPrompt,
            DefaultDifficulty = categoryDto.DefaultDifficulty,
            MaxQuestions = categoryDto.MaxQuestions,
            IsActive = categoryDto.IsActive,
            CreatedAt = DateTime.UtcNow
        };
        _context.Categories.Add(toAdd);
        await _context.SaveChangesAsync(ct);
        return ApiResult<CategoryDto>.Success(new CategoryDto(
            toAdd.Id,
            toAdd.Name,
            toAdd.Description,
            toAdd.InterviewPrompt,
            toAdd.EvaluationPrompt,
            toAdd.DefaultDifficulty,
            toAdd.MaxQuestions,
            toAdd.IsActive,
            toAdd.CreatedAt
            ));
    }

    public async Task<ApiResult> DeleteCategoryAsync(Guid Id, HttpContext httpContext, CancellationToken ct)
    {
        var toDelete = new Category() { Id = Id };
        _context.Categories.Remove(toDelete);
        await _context.SaveChangesAsync(ct);
        return ApiResult.Success();
    }

    public async Task<ApiResult<List<CategoryDto>>> GetInterviewCategoriesAsync(HttpContext httpContext, CancellationToken ct)
    {
        var result = await _context.Categories.Select(c=> new CategoryDto(
                c.Id,
                c.Name,
                c.Description,
                c.InterviewPrompt,
                c.EvaluationPrompt,
                c.DefaultDifficulty,
                c.MaxQuestions,
                c.IsActive,
                c.CreatedAt
            )).ToListAsync(ct);
        return ApiResult<List<CategoryDto>>.Success(result);
    }
}
