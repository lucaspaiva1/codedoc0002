import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Publicacao } from '../../model/publicacao';
import { PublicacaoService } from '../../providers/publicacao-service';


@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html'
})
export class AddPostPage {

  private publicacao: Publicacao = new Publicacao();

  constructor(public navCtrl: NavController, public navParams: NavParams, public postService: PublicacaoService) {

  }

  adicionar() {
    console.log(this.publicacao);
    this.postService.novaFicha(this.publicacao).then(res=>{
      if(res.type == true){
        console.log(res.message);
        this.navCtrl.pop();
      }else{
        console.log(res.message);
      }
    });
  }
}
