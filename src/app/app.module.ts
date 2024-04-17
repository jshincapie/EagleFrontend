import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { RecaptchaModule } from 'ng-recaptcha';



import { AppComponent } from './app.component';
import { NavComponent } from './estructura/nav/nav.component';
import { AsideComponent } from './estructura/aside/aside.component';
import { ContentComponent } from './estructura/content/content.component';
import { FooterComponent } from './estructura/footer/footer.component';
import { PrincipalComponent } from './estructura/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { UsuariosComponent } from './modulos/usuarios/usuarios.component';
import { TercerosComponent } from './modulos/terceros/terceros.component';
import { PedidosComponent } from './modulos/pedidos/pedidos.component';
import { ComprasComponent } from './modulos/compras/compras.component';
import { FormsModule } from '@angular/forms';
import { MarcaComponent } from './modulos/marca/marca.component';
import { CategoriasComponent } from './modulos/categorias/categorias.component';
import { RolComponent } from './modulos/rol/rol.component';
import { ProductosComponent } from './modulos/productos/productos.component';
import { LoginComponent } from './modulos/login/login.component';
import { NoEncontroComponent } from './modulos/no-encontro/no-encontro.component';
import { ComprainsertarComponent } from './modulos/comprainsertar/comprainsertar.component';
import { PedidoinsertarComponent } from './modulos/pedidoinsertar/pedidoinsertar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AsideComponent,
    ContentComponent,
    FooterComponent,
    PrincipalComponent,
    DashboardComponent,
    UsuariosComponent,
    TercerosComponent,
    PedidosComponent,
    ComprasComponent,
    MarcaComponent,
    CategoriasComponent,
    RolComponent,
    ProductosComponent,
    LoginComponent,
    NoEncontroComponent,
    ComprainsertarComponent,
    PedidoinsertarComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule,
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
