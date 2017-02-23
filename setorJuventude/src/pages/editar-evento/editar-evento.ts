import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventoService } from '../../providers/evento-service';
import { Evento } from '../../model/evento';
/*
  Generated class for the EditarEvento page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-editar-evento',
  templateUrl: 'editar-evento.html'
})
export class EditarEventoPage {

  private evento: Evento = new Evento();
  teste: boolean = true;
  private editar: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventoService: EventoService) {

    let id = navParams.get('id');
    this.eventoService.getEvento(id).then(res=>{
      if(res.type == true){
        this.evento = res.data;
      }else{
        this.navCtrl.pop();
      }
    });

  }

  private habEditar(){
    this.editar = !(this.editar);
  }

  private salvar(){
    this.eventoService.editEvento(this.evento).then(res=>{
      if(res.type == true){
        console.log(res.message);
        this.navCtrl.pop();
      }else{
        console.log(res.message);
      }
    });
  }

  private cancelar(){
    this.navCtrl.pop();
  }

  private excluir(){
    this.eventoService.delEvento(this.evento.IDEvento).then(res=>{
      if(res.type == true){
        console.log(res.message);
        this.navCtrl.pop();
      }else{
        console.log(res.message);
      }
    });
  }
}
