import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { EsqueciSenhaPage } from '../esqueci-senha/esqueci-senha';
import { TelaPrincipalPage } from '../../tela-principal/tela-principal';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,menu:MenuController) {
    menu.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  esqueciSenha(){
    this.navCtrl.push(EsqueciSenhaPage);
  }

  logar(tipo){
    if(tipo=="conta"){
      this.navCtrl.setRoot(TelaPrincipalPage);
    }
  }

}
