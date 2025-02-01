import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.clienteId = +id;
        this.clienteService.getCliente(this.clienteId).subscribe(cliente => {
          this.clienteForm.patchValue(cliente);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.clienteForm.valid) {
      const cliente: Cliente = this.clienteForm.value;
      if (this.clienteId !== null) {
        this.clienteService.updateCliente(this.clienteId, cliente).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente atualizado com sucesso' });
          this.router.navigate(['/clientes']);
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar cliente' });
        });
      } else {
        this.clienteService.createCliente(cliente).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente criado com sucesso' });
          this.router.navigate(['/clientes']);
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar cliente' });
        });
      }
    }
  }
}