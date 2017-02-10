import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';

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

  private userSelecionado: User = new User();
  private mensage:string;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.userSelecionado = navParams.get('usuarioSelecionado');
    console.log(this.userSelecionado);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GerenciarUsuariosPage');
  }

  escolherOpcoes(){
    if(this.userSelecionado.Tipo=='a'){
      this.mensage = "Retirar status Administrador";
    }else{
      this.mensage = "Tornar Administrador";
    }
    this.opcoes();
  }

  opcoes() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Deletar',
          role: 'destructive',
          handler: () => {

          }
        },
        {
          text: this.mensage,
          handler: () => {

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

  deletar(){
    
  }

  alterarStatus(){

  }
}
