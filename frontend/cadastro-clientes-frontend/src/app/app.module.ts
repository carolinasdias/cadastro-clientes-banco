// filepath: /c:/Users/carol/OneDrive/Área de Trabalho/projeto-pan/cadastro-clientes-banco/frontend/cadastro-clientes-frontend/src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MegaMenuModule } from 'primeng/megamenu';
import { MessageService } from 'primeng/api';

import { AppComponent } from './app.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './components/layouts/layout.module';

@NgModule({
  declarations: [
    AppComponent,
    ClienteListComponent,
    ClienteFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    ButtonModule,
    MenubarModule,
    SidebarModule,
    CardModule,
    InputTextModule,
    MegaMenuModule,
    AppRoutingModule,
    LayoutModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }