using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiLolNew.Migrations
{
    /// <inheritdoc />
    public partial class CriacaoTabelaContato2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Champs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Lane = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SkillQ = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SkillW = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SkillE = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SkillR = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageChamp = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Champs", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Champs");
        }
    }
}
