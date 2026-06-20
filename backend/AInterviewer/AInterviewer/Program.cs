using AInterviewer.Data;
using AInterviewer.Services;
using AInterviewer.Services.Interfaces;
using LogDashboard;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.AI;
using Microsoft.IdentityModel.Tokens;
using OpenAI;
using Serilog;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Configuration.AddJsonFile(
    "/run/secrets/backend_secrets",
    optional: true,
    reloadOnChange: false);
builder.Configuration.AddJsonFile(
    "/etc/secrets/backend_secrets",
    optional: true,
    reloadOnChange: false);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        RoleClaimType = ClaimTypes.Role,
        NameClaimType = ClaimTypes.Name,
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
    //options.Events = new JwtBearerEvents
    //{
    //    OnMessageReceived = context =>
    //    {
    //        var accessToken = context.Request.Query["access_token"];
    //        var path = context.HttpContext.Request.Path;

    //        if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/habs/yjsHab"))
    //        {
    //            context.Token = accessToken;
    //        }

    //        return Task.CompletedTask;
    //    }
    //};
});
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration["ConnectionString:DefaultConnection"]));

builder.Services.AddCors(options => {
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.WithOrigins(
                "http://localhost:12117",
                "https://localhost:12117",
                "http://localhost:8080",
                "https://localhost:8080",
                "https://ainterviewer-s5ab.onrender.com",
                "https://ainterviewer.creanima.ru")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor |
        ForwardedHeaders.XForwardedProto;

    options.KnownIPNetworks.Clear();
    options.KnownProxies.Clear();
});

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IInterviewService, InterviewService>();
builder.Services.AddScoped<IAiInterviewService, AiInterviewService>();
builder.Services.AddScoped<IFooService, FooService>();

builder.Services.AddSingleton<IChatClient>(sp =>
{
    var httpClient = new HttpClient();

    return new YandexGptChatClient(
        httpClient,
        builder.Configuration["YandexGPT:ApiKey"]!,
        builder.Configuration["YandexGPT:FolderId"]!);
});


var app = builder.Build();
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
app.Urls.Add($"http://0.0.0.0:{port}");
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options=>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "AInterviewer API");
    });
}

app.UseForwardedHeaders();
//app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}

app.Run();
