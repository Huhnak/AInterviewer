using AInterviewer.DTOs;

namespace AInterviewer.Services.Interfaces;

public interface IAuthService
{
    Task<ApiResult> RegisterAsync(UserRegisterDto user, CancellationToken ct);
    Task<ApiResult<UserLoginResponseDto>> LoginAsync(UserLoginRequestDto user, CancellationToken ct);
}
