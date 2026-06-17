using AInterviewer.Data;
using AInterviewer.DTOs;
using AInterviewer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace AInterviewer.Services;

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;
    public AuthService(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<ApiResult> RegisterAsync(UserRegisterDto user, CancellationToken ct)
    {
        if (!IsValidPassword(user.Password))
            return ApiResult.Failure(Error.None);
        if (await _context.Users.AsNoTracking().AnyAsync(u => u.Username == user.Username,ct))
            return ApiResult.Failure(new Error(400, "Such user already exist.", ErrorType.Conflict));

        string passwordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);
        var roleId = await _context.Roles
            .Where(r => r.Name == "User")
            .Select(r => r.Id)
            .FirstAsync(ct);
        User dbUser = new User()
        {
            Username = user.Username,
            PasswordHash = passwordHash,
            Email = user.Email,
            RoleId = roleId,
        };
        _context.Add(dbUser);
        await _context.SaveChangesAsync(ct);
        return ApiResult.Success();
    }

    public async Task<ApiResult<UserLoginResponseDto>> LoginAsync(UserLoginRequestDto user, CancellationToken ct)
    {
        User? dbUser = await _context.Users
            .AsNoTracking()
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Username == user.Username, ct);
        if(dbUser == null || !BCrypt.Net.BCrypt.Verify(user.Password, dbUser.PasswordHash))
            return ApiResult<UserLoginResponseDto>.Failure(new Error(400, "Wrong username or password.", ErrorType.Failure));
        string accessToken = CreateAccessToken(dbUser);
        var result = new UserLoginResponseDto(accessToken, dbUser.Id, dbUser.Username, dbUser.Email, dbUser.Role.Name);
        return ApiResult<UserLoginResponseDto>.Success(result);
    }


    private static readonly Regex PasswordPattern =new Regex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$", RegexOptions.Compiled);
    public static bool IsValidPassword(string password)
    {
        if (string.IsNullOrEmpty(password)) return false;
        return PasswordPattern.IsMatch(password);
    }
    private string CreateAccessToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role.Name),
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: creds
            );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    private static string CreateRefreshToken()
    {
        var randomBytes = RandomNumberGenerator.GetBytes(64);
        return Convert.ToBase64String(randomBytes);
    }
    private static string HashRefreshToken(string token)
    {
        return Convert.ToBase64String(
            SHA256.HashData(Encoding.UTF8.GetBytes(token)));
    }
}
