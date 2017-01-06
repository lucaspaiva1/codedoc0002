import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Busca page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-busca',
  templateUrl: 'busca.html'
})
export class BuscaPage {
  grupos = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.grupos.push({
      nome: 'Grupo Jovem'
    });
    this.grupos.push({
      nome: 'Renovação Carismática'
    });
    this.grupos.push({
      nome: 'Encontro de Casais'
    });
    this.grupos.push({
      nome: 'Crisma'
    });
    this.grupos.push({
      nome: 'Ministros da Eucaristia'
    });
  }

  itemSelected(){}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscaPage');
  }

}
