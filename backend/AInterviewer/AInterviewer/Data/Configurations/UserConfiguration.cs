using AInterviewer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AInterviewer.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("user");

        builder.HasKey(a => a.Id);
        builder.Property(a => a.RoleId)
            .IsRequired();
        builder.Property(a => a.Username)
            .IsRequired()
            .HasMaxLength(50);
        builder.Property(a => a.Email)
            .IsRequired();
        builder.Property(a => a.PasswordHash)
            .IsRequired();
        builder.Property(a => a.CreatedAt);
        builder.HasOne(a => a.Role)
            .WithMany(r => r.Users)
            .HasForeignKey(a => a.RoleId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
