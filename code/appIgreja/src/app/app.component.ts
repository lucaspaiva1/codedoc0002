import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { ContatoPage } from '../pages/contato/contato';
import { EstruturaPage } from '../pages/estrutura/estrutura';
import { SobrePage } from '../pages/sobre/sobre';

import { FacebookService } from '../providers/facebook-service';
import { UserService } from '../providers/user-service';


import { BuscarUsuariosPage } from '../pages/buscar-usuarios/buscar-usuarios';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  private contato = ContatoPage;
  private estrutura = EstruturaPage;
  private sobre = SobrePage;
  private login = LoginPage;
  private perfil = PerfilPage;
  private buscar = BuscarUsuariosPage;

  rootPage = LoginPage;

  nome: string = 'Nome do Usuários';

  constructor(
    platform: Platform,
    public menu: MenuController,
    public facebookService: FacebookService,
    public userService: UserService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  ionViewWillEnter(){
    alert("funciona");
  }

  openPage(page) {
    if (page == 'sair') {
      this.facebookService.logout();
      this.userService.deslogar();
    }

    this.menu.close();
    if (page == 'perfil') {
      this.nav.push(this.perfil);
    } else if (page == 'contato') {
      this.nav.push(this.contato);
    } else if (page == 'estrutura') {
      this.nav.push(this.estrutura);
    } else if (page == 'sobre') {
      this.nav.push(this.sobre);
    } else if (page == 'sair') {
      this.nav.setRoot(this.login);
    } else if (page == 'buscar') {
      this.nav.push(this.buscar);
    }
  }
}
