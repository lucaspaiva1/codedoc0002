import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, LoadingController, Loading } from 'ionic-angular';
import { Publicacao } from '../../model/publicacao';
import { PublicacaoService } from '../../providers/publicacao-service';
import { Camera } from 'ionic-native';
import { NotificacaoService } from '../../providers/notificacao-service';
import { FacebookService } from '../../providers/facebook-service';
import { UserService } from '../../providers/user-service';

declare var cordova: any;

@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html'
})
export class AddPostPage {

  private publicacao: Publicacao = new Publicacao();
  private loading: Loading;
  private feed: boolean = false;
  private page: boolean = false;
  private botaoDesativado = false;
  private myID;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public storage: UserService,
    public postService: PublicacaoService,
    private notificacaoService: NotificacaoService,
    private facebookService: FacebookService
  ) {
    this.storage.get().then(res => {
      this.myID = res.IDUsuario;
    });
    let data = new Date();
    if (data.getMonth() + 1 < 10) {
      this.publicacao.TempoPermanencia = `${data.getFullYear()}-0${data.getMonth() + 1}-${data.getDate()}`
    } else {
      this.publicacao.TempoPermanencia = `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`;
    }
  }

  private publicar() {
    //obrigatorio preencher data limite da publicacao
    if (this.publicacao.TempoPermanencia == null) {
      this.presentToast('Preencha a data limite!');
    } else if (this.publicacao.Titulo == '') {
      this.presentToast('Preencha o Título!');
    } else {

      this.publicacao.Usuario_IDUsuario = this.myID;

      this.botaoDesativado = true;

      this.postService.novaPublicacao(this.publicacao).then(res => {
        this.botaoDesativado = false;

        if (res.type == true) {
          this.notificacaoService.push("Nova publicação");
          this.presentToast(res.message);
          this.publicacao.Texto = this.publicacao.Titulo + '\n' + this.publicacao.Texto; //vinculando o titulo com o texto

          /*publica no feed do usuario se a opcao for marcada*/
          if (this.feed) {
            if (this.publicacao.LinkImagem == '') {
              this.facebookService.postOnFeed(this.publicacao);
            } else {
              this.facebookService.photoOnFeed(this.publicacao);
            }
          }
          /*publica na pagina do setor como sendo o usuario se a opcao for marcada*/
          if (this.page) {
            if (this.publicacao.LinkImagem == '') {
              this.facebookService.postOnPage(this.publicacao);
            } else {
              this.facebookService.photoOnPage(this.publicacao);
            }
          }
          this.navCtrl.pop();
        } else {
          this.presentToast(res.message);
        }
      });
    }
  }

  private importarFoto() {
    Camera.getPicture({
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    }).then(imageData => {
      this.publicacao.LinkImagem = "data:image/jpeg;base64," + imageData;
    });
  }

  private tirarFoto() {
    Camera.getPicture({
      quality: 75, //Picture quality in range 0-100. Default is 50
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.publicacao.LinkImagem = "data:image/jpeg;base64," + imageData;
    });
  }

  //exibe toast
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 10000,
      position: 'top'
    });
    toast.present();
  }

}
