using Microsoft.AspNetCore.Mvc;
using CadastroClientesAPI.DTOs;
using CadastroClientesAPI.Services;
using System.Collections.Generic;

namespace CadastroClientesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly ClienteService _clienteService;

        public ClientesController(ClienteService clienteService)
        {
            _clienteService = clienteService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ClienteDTO>> ObterTodosClientes()
        {
            var clientes = _clienteService.ObterTodosClientes();
            return Ok(clientes);
        }

        [HttpPost]
        public ActionResult<ClienteDTO> CriarCliente(ClienteDTO clienteDto)
        {
            var cliente = _clienteService.CriarCliente(clienteDto);
            return CreatedAtAction(nameof(ObterTodosClientes), new { id = cliente.Id }, cliente);
        }

        [HttpPut("{id}")]
        public IActionResult AtualizarCliente(int id, ClienteDTO clienteDto)
        {
            if (id != clienteDto.Id)
            {
                return BadRequest();
            }

            _clienteService.AtualizarCliente(clienteDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult ExcluirCliente(int id)
        {
            _clienteService.ExcluirCliente(id);
            return NoContent();
        }

        // Adicionar suporte ao método OPTIONS
        [HttpOptions]
        public IActionResult Options()
        {
            Response.Headers.Add("Allow", "GET, POST, PUT, DELETE, OPTIONS");
            return Ok();
        }
    }
}