using Microsoft.EntityFrameworkCore;

namespace CadastroClientesAPI.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<Cliente> Clientes { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}