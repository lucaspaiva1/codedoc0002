import { Component } from '@angular/core';
import { ContatoService } from '../../providers/contato-service';
import { Administrador } from '../../model/administradores';

@Component({
  selector: 'page-contato',
  templateUrl: 'contato.html'
})
export class ContatoPage {

  private gestao: Administrador[] = [];

  constructor(public contatoService: ContatoService) {
    this.contatoService.gestaoAll().then(res => {
      this.gestao = res;
    }).catch(() => this.error);
  }

  private error(){

  }

}
