import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { TelaPrincipalPage } from '../../tela-principal/tela-principal';
import { LoginEmailPage } from '../login-email/login-email';
import { CadastrarNovoUsuarioPage } from '../cadastrar-novo-usuario/cadastrar-novo-usuario';


//providers
import { UserService } from '../../../providers/user-service';

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
    public userService: UserService,
  ) {
    menu.enable(false);
  }

  ionViewDidLoad() {
    this.userService.loginSucessoEventEmitter.subscribe(
      user=>console.log(user),
    );
    this.userService.loginFalhaEventEmitter.subscribe(
      error=>console.log(error)
    );

  }

  logar(tipo) { //verifica a modalidade de login escolhida
    if (tipo == "facebook") {// login com facebook
      this.userService.loginComFacebook();

    } else if (tipo == "google") {// login com google
      this.userService.loginComGoogle();
    }
  }


}
