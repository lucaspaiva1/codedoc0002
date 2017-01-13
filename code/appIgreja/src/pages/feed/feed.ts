import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AddPostPage } from '../add-post/add-post';
import { EditarPostPage } from '../editar-post/editar-post';
import { ComentariosPage } from '../comentarios/comentarios';
import { PublicacaoService } from '../../providers/publicacao-service';
import { Publicacao } from '../../model/publicacao';


@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage {

  private publicacoes: Publicacao[] = [];
  addPost = AddPostPage;
  editarPost = EditarPostPage;
  comentarios = ComentariosPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public postService: PublicacaoService, public loadingController: LoadingController) {

  }

  ionViewWillEnter(){
    let loader = this.loadingController.create({
      content: "Carregando Publicações"
    });
    loader.present();
    this.carregarFeed();
    loader.dismiss();
  }

  private carregarFeed(){
    this.postService.getPublicacoes().then(res=>{
      if(res.type == true){
        this.publicacoes = res.data;
      }else{
        console.log("error");
      }
    });
  }

  private adicionarPost(){
    this.navCtrl.push(this.addPost);
  }

  private deletar(id: number){
    this.postService.deletePublicacao(id).then(res=>{
      if(res.type == true){
        console.log(res.message);
        this.carregarFeed();
      }else{
        console.log(res.message);
      }
    });
  }

  private editar(id: number){
    this.navCtrl.push(this.editarPost, {
      id: id
    });
  }

  private abrirComentarios(id: number){
    this.navCtrl.push(this.comentarios, {
      id: id
    })
  }
}
