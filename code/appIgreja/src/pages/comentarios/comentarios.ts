import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ActionSheetController, ToastController, AlertController } from 'ionic-angular';

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
  private userPerm: string;
  private delID: number;
  private editID: number;

  constructor(public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public comentService: ComentarioService,
    public loadingController: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public userService: UserService) {

    let loader = this.loadingController.create({
      content: "Carregando.."
    });
    loader.present();
    this.postID = navParams.get('id');
    this.carregarComentarios();
    loader.dismiss();
    userService.get().then(res => {
      this.userID = res.id;
      this.userPerm = res.permissao;
    });
  }

  private carregarComentarios() {
    this.comentService.getComentarios(this.postID).then(res => {
      if (res.type == true) {
        this.comentarios = res.data;
      } else {
        console.log("error");
      }
    });
  }

  private comentar() {
    if (this.novoComentario.Texto != '') {
      this.novoComentario.Publicacao_IDPublicacao = this.postID;
      this.novoComentario.Usuario_IDUsuario = this.userID;
      this.comentService.addComentario(this.novoComentario).then(res => {
        if (res.type == true) {
          this.novoComentario = new Comentario();
          this.carregarComentarios();
        } else {
          this.showConfirm(1, res.message);
        }
      });
    }
  }

  private deletar(id: number) {
    this.delID = id;
    this.comentService.deleteComentario(id).then(res => {
      if (!res.error) {
        this.presentToast(res.message);
        this.carregarComentarios();
      } else {
        this.showConfirm(2, res.message);
      }
    });
  }

  private doRefresh(refresher) {
    this.carregarComentarios();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  private presentActionSheet(comentario: Comentario) {
    if (this.userID == comentario.Usuario_IDUsuario || this.userPerm === 'Administrador') {
      let actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Excluir',
            role: 'destructive',
            handler: () => {
              this.deletar(comentario.IDComentario);
            }
          }, {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
    }
  }

  private presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  private showConfirm(type: number, message: string) {
    let confirm = this.alertCtrl.create({
      title: message,
      message: 'Tentar Novamente ?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Ok',
          handler: () => {
            if (type === 1) {
              this.comentar();
            } else {
              this.deletar(this.delID);
            }
          }
        }
      ]
    });
    confirm.present();
  }

}
