namespace CadastroClientesAPI.DTOs
{
    public class ClienteDTO
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public required string Email { get; set; }
    }
}