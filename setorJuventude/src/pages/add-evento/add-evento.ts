import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventoService } from '../../providers/evento-service';
import { Evento } from '../../model/evento';


@Component({
  selector: 'page-add-evento',
  templateUrl: 'add-evento.html'
})
export class AddEventoPage {

  private evento: Evento = new Evento();

  private Titulo: string ='';
  private Descricao: string = '';
  private DataInicio = null;
  private DataFim = null;
  private Allday: boolean = false;
  private HoraInicio = null;
  private HoraFim = null;

  constructor(public navCtrl: NavController, public eventoService: EventoService) {

  }

  adicionar(){
    this.eventoService.addEvento(this.evento).then(res=>{
      if(res.type == true){
        this.navCtrl.pop();
      }
    });
  }

}
