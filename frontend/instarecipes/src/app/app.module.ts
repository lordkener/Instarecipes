import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';

@NgModule({

  //Aqui se deben importar los componentes
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent
  ],

  //Aqui se deben importar los modulos
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [], //Aqui se deberia poner los interceptors, como el del login y register, y tambien los services
  bootstrap: [AppComponent]
})
//@ts-ignore
export class AppModule { }
