import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';

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

  constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GerenciarUsuariosPage');
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
         text: 'Tornar Administrador',
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
}
