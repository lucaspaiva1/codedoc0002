import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { EventoService } from '../../providers/evento-service';
import { Evento } from '../../model/evento';

/*
  Generated class for the BuscaEventos page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-busca-eventos',
  templateUrl: 'busca-eventos.html'
})
export class BuscaEventosPage {

  private listaEventos: Evento[] = [];
  private eventos;
  constructor(public loadingController: LoadingController, public eventoService: EventoService, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscaEventosPage');
  }

  ionViewWillEnter() {
    this.getEventos();
  }

  private getEventos(){
    this.eventoService.getEventos().then(res => {
      if (res.type == true) {
        this.listaEventos = res.data;
        this.eventos = this.listaEventos;
      }
      else {
        console.log("error");
      }
    });
  }

  getItems(ev: any) {
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

  abrirEvento(evento){
    //direcionar para o face
    
  }

}
