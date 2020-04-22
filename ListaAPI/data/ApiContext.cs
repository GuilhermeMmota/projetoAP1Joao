using Microsoft.EntityFrameworkCore;
using ListaAPI.Models;

namespace ListaAPI.Data
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options)
          : base(options)
        {}
        public DbSet<Listas> Lista { get; set; }
    }
}