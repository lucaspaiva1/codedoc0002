import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Publicacao } from '../model/publicacao';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PublicacaoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {

  }

  deletePublicacao(id: number): Promise<any>{
    return this.http
      .post('http://www.dsoutlet.com.br/igrejaApi/deletePublicacao.php', JSON.stringify({id: id}), { headers: this.headers })
      .toPromise()
      .then(res => this.extractDelData(res))
      .catch(this.handleErrorMessage);
  }

  editPublicacao(publicacao: Publicacao): Promise<any>{
    return this.http
      .post('http://www.dsoutlet.com.br/igrejaApi/editPublicacao.php', JSON.stringify(publicacao), { headers: this.headers })
      .toPromise()
      .then(res => this.extractEditData(res))
      .catch(this.handleErrorMessage);
  }

  getPublicacao(id: number): Promise<any>{
    return this.http.get('http://www.dsoutlet.com.br/igrejaApi/listaPublicacao.php?id='+id)
      .toPromise()
      .then(response => this.extractGetData2(response))
      .catch(this.handleErrorMessage);
  }

  getPublicacoes(): Promise<any>{
    return this.http.get('http://www.dsoutlet.com.br/igrejaApi/listaPublicacao.php?id')
      .toPromise()
      .then(response => this.extractGetData(response))
      .catch(this.handleErrorMessage);
  }

  novaPublicacao(publicacao: Publicacao): Promise<any> {
    return this.http
      .post('http://www.dsoutlet.com.br/igrejaApi/addPublicacao.php', JSON.stringify(publicacao), { headers: this.headers })
      .toPromise()
      .then(res => this.extractNewData(res))
      .catch(this.handleErrorMessage);
  }

  private extractDelData(res: Response) {
    let retorno = { type: false, message: '' };
    let data = res.json();
    if (data === true) {
      retorno.type = true;
      retorno.message = 'Publicação Apagada';
    } else {
      retorno.message = 'Ocorreu um erro!';
    }
    return retorno;
  }

  private extractGetData2(res: Response) {
    let retorno = { type: false, data: {}, message: '' };
    let data = res.json();
    if (data == null) {
      retorno.data = {};
      retorno.message = 'publicacao não existente';
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

  private extractEditData(res: Response) {
    let retorno = { type: false, message: '' };
    let data = res.json();
    if (data === true) {
      retorno.type = true;
      retorno.message = 'Publicação Editada';
    } else {
      retorno.message = 'Ocorreu um erro!';
    }
    return retorno;
  }

  private extractNewData(res: Response) {
    let retorno = { type: false, message: '' };
    let data = res.json();
    if (data === true) {
      retorno.type = true;
      retorno.message = 'Publicação Realizada';
    } else {
      retorno.message = 'Ocorreu um erro!';
    }
    return retorno;
  }

  private handleErrorMessage(error: any) {
    let retorno = { type: false, message: 'Ocorreu um erro!' };
    return retorno;
  }

}
