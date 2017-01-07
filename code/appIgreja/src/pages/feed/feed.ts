import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddPostPage } from '../add-post/add-post';
import { EditarPostPage } from '../editar-post/editar-post';

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
  editarPost = EditarPostPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //apenas para teste
    /*Modelo
      1-titulo, texto, imagem
      2-titulo, texto
      3-titulo, imagem
    */
    this.publicacoes.push({
      titulo: 'Modelo 1',
      texto: 'Publicação com texto e imagem, para teste',
      imagem: '../imagens/card-teste.jpg',
      comentario: true
    });
    this.publicacoes.push({
      titulo: 'Modelo 2',
      texto: 'Publicação com texto longo para teste, verificar como é o Look and Feel de uma publicação com texto: A nível organizacional, a expansão dos mercados mundiais apresenta tendências no sentido de aprovar a manutenção dos conhecimentos estratégicos para atingir a excelência.',
      imagem: null,
      comentario: false
    });
    this.publicacoes.push({
      titulo: 'Modelo 3',
      texto: null,
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

  editar(){
    this.navCtrl.push(this.editarPost);
  }

}
