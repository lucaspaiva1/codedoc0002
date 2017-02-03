import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Publicacao } from '../../model/publicacao';
import { PublicacaoService } from '../../providers/publicacao-service';
//import { NavController } from 'ionic-angular';
import { ImagePicker } from 'ionic-native';
//import { Camera } from 'ionic-native';
//import { Transfer } from 'ionic-native';
import { Camera, File, Transfer, FilePath } from 'ionic-native';

declare var cordova: any;

@Component({
  selector: 'page-editar-post',
  templateUrl: 'editar-post.html'
})
export class EditarPostPage {

  private publicacao: Publicacao = new Publicacao();
  private novaImagem: string = null;
  private urlImage: string = null;
  private loading: Loading;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public navParams: NavParams, public postService: PublicacaoService) {
    let id = navParams.get('id');
    this.postService.getPublicacao(id).then(res => {
      if (res.type == true) {
        this.publicacao = res.data;
        this.urlImage = this.publicacao.LinkImagem;
      } else {
        alert(res.message);
        this.navCtrl.pop();
      }
    });
  }


  salvar() {
    let equals: boolean;
    if(this.urlImage == this.publicacao.LinkImagem){
      this.publicacao.linkAntigo = '';
      equals = true;
    }else{
      //link antigo usado para apagar a foto de perfil nao-utilizada
      this.publicacao.linkAntigo = this.publicacao.LinkImagem;
      this.publicacao.LinkImagem = 'http://www.dsoutlet.com.br/igrejaApi/uploads/' + this.novaImagem;
      equals = false;
    }
    this.postService.editPublicacao(this.publicacao).then(res => {
      if (res.type == true) {
        if(equals == false){
          alert("fez upload");
          this.uploadImage();
        }else{
          alert("fez edicao normal");
          this.navCtrl.pop();
        }
      } else {
        console.log(res.message);
      }
    });
  }


  private importarFoto() {
    this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
  }

  private tirarFoto() {
    this.takePicture(Camera.PictureSourceType.CAMERA);
  }

  private takePicture(sourceType) {
    // Create options for the Camera Dialog
    let options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    Camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
        FilePath.resolveNativePath(imagePath)
          .then(filePath => {
            let currentName = filePath.substr(imagePath.lastIndexOf('/') + 1);
            let correctPath = filePath.substr(0, imagePath.lastIndexOf('/') + 1);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            this.urlImage = filePath;
          });
      } else {
        let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        this.urlImage = imagePath;
      }
    }, (err) => {
      this.presentToast('Erro ao selecionar imagem.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    let time = new Date();
    return (time.getTime() + ".jpg");
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.novaImagem = newFileName;
    }, error => {
      this.presentToast('Erro ao arquivar imagem.');
    });
  }

  //exibe toast
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3500,
      position: 'top'
    });
    toast.present();
  }

  //responsável por upload da imagem
  private uploadImage() {
    // Destination URL
    let url = "http://www.dsoutlet.com.br/igrejaApi/upload.php";

    // File for Upload
    //let targetPath = this.pathForImage(this.novaImagem);

    // File name only
    let filename = this.novaImagem;

    let options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename }
    };

    const fileTransfer = new Transfer();

    this.loading = this.loadingCtrl.create({
      content: 'Carregando...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(this.urlImage, url, options).then(data => {
      this.loading.dismissAll();
      this.presentToast('Postagem Criada com Sucesso!');
      this.navCtrl.pop();
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Erro no envio da imagem.');
    });
  }

}
