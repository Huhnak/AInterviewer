using AInterviewer.DTOs;
using AInterviewer.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AInterviewer.Controllers;
public class AuthController : ApiControllerBase
{
    private IAuthService _authService;
    public AuthController(IAuthService authService) {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterDto user, CancellationToken ct)
    {
        ApiResult result = await _authService.RegisterAsync(user, ct);
        if (result.IsFailure)
            return BadRequest(result.Error);
        return Ok();
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login([FromBody] UserLoginRequestDto user, CancellationToken ct)
    {
        var result = await _authService.LoginAsync(user, ct);
        if (result.IsFailure)
            return BadRequest(result.Error);
        return Ok(result.Value);
    }
}
