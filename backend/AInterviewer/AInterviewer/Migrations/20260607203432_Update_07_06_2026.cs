using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AInterviewer.Migrations
{
    /// <inheritdoc />
    public partial class Update_07_06_2026 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Topic",
                table: "question",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "interview",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "CurrentQuestionIndex",
                table: "interview",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DifficultyLevel",
                table: "interview",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "FinishedAt",
                table: "interview",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "MaxDuration",
                table: "interview",
                type: "interval",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "interview",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "StartedAt",
                table: "interview",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "interview",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Topic",
                table: "question");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "interview");

            migrationBuilder.DropColumn(
                name: "CurrentQuestionIndex",
                table: "interview");

            migrationBuilder.DropColumn(
                name: "DifficultyLevel",
                table: "interview");

            migrationBuilder.DropColumn(
                name: "FinishedAt",
                table: "interview");

            migrationBuilder.DropColumn(
                name: "MaxDuration",
                table: "interview");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "interview");

            migrationBuilder.DropColumn(
                name: "StartedAt",
                table: "interview");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "interview");
        }
    }
}
