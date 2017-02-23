import { Component } from '@angular/core';
import { NavController, ActionSheetController, NavParams, AlertController, Platform, ToastController, LoadingController, Loading } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Camera } from 'ionic-native';
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
    if (this.senhaAtual !== '') {
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
    } else {
      return true;
    }
  }

  private salvar() {
    if (this.validate() && this.alterarSenha()) {
      this.contaService.editar(this.user).then(response => {
        if (response) {
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
    Camera.getPicture({
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      saveToPhotoAlbum: false
    }).then(imageData => {
      this.user.URLFoto = "data:image/jpeg;base64," + imageData;
    }, error => {
      alert("ERROR -> " + JSON.stringify(error));
    });
  }

  private tirarFoto() {
    Camera.getPicture({
      quality: 75, //Picture quality in range 0-100. Default is 50
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.user.URLFoto = "data:image/jpeg;base64," + imageData;
    }, error => {
      alert("ERROR -> " + JSON.stringify(error));
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

}
