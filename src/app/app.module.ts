import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { LoginService } from './login.service';

import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { BankServiceService } from './bank-service.service';
import { DetalleComponent } from './detalle/detalle.component';
import { IngresarUsuarioComponent } from './ingresar-usuario/ingresar-usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    DetalleComponent,
    IngresarUsuarioComponent,
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ServiceWorkerModule.register('/bankmanager/ngsw-worker.js', { enabled: environment.production })
      ],
  providers: [
    LoginService,
    BankServiceService
/* . . . */
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
