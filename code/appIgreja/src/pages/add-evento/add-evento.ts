import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventoService } from '../../providers/evento-service';
import { Evento } from '../../model/evento';

/*
  Generated class for the AddEvento page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-evento',
  templateUrl: 'add-evento.html'
})
export class AddEventoPage {

  private evento: Evento = new Evento();

  Titulo: string ='';
  Descricao: string = '';
  DataInicio = null;
  DataFim = null;
  Allday: boolean = false;
  HoraInicio = null;
  HoraFim = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventoService: EventoService) {

  }

  adicionar(){
    this.eventoService.addEvento(this.evento).then(res=>{
      if(res.type == true){
        this.navCtrl.pop();
      }else{
        console.log(res.message);
      }
    });
  }

}
