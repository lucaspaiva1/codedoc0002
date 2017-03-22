import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Administrador } from '../../model/administradores';
import { EstruturaService } from '../../providers/estrutura-service';

@Component({
  selector: 'page-estrutura',
  templateUrl: 'estrutura.html'
})
export class EstruturaPage {

  private administradores: Administrador[] = [];

  constructor(public alertCtrl: AlertController, private estrutraService: EstruturaService) {
    this.carregarUsuarios();
  }

  private carregarUsuarios() {
    this.estrutraService.administradoresAll().then(res => {
      this.administradores = res;
    }).catch(() => this.showConfirm);
  }

  private showConfirm(type: number) {
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
            this.carregarUsuarios();
          }
        }
      ]
    });
    confirm.present();
  }

}
