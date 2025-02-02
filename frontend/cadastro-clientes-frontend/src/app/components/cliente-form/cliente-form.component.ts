import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { MessageService } from 'primeng/api';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
  providers: [MessageService]
})
export class ClienteFormComponent implements OnInit {
  clienteForm: FormGroup;
  clienteId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.clienteForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.clienteId = +id;
        this.clienteService.getCliente(this.clienteId).subscribe(cliente => {
          if (cliente) {
            this.clienteForm.patchValue(cliente);
          } else {
            // Caso não encontre o cliente, redireciona ou exibe erro
            this.router.navigate(['/clientes']);
          }
        });
      }
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.clienteForm.valid) {
      if (this.clienteId !== null) {
        this.clienteService.updateCliente(this.clienteId, this.clienteForm.value).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente atualizado com sucesso' });
            this.router.navigate(['/clientes']);
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar cliente' });
          }
        );
      } else {
        this.clienteService.createCliente(this.clienteForm.value).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente salvo com sucesso' });
            this.router.navigate(['/clientes']);
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar cliente' });
          }
        );
      }
    }
  }
}