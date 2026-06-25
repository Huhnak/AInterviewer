using AInterviewer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AInterviewer.Data.Configurations;

public class QuestionConfiguration : IEntityTypeConfiguration<Question>
{
    public void Configure(EntityTypeBuilder<Question> builder)
    {
        builder.ToTable("question");

        builder.HasKey(q => q.Id);
        builder.Property(q => q.InterviewId)
            .IsRequired();
        builder.Property(q => q.TypeId);
        builder.Property(q => q.Topic)
            .IsRequired();
        builder.Property(q => q.Content)
            .IsRequired();
        builder.Property(q => q.Difficulty)
            .IsRequired();
        builder.Property(q => q.OrderIndex)
            .IsRequired();
        builder.Property(q => q.CreatedAt);


        builder.HasOne(q=>q.Type)
            .WithMany(t=>t.Questions)
            .HasForeignKey(q=>q.TypeId)
            .OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(q => q.Interview)
            .WithMany(i => i.Questions)
            .HasForeignKey(q => q.InterviewId);
        builder.HasOne(q => q.Answer)
            .WithOne(a => a.Question)
            .HasForeignKey<Answer>(a => a.QuestionId)
            .OnDelete(DeleteBehavior.Cascade);
        
    }
}
