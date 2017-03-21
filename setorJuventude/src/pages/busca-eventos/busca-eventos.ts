import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams, AlertController } from 'ionic-angular';
import { EventoService } from '../../providers/evento-service';
import { Evento } from '../../model/evento';
import { EditarEventoPage } from '../editar-evento/editar-evento';

@Component({
  selector: 'page-busca-eventos',
  templateUrl: 'busca-eventos.html'
})
export class BuscaEventosPage {

  private listaEventos: Evento[] = [];
  private eventos;
  constructor(public loadingController: LoadingController,
    public alertCtrl: AlertController,
    public eventoService: EventoService,
    public navCtrl: NavController,
    public navParams: NavParams) {

  }

  ionViewWillEnter() {
    this.getEventos();
  }

  private getEventos() {
    this.eventoService.getEventos().then(res => {
      if (res.type == true) {
        this.listaEventos = res.data;
        this.eventos = this.listaEventos;
      }
      else {
        this.showConfirm();
      }
    });
  }

  private getItems(ev: any) {
    // Reset items back to all of the items
    this.eventos = this.listaEventos;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.eventos = this.eventos.filter((item) => {
        return (item.Titulo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  private abrirEvento(evento: Evento) {
    //direcionar para o face
    this.navCtrl.push(EditarEventoPage, { id: evento.IDEvento });

  }

  private showConfirm() {
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
            this.getEventos();
          }
        }
      ]
    });
    confirm.present();
  }

}
