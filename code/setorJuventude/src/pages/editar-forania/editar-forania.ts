import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the EditarForania page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-editar-forania',
  templateUrl: 'editar-forania.html'
})
export class EditarForaniaPage {
  private editar = false;
  private users: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarForaniaPage');
  }

  cancelar() {
    this.navCtrl.popToRoot();
  }

  private toggleEditar() {
    this.editar = !this.editar;
  }

}
