import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'clientes',
    loadChildren: () => import('./components/cliente-list/cliente-list.module').then(m => m.ClienteListModule)
  },
  {
    path: 'clientes/new',
    loadChildren: () => import('./components/cliente-form/cliente-form.module').then(m => m.ClienteFormModule)
  },
  {
    path: 'clientes/edit/:id',
    loadChildren: () => import('./components/cliente-form/cliente-form.module').then(m => m.ClienteFormModule)
  },
  { path: '', redirectTo: '/clientes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }