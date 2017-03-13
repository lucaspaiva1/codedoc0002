import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
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
    public events: Events
  ) {
    //verifica ser a pessoa esta conectada
    this.userService.get().then(response => {
      if (response.connected) {
        this.userService.atualizarUsuario(response.IDUsuario).then(res => {
          if (!res.error && res.user !== null) {
            if (res.user.Banida == 0) {
              this.navCtrl.setRoot(TelaPrincipalPage);//entra direto sem perguntar nada
              res.user.connected = true;
              this.events.publish('tipo:changed', res.user.Tipo);
              this.userService.set(res.user);
            } else {
              this.navCtrl.setRoot(LoginPage);
              alert("Sua conta está bloqueada ou banida");
              this.userService.deslogar();
              this.facebookService.logout();
            }
          }
        });
      }
    });
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
          this.userService.set(response);
          this.navCtrl.setRoot(TelaPrincipalPage, { id: response.IDUsuario });
        } else {
          this.logando = false;
          alert("erro");
        }
      }).catch(()=>this.logando = false);
    }
  }


}
