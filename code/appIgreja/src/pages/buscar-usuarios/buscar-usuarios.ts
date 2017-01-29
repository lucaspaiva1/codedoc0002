import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GerenciarUsuariosPage } from '../gerenciar-usuarios/gerenciar-usuarios';

import { BuscaService } from '../../providers/busca-service';
import { User } from '../../model/User';

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

  private users: User[] = [];
  private auxUsers:User[] = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public buscaService: BuscaService
  ) {
    this.buscaService.usersAll().then(response => {
      this.users = response;
      this.auxUsers = response;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarUsuariosPage');
  }

  initializeUsers() {
    this.users = this.auxUsers;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeUsers();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.users = this.users.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.email.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  abrirUsuario(user: User) {
    this.navCtrl.push(GerenciarUsuariosPage, { usuarioSelecionado: user });
  }
}
