using AInterviewer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AInterviewer.Data.Configurations;

public class ResultConfiguration : IEntityTypeConfiguration<Result>
{
    public void Configure(EntityTypeBuilder<Result> builder)
    {
        builder.ToTable("result");

        builder.HasKey(r => r.Id);
        builder.Property(r => r.InterviewId)
            .IsRequired();
        builder.Property(r => r.TotalScore);
        builder.Property(r => r.CorrectAnswers);
        builder.Property(r => r.TotalAnswers);
        builder.Property(r => r.Level);
        builder.Property(r => r.Strengths);
        builder.Property(r => r.Weaknesses);
        builder.Property(r => r.Recomendations);
        builder.HasOne(r => r.Interview)
            .WithOne(i => i.Result)
            .HasForeignKey<Result>(r => r.InterviewId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
