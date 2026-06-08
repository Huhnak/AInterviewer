using AInterviewer.DTOs;

namespace AInterviewer.Services;

public interface IAuthService
{
    Task<ApiResult> RegisterAsync(UserRegisterDto user, CancellationToken ct);
    Task<ApiResult<string>> LoginAsync(UserLoginDto user, CancellationToken ct);
}
