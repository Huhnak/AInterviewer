namespace AInterviewer.DTOs;

public record CreateCategoryDto(
    string Name,
    string Description,
    string InterviewPrompt,
    string EvaluationPrompt,
    int DefaultDifficulty,
    int MaxQuestions,
    bool IsActive
);
public record CategoryDto(
    Guid Id,
    string Name,
    string Description,
    string InterviewPrompt,
    string EvaluationPrompt,
    int DefaultDifficulty,
    int MaxQuestions,
    bool IsActive,
    DateTime CreatedAt
);
public record ChangeCategoryDto(
    Guid Id,
    string Name,
    string Description,
    string InterviewPrompt,
    string EvaluationPrompt,
    int DefaultDifficulty,
    int MaxQuestions,
    bool IsActive
);