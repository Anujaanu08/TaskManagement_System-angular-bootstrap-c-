using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskManagement.Migrations
{
    /// <inheritdoc />
    public partial class fkreference : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tasks_users_AssigneeId",
                table: "tasks");

            migrationBuilder.AddForeignKey(
                name: "FK_tasks_users_AssigneeId",
                table: "tasks",
                column: "AssigneeId",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tasks_users_AssigneeId",
                table: "tasks");

            migrationBuilder.AddForeignKey(
                name: "FK_tasks_users_AssigneeId",
                table: "tasks",
                column: "AssigneeId",
                principalTable: "users",
                principalColumn: "id");
        }
    }
}
