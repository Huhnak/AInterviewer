using AInterviewer.DTOs;
using AInterviewer.Models;

namespace AInterviewer.Services.Interfaces;
public interface IFooService
{
    Task<ApiResult<List<CategoryDto>>> GetInterviewCategoriesAsync(HttpContext httpContext, CancellationToken ct);
    Task<ApiResult<CategoryDto>> CreateCategoryAsync(CreateCategoryDto categoryDto, HttpContext httpContext, CancellationToken ct);
    Task<ApiResult> DeleteCategoryAsync(Guid Id, HttpContext httpContext, CancellationToken ct);
    Task<ApiResult<CategoryDto>> ChangeCategoryAsync(ChangeCategoryDto changeCategoryDto, HttpContext httpContext, CancellationToken ct);
    Task<ApiResult<CategoryDto>> ChangeCategoryActivityAsync(Guid Id, bool isActive, HttpContext httpContext, CancellationToken ct);
}
