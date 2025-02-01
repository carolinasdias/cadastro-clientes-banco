using CadastroClientesAPI.Models;
using CadastroClientesAPI.DTOs;
using System.Collections.Generic;
using System.Linq;

namespace CadastroClientesAPI.Services
{
    public class ClienteService
    {
        private readonly AppDbContext _context;

        public ClienteService(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<ClienteDTO> ObterTodosClientes()
        {
            return _context.Clientes.Select(c => new ClienteDTO
            {
                Id = c.Id,
                Nome = c.Nome,
                Email = c.Email
            }).ToList();
        }

        public ClienteDTO CriarCliente(ClienteDTO clienteDto)
        {
            var cliente = new Cliente
            {
                Nome = clienteDto.Nome,
                Email = clienteDto.Email
            };
            _context.Clientes.Add(cliente);
            _context.SaveChanges();
            clienteDto.Id = cliente.Id;
            return clienteDto;
        }

        public void AtualizarCliente(ClienteDTO clienteDto)
        {
            var cliente = _context.Clientes.Find(clienteDto.Id);
            if (cliente != null)
            {
                cliente.Nome = clienteDto.Nome;
                cliente.Email = clienteDto.Email;
                _context.SaveChanges();
            }
        }

        public void ExcluirCliente(int id)
        {
            var cliente = _context.Clientes.Find(id);
            if (cliente != null)
            {
                _context.Clientes.Remove(cliente);
                _context.SaveChanges();
            }
        }
    }
}