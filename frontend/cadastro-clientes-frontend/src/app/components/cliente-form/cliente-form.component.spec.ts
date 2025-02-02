import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClienteFormComponent } from './cliente-form.component';
import { ClienteService } from '../../services/cliente.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('ClienteFormComponent', () => {
  let component: ClienteFormComponent;
  let fixture: ComponentFixture<ClienteFormComponent>;
  let clienteService: jasmine.SpyObj<ClienteService>;

  beforeEach(async () => {
    const clienteServiceSpy = jasmine.createSpyObj('ClienteService', ['getCliente', 'createCliente', 'updateCliente']);

    await TestBed.configureTestingModule({
      declarations: [ClienteFormComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ClienteService, useValue: clienteServiceSpy },
        MessageService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteFormComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.inject(ClienteService) as jasmine.SpyObj<ClienteService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createCliente on submit if clienteId is null', () => {
    clienteService.createCliente.and.returnValue(of({ id: 1, nome: 'Test', email: 'test@example.com' }));
    component.clienteForm.setValue({ nome: 'Test', email: 'test@example.com' });
    component.onSubmit();
    expect(clienteService.createCliente).toHaveBeenCalled();
  });

  it('should call updateCliente on submit if clienteId is not null', () => {
    clienteService.updateCliente.and.returnValue(of({ id: 1, nome: 'Test', email: 'test@example.com' }));
    component.clienteId = 1;
    component.clienteForm.setValue({ nome: 'Test', email: 'test@example.com' });
    component.onSubmit();
    expect(clienteService.updateCliente).toHaveBeenCalledWith(1, { id: 1, nome: 'Test', email: 'test@example.com' });
  });
});