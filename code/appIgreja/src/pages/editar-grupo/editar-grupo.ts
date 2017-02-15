import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BuscaService } from '../../providers/busca-service';
import { GrupoService } from '../../providers/grupo-service';
import { Grupo } from '../../model/grupo';
import { User } from '../../model/User';
import { UserService } from '../../providers/user-service';


@Component({
  selector: 'page-editar-grupo',
  templateUrl: 'editar-grupo.html'
})
export class EditarGrupoPage {
  private grupo: Grupo = new Grupo();
  private editar = false;
  private users: any[] = [];
  private auxUsers: User[] = [];
  private selecionados: number[] = [];
  private permissao = "c";
  private selecionadosAux: number[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public buscaService: BuscaService,
    public grupoService: GrupoService,
    public userService: UserService,
    public alertCtrl: AlertController
    ) {
    this.grupo = navParams.get('grupo');
    this.carregarSelecionados();
    
    this.userService.get().then(res => {
      this.permissao = res.Tipo;
    });
  }

  private carregarSelecionados() {
    this.grupoService.getGrupo(this.grupo.ID).then(res => {
      if(res.type == true){
        this.selecionados = res.data;
        this.selecionadosAux.concat(res.data);
        this.carregarUsuarios();
      }

    }).catch(() => this.showConfirm(1));
  }

  private carregarUsuarios() {
    this.buscaService.usersAll().then(response => {
      this.users = response;
      this.auxUsers = response;
      for (let usuario of this.users) {
        for(let id of this.selecionados){
          if(usuario.id == id){
            usuario.selecionado = true;
            let index = this.selecionadosAux.indexOf(usuario.id);
            this.selecionadosAux.splice(index, 1);
          }
        }
      }
    }).catch(() => this.showConfirm(1));
  }

  private adicionarUser(usuario: User) {
    if (typeof usuario.selecionado == "undefined") {
      usuario.selecionado = true;
    } else {
      usuario.selecionado = !usuario.selecionado;
    }
    let index = this.selecionados.indexOf(usuario.IDUsuario);
    if (index >= 0) {
      this.selecionados.splice(index, 1);
    } else {
      this.selecionados.push(usuario.IDUsuario);
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
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.email.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.selecionado);
      })
    }
  }

  private toggleEditar() {
    this.editar = !this.editar;
  }

  salvar() {
    this.grupo.ids = this.selecionados;
    this.grupoService.editGrupo(this.grupo);
    this.toggleEditar();
  }

  cancelar() {
    this.toggleEditar();
  }

  excluir() {

  }

  private showConfirm(type: number) {
    let confirm = this.alertCtrl.create({
      title: 'Falha na conexão',
      message: 'Tentar Novamente ?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Ok',
          handler: () => {
            if (type == 1) {
              this.carregarSelecionados();
            } else if (type == 2) {
              this.salvar();
            }
          }
        }
      ]
    });
    confirm.present();
  }
}
