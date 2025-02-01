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
    public void CriarCliente_DeveAdicionarCliente()
    {
        // Arrange
        var clienteDto = new ClienteDTO { Nome = "Cliente 1", Email = "cliente1@example.com" };

        // Act
        var result = _clienteService.CriarCliente(clienteDto);

        // Assert
        var cliente = _context.Clientes.FirstOrDefault(c => c.Id == result.Id);
        Assert.NotNull(cliente);
        Assert.Equal(clienteDto.Nome, cliente.Nome);
        Assert.Equal(clienteDto.Email, cliente.Email);
    }

    [Fact]
    public void AtualizarCliente_DeveAtualizarClienteExistente()
    {
        // Arrange
        var cliente = new Cliente { Id = 1, Nome = "Cliente 1", Email = "cliente1@example.com" };
        _context.Clientes.Add(cliente);
        _context.SaveChanges();

        var clienteDto = new ClienteDTO { Id = 1, Nome = "Cliente Atualizado", Email = "clienteatualizado@example.com" };

        // Act
        _clienteService.AtualizarCliente(clienteDto);

        // Assert
        var clienteAtualizado = _context.Clientes.FirstOrDefault(c => c.Id == clienteDto.Id);
        Assert.NotNull(clienteAtualizado);
        Assert.Equal(clienteDto.Nome, clienteAtualizado.Nome);
        Assert.Equal(clienteDto.Email, clienteAtualizado.Email);
    }

    [Fact]
    public void ExcluirCliente_DeveRemoverClienteExistente()
    {
        // Arrange
        var cliente = new Cliente { Id = 1, Nome = "Cliente 1", Email = "cliente1@example.com" };
        _context.Clientes.Add(cliente);
        _context.SaveChanges();

        // Act
        _clienteService.ExcluirCliente(1);

        // Assert
        var clienteRemovido = _context.Clientes.FirstOrDefault(c => c.Id == 1);
        Assert.Null(clienteRemovido);
    }
}