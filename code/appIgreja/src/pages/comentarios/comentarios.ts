import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { ComentarioService } from '../../providers/comentario-service';
import { Comentario } from '../../model/comentario';
import { UserService } from '../../providers/user-service';

@Component({
  selector: 'page-comentarios',
  templateUrl: 'comentarios.html'
})
export class ComentariosPage {

  private postID: number;
  private comentarios: Comentario[] = [];
  private novoComentario: Comentario = new Comentario();
  private userID: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public comentService: ComentarioService, public loadingController: LoadingController, public userService: UserService) {
    let loader = this.loadingController.create({
      content: "your message"
    });
    loader.present();
    this.postID = navParams.get('id');
    this.carregarComentarios();
    loader.dismiss();
    userService.get().then(res=>{
      this.userID = res.id;
    });


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
    this.novoComentario.Usuario_IDUsuario = this.userID;
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

  private editar(id: number){}

  private deletar(id: number){}
}
