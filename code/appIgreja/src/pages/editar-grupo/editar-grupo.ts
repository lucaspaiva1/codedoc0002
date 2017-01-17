import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the EditarGrupo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-editar-grupo',
  templateUrl: 'editar-grupo.html'
})
export class EditarGrupoPage {
  private users = [];
  private editar = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeUsers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarGrupoPage');
  }

  initializeUsers(){
    var aux = [];
    this.users = aux;
    this.users.push({
      nome: 'Fulano',
      email: 'fulano@gmail.com'
    });
    this.users.push({
      nome: 'Gabriel',
      email: 'gabriel@gmail.com'
    });
    this.users.push({
      nome: 'Ricardo',
      email: 'Ricardo@gmail.com'
    });
    this.users.push({
      nome: 'Lucas',
      email: 'lucas@gmail.com'
    });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeUsers();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.users = this.users.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  habEditar(){
    if(this.editar == false){
      this.editar = true;
    }
  }
}
