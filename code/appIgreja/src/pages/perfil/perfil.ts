import { Component } from '@angular/core';
import { NavController, ActionSheetController, NavParams, AlertController, Platform, ToastController, LoadingController, Loading } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ImagePicker, Camera, File, Transfer, FilePath } from 'ionic-native';
import { User } from '../../model/User';
import { FacebookService } from '../../providers/facebook-service';
import { UserService } from '../../providers/user-service';
import { ContaService } from '../../providers/conta-service';

declare var cordova: any;


@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  private editar: boolean = false;
  private user: User = new User();
  private novaImagem: string = null;
  private urlImage: string = null;
  private loading: Loading;
  private loaded: boolean = false;
  private senhaAtual: string = '';
  private confSenha1: string = '';
  private confSenha2: string = '';


  constructor(
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public userService: UserService,
    public facebookService: FacebookService,
    public contaService: ContaService,
    public actionSheetCtrl: ActionSheetController,
    public events: Events
  ) {

    this.userService.get().then(response => {
      this.user = response;
      this.urlImage = this.user.URLFoto;
      this.loaded = true;
    });
  }

  private conectarFace() {
    this.facebookService.vincular(this.user.IDUsuario).then(response => {
      if (response.connected) {
        this.userService.set(response);
        alert("Conta do Facebook vinculada com Sucesso")
      } else {
        alert("erro");
      }
    });
  }

  private validate(): boolean {
    if (this.user.Nome.trim() == '') {
      this.presentToast('Nome incorreto');
      return false;
    } if (this.user.Email.trim() == '' || !this.user.Email.includes('@')) {
      this.presentToast('Email incorreto');
      return false;
    } else {
      return true;
    }
  }

  private alterarSenha(): boolean {
    if(this.senhaAtual !== ''){
      if (this.user.Senha.trim() !== this.senhaAtual) {
        this.presentToast('Senha Atual Inválida');
        return false;

      } else if (this.confSenha1 !== this.confSenha2) {
        this.presentToast('Senhas não Correspondem');
        return false;

      } else {
        this.user.Senha = this.confSenha1;
        return true;
      }
    }else{
      return true;
    }
  }

  private salvar() {
    if (this.validate() && this.alterarSenha()) {
      let equals: boolean;
      if (this.urlImage == this.user.URLFoto) {
        this.user.linkAntigo = '';
        equals = true;
      } else {
        //link antigo usado para apagar a foto de perfil nao-utilizada
        this.user.linkAntigo = this.user.URLFoto;
        this.user.URLFoto = 'http://www.dsoutlet.com.br/igrejaApi/perfil/' + this.novaImagem;
        equals = false;
      }
      this.contaService.editar(this.user).then(response => {
        if (response) {
          if (equals == false) {
            this.uploadImage();
          }
          this.userService.set(this.user);
          this.presentToast('Modificações Salvas');
          this.editar = false;
        } else {
          this.descartar();
          this.presentToast('Alterações não foram salvas');
        }
      });
    }
  }

  private descartar() {
    this.userService.get().then(res => {
      this.user = res;
      this.senhaAtual = '';
      this.confSenha1 = '';
      this.confSenha2 = '';
    });

    this.presentToast('Modificações descartadas');

  }

  private editarAction() {
    if (this.editar == false) {
      this.editar = true;
    } else if (this.editar == true) {

      //verificação se dejesa cancelar ou salvar
      let confirm = this.alertCtrl.create({
        title: 'Salvar',
        message: 'Deseja salvar as modificações feitas?',
        buttons: [
          {
            text: 'Descartar',
            handler: () => {
              this.descartar();
            }
          },
          {
            text: 'Salvar',
            handler: () => {
              this.salvar();
            }
          }]
      });
      confirm.present();

    }
  }

  private alterarFoto() {
    if (this.editar) {
      let confirm = this.alertCtrl.create({
        subTitle: 'Importar imagem da:',
        buttons: [
          {
            text: 'Galeria',
            handler: () => {
              this.importarFoto();
            }
          },
          {
            text: 'Câmera',
            handler: () => {
              this.tirarFoto();
            }
          }
        ]
      });
      confirm.present();
    }
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
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  //responsável por upload da imagem
  private uploadImage() {
    // Destination URL
    let url = "http://www.dsoutlet.com.br/igrejaApi/uploadPerfil.php";

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
      this.presentToast('Edição Concluida!');
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Erro no envio da imagem.');
    });
  }

}
