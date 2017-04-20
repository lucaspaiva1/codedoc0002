import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from '../pages/login/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { FeedPage } from '../pages/feed/feed';
import { ContatoPage } from '../pages/contato/contato';
import { EstruturaPage } from '../pages/estrutura/estrutura';
import { SobrePage } from '../pages/sobre/sobre';
import { FacebookService } from '../providers/facebook-service';
import { UserService } from '../providers/user-service';
import { BuscarUsuariosPage } from '../pages/buscar-usuarios/buscar-usuarios';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { MonthViewComponent } from 'ionic2-calendar/monthview';
import { WeekViewComponent } from 'ionic2-calendar/weekview';
import { DayViewComponent } from 'ionic2-calendar/dayview';
import { LiturgiaPage } from '../pages/liturgia/liturgia';
import { TelaPrincipalPage } from '../pages/tela-principal/tela-principal';
import { EditarForaniaPage } from '../pages/editar-forania/editar-forania';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  private contato = ContatoPage;
  private estrutura = EstruturaPage;
  private sobre = SobrePage;
  private perfil = PerfilPage;
  private buscar = BuscarUsuariosPage;
  private liturgia = LiturgiaPage;
  private telaPrincipal = TelaPrincipalPage;

  private rootPage;

  private nome: string = 'Nome do Usuários';
  private foto: string = '';
  private permissao: string = "c";


  constructor(
    platform: Platform,
    public menu: MenuController,
    public facebookService: FacebookService,
    public userService: UserService,

    public events: Events
  ) {

    //verifica ser a pessoa esta conectada
    this.userService.get().then(response => {
      if (response) {
        this.userService.atualizarUsuario(response.IDUsuario).then(res => {
          if (!res.error && res.user !== null) {
            if (res.user.Banida == 0) {
              StatusBar.show();
              res.user.connected = true;
              this.events.publish('user:changed', res.user.Tipo);
              this.userService.set(res.user).then(() => this.nav.setRoot(TelaPrincipalPage));
            } else {
              this.nav.setRoot(LoginPage);
              alert("Sua conta está bloqueada ou banida");
              this.userService.deslogar();
              this.facebookService.logout();
            }
          }
        });
      } else {
        this.nav.setRoot(LoginPage);
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      setTimeout(() => {
        Splashscreen.hide();
      }, 100);

      var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window["plugins"].OneSignal
        .startInit("ed50823a-df07-46a0-95c9-534351e78b0f")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();

      StatusBar.styleDefault();

      events.subscribe('user:changed', user => {
        if (user !== undefined && user !== null) {
          this.nome = user.Nome;
          this.foto = user.URLFoto;
          this.permissao = user.Tipo;
        }
      });
    });
  }

  private openPage(page) {
    this.nav.setRoot(page);
    this.menu.close();
  }

  private sair() {
    this.menu.close();
    this.facebookService.logout();
    this.userService.deslogar();
    this.nav.setRoot(LoginPage);
  }

}
