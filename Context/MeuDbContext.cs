using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiLolNew.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiLolNew.Context
{
    public class MeuDbContext : DbContext
    {
        public MeuDbContext(DbContextOptions<MeuDbContext> options) : base(options)
        {
        }

       
        public MeuDbContext()
        {
        }

        public DbSet<Champ> Champs { get; set; }

        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=localhost\\sqlexpress; Initial Catalog=Champions; Integrated Security=True; TrustServerCertificate=True;");
            }
        }
    }
}