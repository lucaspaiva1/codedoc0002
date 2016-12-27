import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//providers
import { Facebook } from 'ionic-native';
import { FacebookService } from '../providers/facebook-service';

//Login
import { LoginPage } from '../pages/login/login/login';
import { EsqueciSenhaPage } from '../pages/login/esqueci-senha/esqueci-senha';
import { LoginEmailPage } from '../pages/login/login-email/login-email';

//telas telacionadas após logar
import { PerfilPage } from '../pages/perfil/perfil';
import { TelaPrincipalPage } from '../pages/tela-principal/tela-principal';


@NgModule({

  declarations: [
    MyApp,
    PerfilPage,
    TelaPrincipalPage,
    LoginPage,
    EsqueciSenhaPage,
    LoginEmailPage
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
    EsqueciSenhaPage,
    LoginEmailPage
  ],
  providers: [Facebook, FacebookService, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
