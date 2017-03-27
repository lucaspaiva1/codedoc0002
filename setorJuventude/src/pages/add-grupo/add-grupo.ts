import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BuscaService } from '../../providers/busca-service';
import { GrupoService } from '../../providers/grupo-service';
import { Grupo } from '../../model/grupo';
import { UserService } from '../../providers/user-service';
import { User } from '../../model/user';

@Component({
  selector: 'page-add-grupo',
  templateUrl: 'add-grupo.html'
})
export class AddGrupoPage {

  private users: User[] = [];
  private auxUsers: User[] = [];
  private selecionados: number[] = [];
  private grupo: Grupo = new Grupo();
  private permissao = "c";

  constructor(
    public navCtrl: NavController,
    public buscaService: BuscaService,
    public grupoService: GrupoService,
    public userService: UserService) {

    this.userService.get().then(res => {
      this.permissao = res.Tipo;
      if(this.permissao = 'a'){
        this.carregarUsuarios();
      }
    });
  }

  private carregarUsuarios() {
    this.buscaService.usersAll().then(response => {
      this.users = response;
      this.auxUsers = response;
    });
  }

  private adicionarUser(id: number) {
    let index = this.selecionados.indexOf(id);
    if(index >= 0){
      this.selecionados.splice(index, 1);
    }else{
      this.selecionados.push(id);
    }
  }

  salvar(){
    if(this.grupo.nome !== ''){
      this.grupo.ids = this.selecionados;
      this.grupoService.novoGrupo(this.grupo).then(res=>{
        this.navCtrl.pop();
      });
    }
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
}
