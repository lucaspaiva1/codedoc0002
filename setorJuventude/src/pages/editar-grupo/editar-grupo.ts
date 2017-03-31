import { Grupo } from './../../model/grupo';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { BuscaService } from '../../providers/busca-service';
import { GrupoService } from '../../providers/grupo-service';
import { User } from '../../model/User';
import { UserService } from '../../providers/user-service';
import { DeletarGrupoService } from '../../providers/deletar-grupo-service';
import { MembroService } from '../../providers/membro-service';



@Component({
  selector: 'page-editar-grupo',
  templateUrl: 'editar-grupo.html'
})
export class EditarGrupoPage {
  private grupo: Grupo = new Grupo();

  private editar = false;
  private users: any[] = [];
  private auxUsers: User[] = [];
  private selecionados: number[] = []; //ids dos usuarios selecionados no momentoz
  private permissao = "c";
  private selecionadosAux: number[] = []; //ids de usuarios selecionados na hora do GET
  private meuUser: User;
  private members: User[] = [];
  private participa: boolean = false;
  private userID: number;
  private loader;
  private bloqueiaTroca: boolean = false;

  constructor(
    public navCtrl: NavController,
    public membroService: MembroService,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public buscaService: BuscaService,
    public grupoService: GrupoService,
    public userService: UserService,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private deleteService: DeletarGrupoService
  ) {

    this.loader = this.loadingController.create({
      content: "Carregando Publicações"
    });

    this.loader.present();

    this.grupo = navParams.get('grupo');
    this.carregarUsuarios();
    this.userService.get().then(res => {
      this.meuUser = res;
      this.permissao = res.Tipo;
      this.userID = res.IDUsuario;
    });
  }

  private carregarSelecionados() {
    this.grupoService.getGrupo(this.grupo.ID, this.userID).then(res => {
      if (res.type == true) {
        this.selecionados = res.data[0]; //lista de representantes selecionados
        let membros = res.data[1]; // lista de membros do Grupo
        this.participa = res.data[2]; // booleano indicando se o usuario faz parte ou não do grupo
        for (let idAtual of membros) {
          for (let userAtual of this.auxUsers) {
            if (userAtual.IDUsuario == idAtual) {
              this.members.push(userAtual);
            }
          }
        }

      }
      this.loader.dismiss();
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
      this.carregarSelecionados();
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
    this.deleteService.deletar(this.grupo.ID).then(res => {
      if (res == true) {
        let toast = this.toastCtrl.create({
          message: 'Deletado com sucesso',
          duration: 2000,
          position: 'top'
        });

        toast.present();
        this.navCtrl.popToRoot();
      } else {
        let toast = this.toastCtrl.create({
          message: 'Não foi possível remover',
          duration: 2000,
          position: 'top'
        });
        toast.present();
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

  participar() {
    this.bloqueiaTroca = true;
    if (this.participa) {
      this.membroService.sairGrupo(this.userID, this.grupo.ID).then(troca => {
        if (troca) {
          this.participa = false;
          let index = this.members.indexOf(this.meuUser);
          this.members.splice(index, 1); //retira do selecionadosAux
        }
        this.bloqueiaTroca = false;
      }).catch(() => this.bloqueiaTroca = false);
    } else {
      this.membroService.entrarGrupo(this.userID, this.grupo.ID).then(troca => {
        if (troca) {
          this.participa = true;
          this.members.push(this.meuUser);
        }
        this.bloqueiaTroca = false;
      }).catch(() => this.bloqueiaTroca = false);
    }
  }
}
