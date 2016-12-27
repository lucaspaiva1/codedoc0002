import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { TelaPrincipalPage } from '../../tela-principal/tela-principal';
import { LoginEmailPage } from '../login-email/login-email';
import { CadastrarNovoUsuarioPage } from '../cadastrar-novo-usuario/cadastrar-novo-usuario';

//providers
import { FacebookService } from '../../../providers/facebook-service';

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

  loginEmail= LoginEmailPage;
  cadastrarNovoUser = CadastrarNovoUsuarioPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    menu: MenuController,
    public facebookservice: FacebookService
  ) {
    menu.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logar(tipo) { //verifica a modalidade de login escolhida
    if (tipo == "facebook") {// login com facebook
      if(this.facebookservice.login()){
        this.navCtrl.setRoot(TelaPrincipalPage);
      }
    } else if (tipo == "google") {// login com google
    }
  }


}
