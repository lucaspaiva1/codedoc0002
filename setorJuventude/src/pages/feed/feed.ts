import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events, AlertController } from 'ionic-angular';
import { AddPostPage } from '../add-post/add-post';
import { EditarPostPage } from '../editar-post/editar-post';
import { ComentariosPage } from '../comentarios/comentarios';
import { PublicacaoService } from '../../providers/publicacao-service';
import { Publicacao } from '../../model/publicacao';
import { UserService } from '../../providers/user-service';
import { FacebookService } from '../../providers/facebook-service';


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
    public facebookService: FacebookService

  ) {
    this.evento();
    this.loader.present();

    this.userService.get().then(res => {
      this.permissao = res.Tipo;
    });
  }

  ionViewWillEnter() {
    this.carregarFeed();
    //this.facebookService.postOnPage(new Publicacao());//adicionado para teste
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

}
