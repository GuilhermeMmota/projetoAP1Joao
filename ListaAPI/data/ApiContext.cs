using Microsoft.EntityFrameworkCore;
using ListaAPI.Models;
using ListaAPI.Helpers;

namespace ListaAPI.Data
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options)
          : base(options)
        {}
        public DbSet<Listas> Lista { get; set; }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modeBuilder)
        {
          modeBuilder.Entity<User>()
            .HasData(new User { Id = 1, Username = "admin", Password = AuthenticationHelper.ComputeHash("123"), Role = "admin"});

          modeBuilder.Entity<User>()
            .HasIndex(u => u.Username)
            .IsUnique();
        }
    }
}