import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the AddEvento page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-evento',
  templateUrl: 'add-evento.html'
})
export class AddEventoPage {

  Titulo: string ='';
  Descricao: string = '';
  DataInicio = null;
  DataFim = null;
  Allday: boolean = false;
  HoraInicio = null;
  HoraFim = null;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventoPage');
  }

}
