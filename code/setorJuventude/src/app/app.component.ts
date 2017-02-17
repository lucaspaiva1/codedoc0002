import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Push, PushToken } from '@ionic/cloud-angular';

import { LoginPage } from '../pages/login/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { ContatoPage } from '../pages/contato/contato';
import { EstruturaPage } from '../pages/estrutura/estrutura';
import { SobrePage } from '../pages/sobre/sobre';
import { FacebookService } from '../providers/facebook-service';
import { UserService } from '../providers/user-service';
import { BuscarUsuariosPage } from '../pages/buscar-usuarios/buscar-usuarios';
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
    public push: Push,
    public menu: MenuController,
    public facebookService: FacebookService,
    public userService: UserService,
    public events: Events
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.hideSplashScreen();

      events.subscribe('user:changed', user => {
        if (user !== undefined && user !== null) {
          this.nome = user.Nome;
          this.foto = user.URLFoto;
          this.permissao = user.Tipo;
        }
      });
    });

    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
    });

    this.push.rx.notification()
      .subscribe((msg) => {
        alert(msg.title + ': ' + msg.text);
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
