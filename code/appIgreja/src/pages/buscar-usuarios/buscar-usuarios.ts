import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GerenciarUsuariosPage } from '../gerenciar-usuarios/gerenciar-usuarios';

/*
  Generated class for the BuscarUsuarios page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-buscar-usuarios',
  templateUrl: 'buscar-usuarios.html'
})
export class BuscarUsuariosPage {
  private users = [];
  private gerenciarUser = GerenciarUsuariosPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeUsers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarUsuariosPage');
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
  abrirUsuario(nome: String){
    this.navCtrl.push(this.gerenciarUser);
  }
}
