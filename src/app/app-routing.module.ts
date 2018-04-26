import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }       from './login/login.component';
import { InicioComponent}       from './inicio/inicio.component';
import { DetalleComponent }     from './detalle/detalle.component';
import { IngresarUsuarioComponent } from './ingresar-usuario/ingresar-usuario.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: 'ingresar', component:IngresarUsuarioComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}