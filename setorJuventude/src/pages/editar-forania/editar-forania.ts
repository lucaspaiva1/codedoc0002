import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { RegiaoService } from '../../providers/regiao-service';
import { UserService } from '../../providers/user-service';
import { User } from '../../model/User';
import { Regioes } from '../../model/regioes';
import { BuscaService } from '../../providers/busca-service';


@Component({
  selector: 'page-editar-forania',
  templateUrl: 'editar-forania.html'
})
export class EditarForaniaPage {
  private editar = false;
  private nomeCidades: string[];
  private nomeForania: string;
  private users: any[] = [];
  private auxUsers: User[] = [];
  private selecionados: number[] = []; //ids dos usuarios selecionados no momento
  private permissao = "c";
  private selecionadosAux: number[] = []; //ids de usuarios selecionados na hora do GET


  constructor(
    public navCtrl: NavController,
    public buscaService: BuscaService,
    public alertCtrl: AlertController,
    public userService: UserService,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public regicaoService: RegiaoService) {
      let dados = this.navParams.get('nomeForania').split(",");
      this.nomeForania = dados[0];
      dados.shift();
      this.nomeCidades = dados;

      this.userService.get().then(user=>{
        this.permissao = user.Tipo;
      });

      this.carregarUsuarios();
      this.carregarSelecionados();
  }

  private carregarSelecionados() {
    this.regicaoService.getRegiao(this.nomeForania).then(res => { // utilizar apenas o nome da forania adicionar e para buscar
      this.selecionados = res;
    }).catch(() => {
      this.showConfirm(1);
      this.carregarSelecionados();
    });
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

    }).catch(() => {
      this.showConfirm(2);
      this.carregarUsuarios();
    });
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

  private salvar() {
    let regiao = new Regioes();
    regiao.nome = this.nomeForania; // utilizar apenas o nome da forania para adicionar e para buscar
    regiao.ids = this.selecionados;
    this.regicaoService.editGrupo(regiao).then(res => {
      if (!res.error) {
        this.toggleEditar();
      }

      let toast = this.toastCtrl.create({
        message: res.message,
        duration: 2000,
        position: 'bottom'
      });

      toast.present();

    });

  }

  private cancelar() {
    this.navCtrl.popToRoot();
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
              this.carregarUsuarios();
            }
          }
        }
      ]
    });
    confirm.present();
  }

}
