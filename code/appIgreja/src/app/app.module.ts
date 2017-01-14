import { NgModule, ErrorHandler} from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NgCalendarModule  } from 'ionic2-calendar';
import { Elastic } from 'angular2-elastic';

//providers
import { Facebook } from 'ionic-native';
import { FacebookService } from '../providers/facebook-service';
import { PublicacaoService } from '../providers/publicacao-service';
import { ComentarioService } from '../providers/comentario-service';
import { EventoService } from '../providers/evento-service';
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
import { AddPostPage } from '../pages/add-post/add-post';
import { ComentariosPage } from '../pages/comentarios/comentarios';
import { EditarPostPage } from '../pages/editar-post/editar-post';
import { AddEventoPage } from '../pages/add-evento/add-evento';
import { AddGrupoPage } from '../pages/add-grupo/add-grupo';
import { EditarEventoPage } from '../pages/editar-evento/editar-evento';
import { EditarGrupoPage } from '../pages/editar-grupo/editar-grupo';
import { BuscaEventosPage } from '../pages/busca-eventos/busca-eventos';

//telas do nav menu
import { PerfilPage } from '../pages/perfil/perfil';
import { ContatoPage } from '../pages/contato/contato';
import { EstruturaPage } from '../pages/estrutura/estrutura';
import { SobrePage } from '../pages/sobre/sobre';
import { GerenciarUsuariosPage } from '../pages/gerenciar-usuarios/gerenciar-usuarios'
import { BuscarUsuariosPage } from '../pages/buscar-usuarios/buscar-usuarios'


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
    BuscarUsuariosPage,
    AddPostPage,
    EditarPostPage,
    ComentariosPage,
    AddEventoPage,
    AddGrupoPage,
    EditarEventoPage,
    EditarGrupoPage,
    BuscaEventosPage
  ],
  imports: [
    NgCalendarModule,
    Elastic,
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
    BuscarUsuariosPage,
    AddPostPage,
    EditarPostPage,
    ComentariosPage,
    AddEventoPage,
    AddGrupoPage,
    EditarEventoPage,
    EditarGrupoPage,
    BuscaEventosPage
  ],

  providers: [Facebook, FacebookService, UserService, PublicacaoService, ComentarioService, EventoService, { provide: ErrorHandler, useClass: IonicErrorHandler }],

})
export class AppModule {}
