import { Component } from '@angular/core';
import { NavController, Events, MenuController } from 'ionic-angular';
import { TelaPrincipalPage } from '../../tela-principal/tela-principal';
import { LoginEmailPage } from '../login-email/login-email';
import { CadastrarNovoUsuarioPage } from '../cadastrar-novo-usuario/cadastrar-novo-usuario';
import { FacebookService } from '../../../providers/facebook-service';
import { UserService } from '../../../providers/user-service';
import { StatusBar } from 'ionic-native';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginEmail = LoginEmailPage;
  cadastrarNovoUser = CadastrarNovoUsuarioPage;
  private logando: boolean = false;

  constructor(
    public navCtrl: NavController,
    public facebookService: FacebookService,
    public userService: UserService,
    public events: Events,
    private menu : MenuController
  ) {
    this.menu.enable(false);
    
  }

  ionViewWillEnter(){
    StatusBar.overlaysWebView(true);
    StatusBar.backgroundColorByHexString('#FF6600'); // mudando a cor da barra de ferramentas
    StatusBar.hide();
  }

  logar(tipo) { //verifica a modalidade de login escolhida
    if (tipo == "facebook") {// login com facebook
      this.logando = true;
      this.facebookService.logar().then(response => {
        if (response == "inativa") {
          alert("Sua conta está bloqueada ou banida");
          this.facebookService.logout();
        } else if (response.connected) {
          this.userService.set(response).then(res=>{
            this.navCtrl.setRoot(TelaPrincipalPage, { id: response.IDUsuario });
          });
        } else {
          this.logando = false;
        }
      }).catch(()=>this.logando = false);
    }
  }


}
