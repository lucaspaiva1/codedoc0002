import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//Login
import { LoginPage } from '../pages/login/login/login';
import { EsqueciSenhaPage } from '../pages/login/esqueci-senha/esqueci-senha';
import { LoginEmailPage } from '../pages/login/login-email/login-email';
import { CadastrarNovoUsuarioPage } from '../pages/login/cadastrar-novo-usuario/cadastrar-novo-usuario';

//telas telacionadas após logar
import { PerfilPage } from '../pages/perfil/perfil';
import { TelaPrincipalPage } from '../pages/tela-principal/tela-principal';
import { FeedPage } from '../pages/feed/feed';
import { CalendarioPage } from '../pages/calendario/calendario';
import { BuscaPage } from '../pages/busca/busca';


@NgModule({

  declarations: [
    MyApp,
    PerfilPage,
    TelaPrincipalPage,
    LoginPage,
    EsqueciSenhaPage,
    LoginEmailPage,
    FeedPage,
    CalendarioPage,
    BuscaPage,
    CadastrarNovoUsuarioPage
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
    LoginEmailPage,
    FeedPage,
    CalendarioPage,
    BuscaPage,
    CadastrarNovoUsuarioPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
