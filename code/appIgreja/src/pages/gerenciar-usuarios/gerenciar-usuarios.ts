import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { UsuariosService } from '../../providers/usuarios-service';
import { User } from '../../model/User';
/*
  Generated class for the GerenciarUsuarios page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-gerenciar-usuarios',
  templateUrl: 'gerenciar-usuarios.html'
})
export class GerenciarUsuariosPage {

  private userSelecionado: any = new User();
  private mensage: string;
  private mensage2: string;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private usuariosService: UsuariosService,
    public toastCtrl: ToastController,
  ) {
    this.userSelecionado = navParams.get('usuarioSelecionado');
    console.log(this.userSelecionado);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GerenciarUsuariosPage');
  }

  escolherOpcoes() {
    if (this.userSelecionado.Tipo == 'a') {
      this.mensage = "Retirar status Administrador";
    } else {
      this.mensage = "Tornar Administrador";
    }

    if (this.userSelecionado.Banida == '0') {
      this.mensage2 = "Banir conta";
    } else {
      this.mensage2 = "Ativar conta";
    }
    this.opcoes();
  }

  opcoes() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: this.mensage2,
          role: 'destructive',
          handler: () => {
            this.usuariosService.operacao(this.userSelecionado.IDUsuario, "banir").then(res => {
              if (res[1]) {
                this.userSelecionado.Banida = res[0];
                this.presentToast("Operação realizada com sucesso");
            
              }
            });
          }
        },
        {
          text: this.mensage,
          handler: () => {
            this.usuariosService.operacao(this.userSelecionado.IDUsuario, "alterar").then(res => {
              if (res) {
                this.userSelecionado.Tipo = res[0];
                this.presentToast("Operação realizada com sucesso");
              }
            });
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });

    actionSheet.present();
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 10000,
      position: 'top'
    });
    toast.present();
  }

  deletar() {

  }

  alterarStatus() {

  }
}
