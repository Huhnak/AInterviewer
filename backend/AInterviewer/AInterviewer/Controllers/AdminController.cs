using AInterviewer.DTOs;
using AInterviewer.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AInterviewer.Controllers;

[Authorize(Roles = "Admin")]
public class AdminController : ApiControllerBase
{
    private readonly IFooService _fooService;
    public AdminController(IFooService fooService)
    {
        _fooService = fooService;
    }
    [HttpPost("category/create")]
    public async Task<ActionResult<CategoryDto>> CreateCategory([FromBody] CreateCategoryDto category, CancellationToken ct)
    {
        var result = await _fooService.CreateCategoryAsync(category,HttpContext, ct);
        if (result.IsFailure)
            return BadRequest(result.Error);
        return Ok(result.Value);
    }
    [HttpDelete("category/delete/{Id}")]
    public async Task<IActionResult> DeleteCategory(Guid Id, CancellationToken ct)
    {
        var result = await _fooService.DeleteCategoryAsync(Id, HttpContext, ct);
        if (result.IsFailure)
            return BadRequest(result.Error);
        return Ok(result);
    }
    [HttpPost("category/change")]
    public async Task<ActionResult<CategoryDto>> ChangeCategory(ChangeCategoryDto changeCategoryDto, CancellationToken ct)
    {
        var result = await _fooService.ChangeCategoryAsync(changeCategoryDto, HttpContext, ct);
        if (result.IsFailure)
            return BadRequest(result.Error);
        return Ok(result.Value);
    }

}
