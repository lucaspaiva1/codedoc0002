import { Component, ViewChild } from '@angular/core';
import { Content, NavParams, LoadingController, ActionSheetController, ToastController, AlertController, Platform } from 'ionic-angular';
import { ComentarioService } from '../../providers/comentario-service';
import { Comentario } from '../../model/comentario';
import { UserService } from '../../providers/user-service';

@Component({
  selector: 'page-comentarios',
  templateUrl: 'comentarios.html'
})
export class ComentariosPage {

  @ViewChild(Content) content: Content;
  private postID: number;
  private comentarios: Comentario[] = [];
  private novoComentario: Comentario = new Comentario();
  private userID: number;
  private userPerm: string;
  private delID: number;
  private editID: number;
  private loader = this.loadingController.create({
    content: "Carregando.."
  });

  constructor(public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public navParams: NavParams,
    public comentService: ComentarioService,
    public loadingController: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public userService: UserService) {

    this.loader.present();

    this.postID = navParams.get('id');
    this.carregarComentarios();
    userService.get().then(res => {
      this.userID = res.IDUsuario;
      this.userPerm = res.Tipo;
    });
  }
  private carregarComentarios() {
    this.comentService.getComentarios(this.postID).then(res => {
      if (res.type == true) {
        this.comentarios = res.data;
      } else {
        this.showConfirm(3, res.message);
      }
      this.loader.dismiss();
      this.scrollBottom();
    });
  }
  ionViewDidEnter() {
    this.content.resize();
    this.content.scrollToBottom();
  }

  private scrollBottom(){
    this.content.resize();
    this.content.scrollToBottom();
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
    this.scrollBottom();
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
    if (this.userID == comentario.Usuario_IDUsuario || this.userPerm == 'a') {
      let actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Excluir',
            role: 'destructive',
            icon: !this.platform.is('ios') ? 'trash' : null,
            handler: () => {
              this.deletar(comentario.IDComentario);
            }
          }, {
            text: 'Cancel',
            role: 'cancel',
            icon: !this.platform.is('ios') ? 'close' : null
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
            } else if (type === 2) {
              this.deletar(this.delID);
            } else {
              this.carregarComentarios();
            }
          }
        }
      ]
    });
    confirm.present();
  }

}
