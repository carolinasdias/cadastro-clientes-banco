using Microsoft.AspNetCore.Mvc;
using CadastroClientesAPI.Models;
using CadastroClientesAPI.Services;
using CadastroClientesAPI.DTOs;
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
        public ActionResult<IEnumerable<ClienteDTO>> ObterClientes()
        {
            var clientes = _clienteService.ObterTodosClientes();
            return Ok(clientes);
        }

        [HttpPost]
        public ActionResult<ClienteDTO> AdicionarCliente([FromBody] ClienteDTO clienteDto)
        {
            var cliente = _clienteService.CriarCliente(clienteDto);
            return CreatedAtAction(nameof(ObterClientes), new { id = cliente.Id }, cliente);
        }

        [HttpPut("{id}")]
        public ActionResult AtualizarCliente(int id, [FromBody] ClienteDTO clienteDto)
        {
            if (id != clienteDto.Id)
            {
                return BadRequest();
            }

            _clienteService.AtualizarCliente(clienteDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult RemoverCliente(int id)
        {
            _clienteService.ExcluirCliente(id);
            return NoContent();
        }
    }
}