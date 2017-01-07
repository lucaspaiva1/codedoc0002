import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddPostPage } from '../add-post/add-post';
import { EditarPostPage } from '../editar-post/editar-post';
import { PublicacaoService } from '../../providers/publicacao-service';
import { Publicacao } from '../../model/publicacao';


@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage {

  private posts: Publicacao[] = [];

  publicacoes = [];
  addPost = AddPostPage;
  editarPost = EditarPostPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public postService: PublicacaoService) {
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
    this.postService.getPublicacoes().then(res=>{
      if(res.type == true){
        console.log(res.data);
        this.posts = res.data;
      }else{
        console.log("error");
      }
    });
  }

  adicionarPost(){
    this.navCtrl.push(this.addPost);
  }

  editar(){
    this.navCtrl.push(this.editarPost);
  }

}
