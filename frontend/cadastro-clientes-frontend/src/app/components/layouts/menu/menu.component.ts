import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/'
      },
      {
        label: 'Listar Clientes',
        icon: 'pi pi-fw pi-list',
        routerLink: '/clientes'
      },
      {
        label: 'Cadastrar Cliente',
        icon: 'pi pi-fw pi-plus',
        routerLink: '/clientes/new'
      }
    ];
  }
}