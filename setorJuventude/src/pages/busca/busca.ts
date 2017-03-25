import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController, ActionSheetController } from 'ionic-angular';
import { AddGrupoPage } from '../add-grupo/add-grupo';
import { EditarGrupoPage } from '../editar-grupo/editar-grupo';
import { GrupoService } from '../../providers/grupo-service';
import { Grupo } from '../../model/grupo';
import { MapaPage } from '../mapa/mapa';
import { UserService } from '../../providers/user-service';
import { DeletarGrupoService } from '../../providers/deletar-grupo-service';


@Component({
  selector: 'page-busca',
  templateUrl: 'busca.html'
})
export class BuscaPage {

  private grupos: Grupo[] = [];
  private gruposaux: Grupo[] = [];
  private permissao = "c";
  private loader: any = this.loadingController.create({
    content: "Carregando Grupos"
  });

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public grupoService: GrupoService,
    public loadingController: LoadingController,
    public userService: UserService,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private deleteGrupo: DeletarGrupoService
  ) {

    this.loader.present();

    this.userService.get().then(res => {
      this.permissao = res.Tipo;
    });
  }

  ionViewWillEnter() {
    this.carregarGrupos();
  }

  private carregarGrupos() {
    this.grupoService.getGrupos().then(res => {
      this.loader.dismiss();
      if (res.error) {
        this.showConfirm(1, res.message);
      } else {
        this.grupos = res.data;
        this.gruposaux = this.grupos;
      }
    });
  }

  private inicializar(){
    this.grupos = this.gruposaux;
  }

  adicionarGupo() {
    this.navCtrl.push(AddGrupoPage);
  }

  abrirGrupo(grupo: Grupo) {
    this.navCtrl.push(EditarGrupoPage, { grupo: grupo });
  }

  option(grupo: Grupo) {
    if (this.permissao == "a") {
      let actionSheet = this.actionSheetCtrl.create({
        title: grupo.nome,
        buttons: [
          {
            text: 'Deletar',
            role: 'destructive',
            icon: 'trash',
            handler: () => {
              this.deletar(grupo);
            }
          }, {
            text: 'Cancel',
            role: 'cancel',
            icon: 'close',
            handler: () => {
            }
          }
        ]
      });
      actionSheet.present();
    }
  }

  deletar(grupo: Grupo) {

    this.deleteGrupo.deletar(grupo.ID).then(res => {
      if (res == true) {
        this.grupos.splice(this.grupos.indexOf(grupo), 1);
        let toast = this.toastCtrl.create({
          message: 'Deletado com sucesso',
          duration: 2000,
          position: 'top'
        });
        toast.present();
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

  mapa() {
    this.navCtrl.setRoot(MapaPage);
  }

  private showConfirm(type: number, message: string) {
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
            if (type === 1) {
              this.carregarGrupos();
            } else if (type === 2) {

            }
          }
        }
      ]
    });
    confirm.present();
  }

  getItems(ev: any) {
    //reinicializar itens
    this.inicializar();

    // recuperar a entrada na barra de busca
    let val = ev.target.value;

    // Filtrar valores
    if (val && val.trim() != '') {
      this.grupos = this.grupos.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

  }
}
