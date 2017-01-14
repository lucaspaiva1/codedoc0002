import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { TelaPrincipalPage } from '../../tela-principal/tela-principal';
import { LoginEmailPage } from '../login-email/login-email';
import { CadastrarNovoUsuarioPage } from '../cadastrar-novo-usuario/cadastrar-novo-usuario';


//providers
import { FacebookService } from '../../../providers/facebook-service';
import { UserService } from '../../../providers/user-service';

import { User } from '../../../model/User';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginEmail = LoginEmailPage;
  cadastrarNovoUser = CadastrarNovoUsuarioPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    menu: MenuController,
    public facebookService: FacebookService,
    public userService: UserService
  ) {
    menu.enable(false);

    //verifica ser a pessoa esta conectada
    this.userService.get().then(response => {
      if (response.connected) {
        this.navCtrl.setRoot(TelaPrincipalPage);
      }
    }
    );
  }

  logar(tipo) { //verifica a modalidade de login escolhida
    if (tipo == "facebook") {// login com facebook
      this.facebookService.logar().then(response => {
        if (response.connected) {
          this.userService.set(response);          
          this.navCtrl.setRoot(TelaPrincipalPage);
        } else {
          alert("erro");
        }
      });
    } else if (tipo == "google") {// login com google
    }
  }


}
