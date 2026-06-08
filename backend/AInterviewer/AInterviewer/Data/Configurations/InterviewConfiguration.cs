using AInterviewer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AInterviewer.Data.Configurations;

public class InterviewConfiguration : IEntityTypeConfiguration<Interview>
{
    public void Configure(EntityTypeBuilder<Interview> builder)
    {
        builder.ToTable("interview");

        builder.HasKey(i => i.Id);
        builder.Property(i => i.UserId)
            .IsRequired();
        builder.Property(i => i.CategoryId)
            .IsRequired();
        builder.Property(i => i.Name);
        builder.Property(i => i.DifficultyLevel);
        builder.Property(i => i.CurrentQuestionIndex);
        builder.Property(i => i.CreatedAt)
            .IsRequired();
        builder.Property(i => i.StartedAt);
        builder.Property(i => i.FinishedAt);
        builder.Property(i => i.MaxDuration)
            .IsRequired();
        builder.Property(i => i.Status)
            .HasConversion<string>()
            .IsRequired();


        builder.HasOne(i => i.User)
            .WithMany(u => u.Interviews)
            .HasForeignKey(u => u.UserId)
            .OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(i => i.Category)
            .WithMany()
            .HasForeignKey(i => i.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
