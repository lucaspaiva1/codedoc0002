import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { BuscaService } from '../../providers/busca-service';
import { GrupoService } from '../../providers/grupo-service';
import { Grupo } from '../../model/grupo';
import { User } from '../../model/User';
import { UserService } from '../../providers/user-service';
import { DeletarGrupoService } from '../../providers/deletar-grupo-service';


@Component({
  selector: 'page-editar-grupo',
  templateUrl: 'editar-grupo.html'
})
export class EditarGrupoPage {
  private grupo: Grupo = new Grupo();
  private editar = false;
  private users: any[] = [];
  private auxUsers: User[] = [];
  private selecionados: number[] = []; //ids dos usuarios selecionados no momento
  private permissao = "c";
  private selecionadosAux: number[] = []; //ids de usuarios selecionados na hora do GET

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public buscaService: BuscaService,
    public grupoService: GrupoService,
    public userService: UserService,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private deleteService: DeletarGrupoService
  ) {
    this.grupo = navParams.get('grupo');
    this.carregarSelecionados();

    this.userService.get().then(res => {
      this.permissao = res.Tipo;
    });
  }

  private carregarSelecionados() {
    this.grupoService.getGrupo(this.grupo.ID).then(res => {
      if (res.type == true) {
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
      for (let usuario of this.users) { //percorre a lista de usuarios
        for (let id of this.selecionados) {
          if (usuario.IDUsuario == id) {
            usuario.selecionado = true; //se o id do usuario for igual ao id selecionado, marca ele como true
            let index = this.selecionadosAux.indexOf(usuario.IDUsuario);
            this.selecionadosAux.splice(index, 1); //retira do selecionadosAux
          }
        }
      }
      console.log(this.users);

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
        return (item.Nome.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.Email.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.selecionado);
      })
    }
  }

  private toggleEditar() {
    this.editar = !this.editar;
  }

  salvar() {
    this.grupo.ids = this.selecionados;
    let ids = this.grupo.ids;
    alert(JSON.stringify(ids));
    this.grupoService.editGrupo(this.grupo).then(res => {
      if (res.type == true) {
        this.toggleEditar();
      }
      let toast = this.toastCtrl.create({
        message: res.message,
        duration: 2000,
        position: 'top'
      });

      toast.present();
    });

  }

  cancelar() {
    this.navCtrl.popToRoot();
  }

  excluir() {
    this.deleteService.deletar(this.grupo.ID).then(res=>{
       if (res == true) {

        let toast = this.toastCtrl.create({
          message: 'Deletado com sucesso',
          duration: 2000,
          position: 'top'
        });

        toast.present();
        this.navCtrl.popToRoot();
      } else {
        alert("não foi possivel remover");
      }
    });
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
