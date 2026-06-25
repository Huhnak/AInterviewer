using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AInterviewer.Migrations
{
    /// <inheritdoc />
    public partial class delete_db_configuration_change : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_answer_question_QuestionId",
                table: "answer");

            migrationBuilder.AddForeignKey(
                name: "FK_answer_question_QuestionId",
                table: "answer",
                column: "QuestionId",
                principalTable: "question",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_answer_question_QuestionId",
                table: "answer");

            migrationBuilder.AddForeignKey(
                name: "FK_answer_question_QuestionId",
                table: "answer",
                column: "QuestionId",
                principalTable: "question",
                principalColumn: "Id");
        }
    }
}
