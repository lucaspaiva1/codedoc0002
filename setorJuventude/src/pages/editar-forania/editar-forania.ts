import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { RegiaoService } from '../../providers/regiao-service';
import { User } from '../../model/User';
import { Regioes } from '../../model/regioes';
import { BuscaService } from '../../providers/busca-service';


@Component({
  selector: 'page-editar-forania',
  templateUrl: 'editar-forania.html'
})
export class EditarForaniaPage {
  private editar = false;
  private nomeCidade: string = "";
  private users: any[] = [];
  private auxUsers: User[] = [];
  private selecionados: number[] = []; //ids dos usuarios selecionados no momento
  private permissao = "c";
  private selecionadosAux: number[] = []; //ids de usuarios selecionados na hora do GET


  constructor(
    public navCtrl: NavController,
    public buscaService: BuscaService,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public regicaoService: RegiaoService) {
    this.nomeCidade = this.navParams.get('nomeCidade');
    this.carregarUsuarios();
    this.carregarSelecionados();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarForaniaPage');
  }

  private carregarSelecionados() {
    this.regicaoService.getRegiao(this.nomeCidade).then(res => {
      this.selecionados = res;
    }).catch(() => alert("Erro ao se comunicar com o servidor"));
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

    }).catch(() => alert("Erro ao se comunicar com o servidor"));
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
    let regiao = new Regioes();
    regiao.nome = this.nomeCidade
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

  cancelar() {
    this.navCtrl.popToRoot();
  }

}
