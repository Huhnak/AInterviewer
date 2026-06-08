using AInterviewer.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace AInterviewer.Controllers
{
    public record ApiResponse<T>(
        bool Success,
        T? Data,
        int ErrorCode,
        string? ErrorMessage,
        DateTime Timestamp
    );

    [ApiController]
    [Route("api/[controller]")]
    public class ApiControllerBase : ControllerBase
    {
        protected IActionResult HandleResult<T>(ApiResult<T> result)
        {
            if (result.IsSuccess)
            {
                var response = new ApiResponse<T>(true, result.Value, 200, null, DateTime.UtcNow);
                return Ok(response);
            }

            return result.Error.Type switch
            {
                ErrorType.Validation => BadRequest(new ApiResponse<T>(false, default, result.Error.Code, result.Error.Description, DateTime.UtcNow)),
                ErrorType.NotFound => NotFound(new ApiResponse<T>(false, default, 404, result.Error.Description, DateTime.UtcNow)),
                ErrorType.Conflict => Conflict(new ApiResponse<T>(false, default, 409, result.Error.Description, DateTime.UtcNow)),
                ErrorType.Custom => StatusCode(result.Error.Code, new ApiResponse<T>(false, default, result.Error.Code, result.Error.Description, DateTime.UtcNow)),
                _ => StatusCode(500, new ApiResponse<T>(false, default, 500, "An unexpected error occurred.", DateTime.UtcNow))
            };
        }
    }
}
