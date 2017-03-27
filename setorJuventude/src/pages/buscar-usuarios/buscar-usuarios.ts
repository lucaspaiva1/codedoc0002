import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GerenciarUsuariosPage } from '../gerenciar-usuarios/gerenciar-usuarios';
import { BuscaService } from '../../providers/busca-service';
import { User } from '../../model/User';

@Component({
  selector: 'page-buscar-usuarios',
  templateUrl: 'buscar-usuarios.html'
})
export class BuscarUsuariosPage {

  private users: User[] = [];
  private auxUsers: User[] = [];
  private usuariosTotal: number = 0;

  constructor(
    public navCtrl: NavController,
    public buscaService: BuscaService
  ) {
    this.buscaService.usersAll().then(response => {
      this.users = response;
      this.auxUsers = response;
      this.usuariosTotal = response.length;
    });
  }

  private initializeUsers() {
    this.users = this.auxUsers;
  }

  private getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeUsers();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.users = this.users.filter((item) => {
        return (item.Nome.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.Email.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  private abrirUsuario(user: User) {
    this.navCtrl.push(GerenciarUsuariosPage, { usuarioSelecionado: user });
  }
}
