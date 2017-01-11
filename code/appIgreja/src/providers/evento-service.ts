import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Evento } from '../model/evento';
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {

  }

  addEvento(evento: Evento): Promise<any> {
    return this.http
      .post('http://dsoutlet.com.br/igrejaApi/addEvento.php', JSON.stringify(evento), { headers: this.headers })
      .toPromise()
      .then(res => this.extractAddData(res))
      .catch(this.handleErrorMessage);
  }

  getEvento(id: number): Promise<any>{
    return this.http.get('http://dsoutlet.com.br/igrejaApi/listaEvento.php?id='+id)
      .toPromise()
      .then(response => this.extractGetAData(response))
      .catch(this.handleErrorMessage);
  }

  getEventos(): Promise<any>{
    return this.http.get('http://dsoutlet.com.br/igrejaApi/listaEvento.php?id')
      .toPromise()
      .then(response => this.extractGetData(response))
      .catch(this.handleErrorMessage);
  }

  private extractAddData(res: Response) {
    let retorno = { type: false, message: '' };
    let data = res.json();
    if (data === true) {
      retorno.type = true;
      retorno.message = 'Evento Adicionado';
    } else {
      retorno.message = 'Ocorreu um erro!';
    }
    return retorno;
  }

  private extractGetAData(res: Response) {
    let retorno = { type: false, data: {} };
    let data = res.json();
    if (data == null) {
      retorno.data = {};
    } else {
      retorno.type = true;
      retorno.data = data;
    }
    return retorno;
  }

  private extractGetData(res: Response) {
    let retorno = { type: false, data: [] };
    let data = res.json();
    if (data == null) {
      retorno.data = [];
    } else {
      retorno.type = true;
      retorno.data = data;
    }
    return retorno;
  }

  private handleErrorMessage(error: any) {
    let retorno = { type: false, message: 'Ocorreu um erro!' };
    return retorno;
  }

}
