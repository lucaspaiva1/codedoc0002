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

  private publicacoes: Publicacao[] = [];

  addPost = AddPostPage;
  editarPost = EditarPostPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public postService: PublicacaoService) {

  }

  ionViewWillEnter(){
    this.carregarFeed();
  }

  ionViewDidLoad() {
    this.carregarFeed();
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

  adicionarPost(){
    this.navCtrl.push(this.addPost);
  }

  editar(id: number){
    this.navCtrl.push(this.editarPost, {
      id: id
    });
  }

}
