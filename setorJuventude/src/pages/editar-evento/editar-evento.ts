import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { EventoService } from '../../providers/evento-service';
import { UserService } from '../../providers/user-service';
import { Evento } from '../../model/evento';

@Component({
  selector: 'page-editar-evento',
  templateUrl: 'editar-evento.html'
})
export class EditarEventoPage {

  private evento: Evento = new Evento();
  teste: boolean = true;
  private editar: boolean = false;
  private permissao = "c";

  constructor(public navCtrl: NavController,
    public userService: UserService,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public eventoService: EventoService) {

    let id = navParams.get('id');
    this.eventoService.getEvento(id).then(res => {
      if (res.type == true) {
        this.evento = res.data;
      } else {
        this.navCtrl.pop();
      }
    });

    this.userService.get().then(user=>{
        this.permissao = user.Tipo;
      });

  }

  private habEditar() {
    this.editar = !(this.editar);
  }

  private salvar() {
    this.eventoService.editEvento(this.evento).then(res => {
      if (res.type == true) {
        this.navCtrl.pop();
      }

      let toast = this.toastCtrl.create({
        message: res.message,
        duration: 2000,
        position: 'top'
      });

      toast.present();

    });
  }

  private cancelar() {
    this.navCtrl.pop();
  }

  private excluir() {
    this.eventoService.delEvento(this.evento.IDEvento).then(res => {
      if (res.type == true) {
        this.navCtrl.pop();
      }

      let toast = this.toastCtrl.create({
        message: res.message,
        duration: 2000,
        position: 'top'
      });

      toast.present();
    });
  }
}
