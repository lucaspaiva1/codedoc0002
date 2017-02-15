import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Publicacao } from '../../model/publicacao';
import { PublicacaoService } from '../../providers/publicacao-service';
import { ImagePicker } from 'ionic-native';
import { Camera, File, Transfer, FilePath } from 'ionic-native';

declare var cordova: any;

@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html'
})
export class AddPostPage {

  private publicacao: Publicacao = new Publicacao();
  private loading: Loading;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public postService: PublicacaoService) {

  }

  private adicionar() {
    //obrigatorio preencher data limite da publicacao
    if (this.publicacao.TempoPermanencia == null) {
      this.presentToast('Preencha a data limite!');
    } else {
      this.postService.novaPublicacao(this.publicacao).then(res => {
        if (res.type == true) {
          this.presentToast(res.message);
          this.navCtrl.pop();
        } else {
          this.presentToast(res.message);
        }
      });
    }
  }

  private importarFoto() {
    Camera.getPicture({
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      saveToPhotoAlbum: false
    }).then(imageData => {
      this.publicacao.LinkImagem = "data:image/jpeg;base64," + imageData;
    }, error => {
      alert("ERROR -> " + JSON.stringify(error));
    });
  }

  private tirarFoto() {
    Camera.getPicture({
      quality: 50, //Picture quality in range 0-100. Default is 50
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.publicacao.LinkImagem = "data:image/jpeg;base64," + imageData;
    }, error => {
      alert("ERROR -> " + JSON.stringify(error));
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
