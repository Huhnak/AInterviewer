namespace AInterviewer.DTOs;

public record UserRegisterDto(
    string Username,
    string Email,
    string Password
);
public record UserLoginDto(
    string Username,
    string Password
);

