import { NgModule, ErrorHandler} from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NgCalendarModule  } from 'ionic2-calendar';

//providers
import { Facebook } from 'ionic-native';
import { UserService } from '../providers/user-service';

//Login
import { LoginPage } from '../pages/login/login/login';
import { EsqueciSenhaPage } from '../pages/login/esqueci-senha/esqueci-senha';
import { LoginEmailPage } from '../pages/login/login-email/login-email';
import { CadastrarNovoUsuarioPage } from '../pages/login/cadastrar-novo-usuario/cadastrar-novo-usuario';

//telas selecionadas após logar
import { TelaPrincipalPage } from '../pages/tela-principal/tela-principal';
import { FeedPage } from '../pages/feed/feed';
import { CalendarioPage } from '../pages/calendario/calendario';
import { BuscaPage } from '../pages/busca/busca';

//telas do nav menu
import { PerfilPage } from '../pages/perfil/perfil';
import { ContatoPage } from '../pages/contato/contato';
import { EstruturaPage } from '../pages/estrutura/estrutura';
import { SobrePage } from '../pages/sobre/sobre';
import { GerenciarUsuariosPage } from '../pages/gerenciar-usuarios/gerenciar-usuarios'
import { BuscarUsuariosPage } from '../pages/buscar-usuarios/buscar-usuarios'


import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyBU9-E8RRGg2tUJ4iJGUSnX2ujxX6_4pCc",
    authDomain: "appigreja-388ee.firebaseapp.com",
    databaseURL: "https://appigreja-388ee.firebaseio.com",
    storageBucket: "appigreja-388ee.appspot.com",
    messagingSenderId: "621540314068"
  };


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
    CadastrarNovoUsuarioPage,
    ContatoPage,
    EstruturaPage,
    SobrePage,
    GerenciarUsuariosPage,
    BuscarUsuariosPage
  ],
  imports: [
    NgCalendarModule,
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
    CadastrarNovoUsuarioPage,
    ContatoPage,
    EstruturaPage,
    SobrePage,
    GerenciarUsuariosPage,
    BuscarUsuariosPage
  ],
  providers: [Facebook, UserService, { provide: ErrorHandler, useClass: IonicErrorHandler }],
})
export class AppModule { 
  constructor(){
    firebase.initializeApp(firebaseConfig);
  }
}
