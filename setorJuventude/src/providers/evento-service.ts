import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Evento } from '../model/evento';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {

  }

  editEvento(evento: Evento): Promise<any> {
    return this.http
      .post('http://dsoutlet.com.br/igrejaApi/editEvento.php', JSON.stringify(evento), { headers: this.headers })
      .toPromise()
      .then(res => this.extractEditData(res))
      .catch(this.handleErrorMessage);
  }

  delEvento(id: number): Promise<any> {
    return this.http
      .post('http://dsoutlet.com.br/igrejaApi/deleteEvento.php', JSON.stringify({id: id}), { headers: this.headers })
      .toPromise()
      .then(res => this.extractDelData(res))
      .catch(this.handleErrorMessage);
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

  private extractEditData(res: Response) {
    let retorno = { type: false, message: '' };
    let data = res.json();
    if (data === true) {
      retorno.type = true;
      retorno.message = 'Evento Editado';
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

  private extractDelData(res: Response) {
    let retorno = { type: false, message: '' };
    let data = res.json();
    if (data == true) {
      retorno.type = true;
      retorno.message = "deletado com sucesso";
    } else {
      retorno.message = "nao foi possivel excluir";
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
