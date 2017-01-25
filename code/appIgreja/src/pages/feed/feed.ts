import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { AddPostPage } from '../add-post/add-post';
import { EditarPostPage } from '../editar-post/editar-post';
import { ComentariosPage } from '../comentarios/comentarios';
import { PublicacaoService } from '../../providers/publicacao-service';
import { Publicacao } from '../../model/publicacao';
import { UserService } from '../../providers/user-service';


@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage {

  private publicacoes: Publicacao[] = [];
  addPost = AddPostPage;
  editarPost = EditarPostPage;
  comentarios = ComentariosPage;
  loader: any = this.loadingController.create({
    content: "Carregando Publicações"
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, public postService: PublicacaoService, public loadingController: LoadingController, public userService: UserService, public events: Events) {
    this.evento();
    this.loader.present();
  }

  ionViewWillEnter() {
    this.carregarFeed();
  }

  private carregarFeed() {
    this.postService.getPublicacoes().then(res => {
      if (res.type == true) {
        this.publicacoes = res.data;
      } else {
        console.log("error");
      }
      this.loader.dismiss();
    });
  }

  private adicionarPost() {
    this.navCtrl.push(this.addPost);
  }

  private deletar(id: number) {
    this.postService.deletePublicacao(id).then(res => {
      if (res.type == true) {
        console.log(res.message);
        this.carregarFeed();
      } else {
        console.log(res.message);
      }
    });
  }

  private editar(id: number) {
    this.navCtrl.push(this.editarPost, {
      id: id
    });
  }

  private abrirComentarios(id: number) {
    this.navCtrl.push(this.comentarios, {
      id: id
    })
  }

  private evento(){
    this.userService.get().then(res=>{
      this.events.publish('user:changed', res);
    });
  }
}
