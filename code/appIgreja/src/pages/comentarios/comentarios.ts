import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ComentarioService } from '../../providers/comentario-service';
import { Comentario } from '../../model/comentario';

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

  private postID: number;
  private comentarios: Comentario[] = [];
  private novoComentario: Comentario = new Comentario();

  constructor(public navCtrl: NavController, public navParams: NavParams, public comentService: ComentarioService) {
    this.postID = navParams.get('id');
    this.carregarComentarios();

  }

  private carregarComentarios(){
    this.comentService.getComentarios(this.postID).then(res=>{
      if(res.type == true){
        this.comentarios = res.data;
      }else{
        console.log("error");
      }
    });
  }


  private comentar(){
    this.novoComentario.Publicacao_IDPublicacao = this.postID;
    console.log(this.novoComentario);
    this.comentService.addComentario(this.novoComentario).then(res=>{
      if(res.type == true){
        console.log(res.message);
        this.novoComentario = new Comentario();
        this.carregarComentarios();
      }else{
        console.log(res.message);
      }
    });

  }
}
