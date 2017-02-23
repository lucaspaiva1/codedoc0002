import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { NotificacaoService } from '../../providers/notificacao-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private notificacaoService: NotificacaoService) {
    
  }
  clicou(){
    this.notificacaoService.push("teste");
  }

}
