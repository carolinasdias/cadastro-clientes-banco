using Xunit;
using CadastroClientesAPI.Services;
using CadastroClientesAPI.Models;
using CadastroClientesAPI.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

public class ClienteServiceTest
{
    private readonly ClienteService _clienteService;
    private readonly AppDbContext _context;

    public ClienteServiceTest()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;
        _context = new AppDbContext(options);
        _clienteService = new ClienteService(_context);
    }

    [Fact]
    public void ObterTodosClientes_DeveRetornarTodosClientes()
    {
        // Arrange
        _context.Database.EnsureDeleted(); // Limpa o banco de dados antes do teste
        var clientes = new List<Cliente>
        {
            new Cliente { Id = 1, Nome = "Cliente 1", Email = "cliente1@example.com" },
            new Cliente { Id = 2, Nome = "Cliente 2", Email = "cliente2@example.com" }
        };

        _context.Clientes.AddRange(clientes);
        _context.SaveChanges();

      
        var result = _clienteService.ObterTodosClientes();

        
        Assert.Equal(2, result.Count());
        Assert.Equal("Cliente 1", result.First().Nome);
    }

    [Fact]
    public void CriarCliente_DeveAdicionarCliente()
    {
        
        _context.Database.EnsureDeleted(); // Limpa o banco de dados antes do teste
        var clienteDto = new ClienteDTO { Nome = "Cliente 1", Email = "cliente1@example.com" };

       
        var result = _clienteService.CriarCliente(clienteDto);

        
        var cliente = _context.Clientes.FirstOrDefault(c => c.Id == result.Id);
        Assert.NotNull(cliente);
        Assert.Equal(clienteDto.Nome, cliente.Nome);
        Assert.Equal(clienteDto.Email, cliente.Email);
    }

    [Fact]
    public void AtualizarCliente_DeveAtualizarClienteExistente()
    {
        
        _context.Database.EnsureDeleted(); // Limpa o banco de dados antes do teste
        var cliente = new Cliente { Id = 1, Nome = "Cliente 1", Email = "cliente1@example.com" };
        _context.Clientes.Add(cliente);
        _context.SaveChanges();

        var clienteDto = new ClienteDTO { Id = 1, Nome = "Cliente Atualizado", Email = "clienteatualizado@example.com" };

       
        _clienteService.AtualizarCliente(clienteDto);

       
        var clienteAtualizado = _context.Clientes.FirstOrDefault(c => c.Id == clienteDto.Id);
        Assert.NotNull(clienteAtualizado);
        Assert.Equal(clienteDto.Nome, clienteAtualizado.Nome);
        Assert.Equal(clienteDto.Email, clienteAtualizado.Email);
    }

    [Fact]
    public void AtualizarCliente_NaoDeveAtualizarClienteInexistente()
    {
       
        _context.Database.EnsureDeleted(); // Limpa o banco de dados antes do teste
        var clienteDto = new ClienteDTO { Id = 1, Nome = "Cliente Inexistente", Email = "clienteinexistente@example.com" };

       
        _clienteService.AtualizarCliente(clienteDto);

        var clienteAtualizado = _context.Clientes.FirstOrDefault(c => c.Id == clienteDto.Id);
        Assert.Null(clienteAtualizado);
    }

    [Fact]
    public void ExcluirCliente_DeveRemoverClienteExistente()
    {
        
        _context.Database.EnsureDeleted(); // Limpa o banco de dados antes do teste
        var cliente = new Cliente { Id = 1, Nome = "Cliente 1", Email = "cliente1@example.com" };
        _context.Clientes.Add(cliente);
        _context.SaveChanges();

       
        _clienteService.ExcluirCliente(1);

        
        var clienteRemovido = _context.Clientes.FirstOrDefault(c => c.Id == 1);
        Assert.Null(clienteRemovido);
    }

    [Fact]
    public void ExcluirCliente_NaoDeveRemoverClienteInexistente()
    {
        
        _context.Database.EnsureDeleted(); // Limpa o banco de dados antes do teste

       
        _clienteService.ExcluirCliente(1);

       
        var clienteRemovido = _context.Clientes.FirstOrDefault(c => c.Id == 1);
        Assert.Null(clienteRemovido);
    }
}