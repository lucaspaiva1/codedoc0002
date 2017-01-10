import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Publicacao } from '../../model/publicacao';

/*
  Generated class for the Comentarios page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-comentarios',
  templateUrl: 'comentarios.html'
})
export class ComentariosPage {

  private publicacao: Publicacao = new Publicacao();
  comentarios = [];
  novoComentario: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let id = navParams.get('id');
    this.comentarios.push({
      texto: 'Cometario de teste'
    });
    this.comentarios.push({
      texto: 'Cometario exemplo'
    });
    this.comentarios.push({
      texto: 'Cometario longo para texte, este comentário possui mais de uma linha e é utilizado para exemplificar como é a exibição de comentários longos'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComentariosPage');
  }

  comentar(){
    
  }
}
