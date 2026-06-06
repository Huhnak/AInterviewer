using AInterviewer.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace AInterviewer.Controllers
{
    public class AuthController : ApiControllerBase
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] string Username)
        {
            ApiResult<string> result = await Task.FromResult(ApiResult<string>.Saccess($"User {Username} registered saccessfally."));
            return Ok(result);
        }
    }
}
