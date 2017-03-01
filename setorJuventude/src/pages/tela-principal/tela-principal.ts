import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { FacebookService } from '../../providers/facebook-service';
import { UserService } from '../../providers/user-service';
import { CalendarioPage } from '../calendario/calendario';
import { LoginPage } from '../login/login/login';
import { BuscaPage } from '../busca/busca';
import { FeedPage } from '../feed/feed';

@Component({
  selector: 'page-tela-principal',
  templateUrl: 'tela-principal.html'
})
export class TelaPrincipalPage {

  feed = FeedPage;
  calendario = CalendarioPage;
  buscar = BuscaPage;

  constructor(public navCtrl: NavController,
    public facebookService: FacebookService,
    public userService: UserService) {

  }
}
