import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, menu: MenuController) {
    menu.enable(true);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TelaPrincipalPage');
  }

}
