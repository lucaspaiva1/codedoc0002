import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddPostPage } from '../add-post/add-post';

/*
  Generated class for the Feed page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage {
  publicacoes = [];
  addPost = AddPostPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //apenas para teste
    /*Modelo
      1-titulo, texto, imagem
      2-titulo, texto
      3-titulo, imagem
    */
    this.publicacoes.push({
      modelo: '1',
      titulo: 'Modelo 1',
      texto: 'Publicação com texto e imagem, para teste',
      imagem: '../imagens/card-teste.jpg',
      comentario: true
    });
    this.publicacoes.push({
      modelo: '2',
      titulo: 'Modelo 2',
      texto: 'Publicação com texto longo para teste, verificar como é o Look and Feel de uma publicação com texto: A nível organizacional, a expansão dos mercados mundiais apresenta tendências no sentido de aprovar a manutenção dos conhecimentos estratégicos para atingir a excelência.',
      comentario: false
    });
    this.publicacoes.push({
      modelo: '3',
      titulo: 'Modelo 3',
      imagem: '../imagens/card-teste.jpg',
      comentario: false
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
  }

  adicionarPost(){
    this.navCtrl.push(this.addPost);
  }

}
