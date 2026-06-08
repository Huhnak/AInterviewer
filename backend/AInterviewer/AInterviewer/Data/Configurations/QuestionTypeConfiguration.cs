using AInterviewer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AInterviewer.Data.Configurations;

public class QuestionTypeConfiguration : IEntityTypeConfiguration<QuestionType>
{
    public void Configure(EntityTypeBuilder<QuestionType> builder)
    {
        builder.ToTable("question_type");

        builder.HasKey(q => q.Id);
        builder.Property(q => q.Name)
            .IsRequired();
    }
}
