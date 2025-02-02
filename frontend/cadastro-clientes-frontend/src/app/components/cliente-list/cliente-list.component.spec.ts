import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClienteListComponent } from './cliente-list.component';
import { ClienteService } from '../../services/cliente.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Cliente } from 'src/app/models/cliente.model';
import { Router } from '@angular/router';

describe('ClienteListComponent', () => {
  let component: ClienteListComponent;
  let fixture: ComponentFixture<ClienteListComponent>;
  let clienteService: jasmine.SpyObj<ClienteService>;

  beforeEach(async () => {
    const clienteServiceSpy = jasmine.createSpyObj('ClienteService', ['getClientes', 'deleteCliente']);

    await TestBed.configureTestingModule({
      declarations: [ClienteListComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ClienteService, useValue: clienteServiceSpy },
        MessageService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteListComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.inject(ClienteService) as jasmine.SpyObj<ClienteService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load clientes on init', () => {
    const mockClientes: Cliente[] = [
      { id: 1, nome: 'Cliente 1', email: 'cliente1@example.com' },
      { id: 2, nome: 'Cliente 2', email: 'cliente2@example.com' }
    ];
    clienteService.getClientes.and.returnValue(of(mockClientes));
    component.ngOnInit();
    expect(component.clientes).toEqual(mockClientes);
  });

  it('should navigate to edit cliente', () => {
    const router = TestBed.inject(Router) as Router;
    spyOn(router, 'navigate');
    component.editCliente(1);
    expect(router.navigate).toHaveBeenCalledWith(['/clientes/edit', 1]);
  });

  it('should delete cliente and reload list', () => {
    const mockClientes: Cliente[] = [
      { id: 1, nome: 'Cliente 1', email: 'cliente1@example.com' },
      { id: 2, nome: 'Cliente 2', email: 'cliente2@example.com' }
    ];
    clienteService.getClientes.and.returnValue(of(mockClientes));
    clienteService.deleteCliente.and.returnValue(of(void 0));
    component.loadClientes();
    component.deleteCliente(1);
    expect(clienteService.deleteCliente).toHaveBeenCalledWith(1);
    expect(clienteService.getClientes).toHaveBeenCalledTimes(2); // Called once in ngOnInit and once after delete
  });
});