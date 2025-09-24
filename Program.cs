using ApiLolNew.Context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MeuDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConexaoPadrao"))
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 🔹 Serve arquivos estáticos (wwwroot/images)
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.Run();