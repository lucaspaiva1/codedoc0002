import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { AddGrupoPage } from '../add-grupo/add-grupo';
import { EditarGrupoPage } from '../editar-grupo/editar-grupo';
import { GrupoService } from '../../providers/grupo-service';
import { Grupo } from '../../model/grupo';
import { MapaPage } from '../mapa/mapa';


@Component({
  selector: 'page-busca',
  templateUrl: 'busca.html'
})
export class BuscaPage {

  private grupos: Grupo[] = [];
  private mapsPage = MapaPage;
  loader: any = this.loadingController.create({
    content: "Carregando Publicações"
  });

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public grupoService: GrupoService,
    public loadingController: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
    this.loader.present();
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

  abrirGrupo() {
  }

  deletar() {

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
