using AInterviewer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AInterviewer.Data.Configurations;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.ToTable("category");

        builder.HasKey(c => c.Id);
        builder.Property(c => c.Name)
            .IsRequired()
            .HasMaxLength(50);
        builder.Property(c => c.Description);
        builder.Property(c => c.InterviewPrompt)
            .IsRequired();
        builder.Property(c => c.EvaluationPrompt)
           .IsRequired();
        builder.Property(c => c.DefaultDifficulty)
            .IsRequired();
        builder.Property(c => c.MaxQuestions)
            .IsRequired();
        builder.Property(c => c.IsActive)
            .HasDefaultValue(true);
        builder.Property(c => c.CreatedAt);
    }
}
