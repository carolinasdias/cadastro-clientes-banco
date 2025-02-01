using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace CadastroClientesAPI.Models
{
    public class Cliente
    {
        [Key]
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
    }
}