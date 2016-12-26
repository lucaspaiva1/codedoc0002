import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//Login
import { LoginPage } from '../pages/login/login/login';
import { EsqueciSenhaPage } from '../pages/login/esqueci-senha/esqueci-senha';

//telas telacionadas após logar
import { PerfilPage } from '../pages/perfil/perfil';
import { TelaPrincipalPage } from '../pages/tela-principal/tela-principal';


@NgModule({

  declarations: [
    MyApp,
    PerfilPage,
    TelaPrincipalPage,
    LoginPage,
    EsqueciSenhaPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PerfilPage,
    TelaPrincipalPage,
    LoginPage,
    EsqueciSenhaPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
