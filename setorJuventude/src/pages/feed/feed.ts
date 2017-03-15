import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events, AlertController, ActionSheetController } from 'ionic-angular';
import { AddPostPage } from '../add-post/add-post';
import { EditarPostPage } from '../editar-post/editar-post';
import { ComentariosPage } from '../comentarios/comentarios';
import { PublicacaoService } from '../../providers/publicacao-service';
import { Publicacao } from '../../model/publicacao';
import { UserService } from '../../providers/user-service';
import { StatusBar } from 'ionic-native';

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
  loader: any = this.loadingController.create({
    content: "Carregando Publicações"
  });

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public postService: PublicacaoService,
    public loadingController: LoadingController,
    public userService: UserService,
    public events: Events,
    public actionSheetCtrl: ActionSheetController

  ) {
    StatusBar.show();
    /*events.subscribe('tipo:changed', tipo => {
        this.permissao = tipo;
    });*/
    this.userService.get().then(res => {
      this.permissao = res.Tipo;
    });

    this.evento();
    this.loader.present();


    // this.userService.get().then(user=>{
    //   this.permissao = user.Tipo;
    // });
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
        this.showConfirm();
      }
      this.loader.dismiss();
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
    this.carregarFeed();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
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
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }
  }

}
