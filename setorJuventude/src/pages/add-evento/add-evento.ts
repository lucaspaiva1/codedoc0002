import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventoService } from '../../providers/evento-service';
import { UserService } from '../../providers/user-service';
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
  private myID;

  constructor(private navCtrl: NavController, private eventoService: EventoService, private userService: UserService) {
    this.userService.get().then(res=>{
      this.myID = res.IDUsuario;
    });
  }

  private adicionar(){
    this.evento.Usuario_IDUsuario = this.myID;
    this.eventoService.addEvento(this.evento).then(res=>{
      if(res.type == true){
        this.navCtrl.pop();
      }
    });
  }

}
