import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { FacebookService } from '../../providers/facebook-service';
import { UserService } from '../../providers/user-service';
import { CalendarioPage } from '../calendario/calendario';
import { LoginPage } from '../login/login/login';
import { BuscaPage } from '../busca/busca';
import { FeedPage } from '../feed/feed';
import { MapaPage } from '../mapa/mapa';
import { StatusBar } from 'ionic-native';

@Component({
  selector: 'page-tela-principal',
  templateUrl: 'tela-principal.html'
})
export class TelaPrincipalPage {


  feed = FeedPage;
  calendario = CalendarioPage;
  buscar = BuscaPage;
  mapa = MapaPage;

  constructor(public navCtrl: NavController, public facebookService: FacebookService, public userService: UserService) {

  }
  
  ionViewDidEnter(){
    StatusBar.overlaysWebView(true);
    StatusBar.show();
  }
  
}
