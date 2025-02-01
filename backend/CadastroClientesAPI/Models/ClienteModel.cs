using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace CadastroClientesAPI.Models
{
    public class Cliente
    {
        [Key]
        public int Id { get; set; }
       [Required(ErrorMessage = "O nome é obrigatório.")]
        [StringLength(100, ErrorMessage = "O nome deve ter no máximo 100 caracteres.")]
        public required string Nome { get; set; }

        [Required(ErrorMessage = "O e-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "O e-mail informado não é válido.")]
        public required string Email { get; set; }
    }
}