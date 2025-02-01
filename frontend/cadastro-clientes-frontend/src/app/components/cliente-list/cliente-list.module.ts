import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClienteListComponent } from './cliente-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

const routes: Routes = [
  { path: '', component: ClienteListComponent }
];

@NgModule({
  declarations: [ClienteListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    ButtonModule
  ]
})
export class ClienteListModule { }