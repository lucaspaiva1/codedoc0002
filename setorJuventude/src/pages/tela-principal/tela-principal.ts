import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { FeedPage } from '../feed/feed';
import { CalendarioPage } from '../calendario/calendario';
import { BuscaPage } from '../busca/busca';

/*
  Generated class for the TelaPrincipal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tela-principal',
  templateUrl: 'tela-principal.html'
})
export class TelaPrincipalPage {

  feed = FeedPage;
  calendario = CalendarioPage;
  buscar = BuscaPage;

  constructor(public navCtrl: NavController, menu: MenuController) {
    menu.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TelaPrincipalPage');
  }

}
