namespace AInterviewer.DTOs;

public record UserRegisterDto(
    string Username,
    string Email,
    string Password
);
public record UserLoginRequestDto(
    string Username,
    string Password
);
public record UserLoginResponseDto(
    string token,
    Guid Id,
    string Username,
    string Email,
    string RoleName
);


