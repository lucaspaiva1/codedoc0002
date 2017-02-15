import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
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
  private mapsPage = MapaPage;
  private permissao = "c";
  loader: any = this.loadingController.create({
    content: "Carregando Publicações"
  });

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
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
      }
    });
  }

  adicionarGupo() {
    this.navCtrl.push(AddGrupoPage);
  }

  abrirGrupo(grupo: Grupo) {
    this.navCtrl.push(EditarGrupoPage, { grupo: grupo });
  }

  deletar(grupo: Grupo) {

    this.deleteGrupo.deletar(grupo.ID).then(res => {
      if (res == true) {
        this.grupos.splice(this.grupos.indexOf(grupo), 1);
      } else {
        alert("não foi possivel remover");
      }
    });
    //salvar no banco
  }

  mapa() {
    this.navCtrl.push(this.mapsPage);
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
}
