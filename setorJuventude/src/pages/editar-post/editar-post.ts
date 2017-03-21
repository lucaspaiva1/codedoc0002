import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Publicacao } from '../../model/publicacao';
import { PublicacaoService } from '../../providers/publicacao-service';
import { Camera } from 'ionic-native';

declare var cordova: any;

@Component({
  selector: 'page-editar-post',
  templateUrl: 'editar-post.html'
})
export class EditarPostPage {

  private publicacao: Publicacao = new Publicacao();
  private loading: Loading;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public navParams: NavParams, public postService: PublicacaoService) {
    let id = navParams.get('id');
    this.postService.getPublicacao(id).then(res => {
      if (res.type == true) {
        this.publicacao = res.data;
      } else {
        this.presentToast(res.message);
        this.navCtrl.pop();
      }
    });
  }

  private salvar() {
    this.postService.editPublicacao(this.publicacao).then(res => {
      if (res.type == true) {
        this.navCtrl.pop();
      } else {
        this.presentToast(res.message);
      }
    });
  }

  private importarFoto() {
    Camera.getPicture({
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
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
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.publicacao.LinkImagem = "data:image/jpeg;base64," + imageData;
    });
  }

  //exibe toast
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 4000,
      position: 'top'
    });
    toast.present();
  }


}
