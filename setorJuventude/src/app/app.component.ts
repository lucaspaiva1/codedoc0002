import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
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

  rootPage = LoginPage;

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
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      var notificationOpenedCallback = function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window["plugins"].OneSignal
        .startInit("ed50823a-df07-46a0-95c9-534351e78b0f")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();

      StatusBar.styleDefault();
      Splashscreen.hide();
      events.subscribe('user:changed', user => {
        if (user !== undefined && user !== null) {
          this.nome = user.Nome;
          this.foto = user.URLFoto;
          this.permissao = user.Tipo;
        }
      });
    });
  }
  private hideSplashScreen() {
    if (Splashscreen) {
      setTimeout(() => {
        Splashscreen.hide();
      }, 100);
    }
  }

  openPage(page) {
    this.nav.push(page);
    this.menu.close();
  }

  sair() {
    this.menu.close();
    this.facebookService.logout();
    this.userService.deslogar();
    this.nav.setRoot(LoginPage);

  }

}
