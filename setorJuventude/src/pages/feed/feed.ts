import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events, AlertController, ActionSheetController, ToastController, MenuController } from 'ionic-angular';
import { AddPostPage } from '../add-post/add-post';
import { EditarPostPage } from '../editar-post/editar-post';
import { ComentariosPage } from '../comentarios/comentarios';
import { PublicacaoService } from '../../providers/publicacao-service';
import { Publicacao } from '../../model/publicacao';
import { UserService } from '../../providers/user-service';
import { StatusBar } from 'ionic-native';
import { LoginPage } from '../login/login/login';

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage {

  private publicacoes: Publicacao[] = [];
  private addPost = AddPostPage;
  private editarPost = EditarPostPage;
  private comentarios = ComentariosPage;
  private permissao = "c";


  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public postService: PublicacaoService,
    public toastCtrl: ToastController,
    public loadingController: LoadingController,
    public userService: UserService,
    public events: Events,
    private menu: MenuController,
    public actionSheetCtrl: ActionSheetController

  ) {
    this.menu.enable(true);
    StatusBar.show();
    this.userService.get().then(res => {
      this.permissao = res.Tipo;
      if (res.IDUsuario == undefined || res.IDUsuario == null || res.IDUsuario == 0) {
        this.navCtrl.setRoot(LoginPage);
      }
    });

    this.evento();
  }

  ionViewWillEnter() {
    this.carregarFeed();
  }

  private carregarFeed() {

    let loader = this.loadingController.create({
      content: "Carregando Publicações",
      duration: 5000
    });

    loader.present();

    this.postService.getPublicacoes().then(res => {
      loader.dismiss();
      if (res.type == true) {
        this.publicacoes = res.data;
      } else {
        this.showConfirm();
      }
    });
  }

  private showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Falha na conexão',
      message: 'Tentar Novamente ?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Ok',
          handler: () => {
            this.carregarFeed();
          }
        }
      ]
    });
    confirm.present();
  }

  private adicionarPost() {
    this.navCtrl.push(this.addPost);
  }

  private doRefresh(refresher) {
    this.postService.getPublicacoes().then(res => {
      refresher.complete();
      if (res.type == true) {
        this.publicacoes = res.data;
      } else {
        this.showConfirm();
      }
    });
  }

  private deletar(id: number) {
    this.postService.deletePublicacao(id).then(res => {
      if (res.type == true) {
        this.carregarFeed();
      }

      let toast = this.toastCtrl.create({
        message: res.message,
        duration: 2000,
        position: 'top'
      });

      toast.present();

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

  private evento() {
    this.userService.get().then(res => {
      this.events.publish('user:changed', res);
    });
  }

  private acoes(publicacaoSelecionada: Publicacao) {
    if (this.permissao == 'a') {
      let actionSheet = this.actionSheetCtrl.create({
        title: publicacaoSelecionada.Titulo,
        buttons: [
          {
            text: 'Deletar',
            role: 'destructive',
            icon: 'md-trash',
            handler: () => {
              this.deletar(publicacaoSelecionada.IDPublicacao);
            }
          }, {
            text: 'Editar',
            icon: 'md-create',
            handler: () => {
              this.editar(publicacaoSelecionada.IDPublicacao);
            }
          }, {
            text: 'Cancelar',
            role: 'cancel',
            icon: 'md-close',
            handler: () => {
            }
          }
        ]
      });
      actionSheet.present();
    }
  }

}
