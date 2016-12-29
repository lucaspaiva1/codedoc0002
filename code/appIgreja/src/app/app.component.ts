import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { ContatoPage } from '../pages/contato/contato';
import { EstruturaPage } from '../pages/estrutura/estrutura';
import { SobrePage } from '../pages/sobre/sobre';

import { FacebookService } from '../providers/facebook-service';


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

  rootPage = LoginPage;

  nome: string = 'Nome do Usuários';

  constructor(platform: Platform, public menu: MenuController, public facebook:FacebookService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    if(page == this.login){
      this.facebook.logout();
    }

    this.menu.close();
    if(page == 'perfil'){
      this.nav.push(this.perfil);
    }else if(page == 'contato'){
      this.nav.push(this.contato);
    }else if(page == 'estrutura'){
      this.nav.push(this.estrutura);
    }else if(page == 'sobre'){
      this.nav.push(this.sobre);
    }else if(page == 'sair'){
      this.nav.setRoot(this.login);
    }
  }
}
