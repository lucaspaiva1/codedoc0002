import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the NotificacaoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NotificacaoService {

  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Basic Y2RkNmU0ZDAtYmFiOC00NzRkLWE1NmUtNTZkNTFkMGJjZTg0' });

  constructor(public http: Http) {
    console.log('Hello NotificacaoService Provider');
  }

  push(mensagem) {
    this.http.post('https://onesignal.com/api/v1/notifications', JSON.stringify({
      "app_id": "ed50823a-df07-46a0-95c9-534351e78b0f",
      "included_segments": ["All"],
      "headings":{ "en": "Setor Juventude" },
      "data": { "foo": "bar" },
      "contents": { "en": mensagem },
      "large_icon":"http://www.dsoutlet.com.br/igrejaApi/imagens/logo.jpeg"
    }), { headers: this.headers }).toPromise().then(res=>alert(res)).catch(error=>alert("erro ao enviar notificações"));
  }

}
