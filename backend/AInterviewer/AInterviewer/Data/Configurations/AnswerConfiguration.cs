using AInterviewer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AInterviewer.Data.Configurations;

public class AnswerConfiguration : IEntityTypeConfiguration<Answer>
{
    public void Configure(EntityTypeBuilder<Answer> builder)
    {
        builder.ToTable("answer");

        builder.HasKey(a => a.Id);
        builder.Property(a => a.QuestionId)
            .IsRequired();
        builder.Property(a => a.Content);
        builder.Property(a => a.Score);
        builder.Property(a => a.Feedback);
        builder.Property(a => a.CreatedAt);

        builder.HasOne(a => a.Question)
            .WithOne(r => r.Answer)
            .HasForeignKey<Answer>(a=>a.QuestionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
