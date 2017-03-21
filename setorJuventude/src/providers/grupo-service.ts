import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Grupo } from '../model/grupo';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class GrupoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {

  }

  deleteGrupo(id: number): Promise<any> {
    return this.http
      .post('http://www.dsoutlet.com.br/igrejaApi/deleteGrupo.php', JSON.stringify({ id: id }), { headers: this.headers })
      .toPromise()
      .then(res => this.extractDelData(res))
      .catch(this.handleErrorMessage);
  }

  editGrupo(grupo: Grupo): Promise<any> {
    return this.http
      .post('http://www.dsoutlet.com.br/igrejaApi/editGrupo.php', JSON.stringify(grupo), { headers: this.headers })
      .toPromise()
      .then(res => this.extractEditGrupo(res))
      .catch(this.handleErrorMessage);
  }

  private extractEditGrupo(res: Response) {
    let retorno = { type: false, message: '' };
    let data = res.json();
    if (data == true) {
      retorno.type = true;
      retorno.message = 'Edição concluída';
    } else {
      retorno.message = 'Não foi possível editar';
    }
    return retorno;
  }

  getGrupo(id: number): Promise<any> {
    return this.http.get('http://www.dsoutlet.com.br/igrejaApi/listaGrupo.php?id=' + id)
      .toPromise()
      .then(response => this.extractGetGrupo(response))
      .catch(this.handleErrorMessage);
  }

  private extractGetGrupo(res: Response) {
    let retorno = { type: false, data: {}, message: '' };
    let data = res.json();
    if (data == null) {
      retorno.data = {};
      retorno.message = 'Grupo não existente';
    } else {
      retorno.type = true;
      retorno.data = data;
    }
    return retorno;
  }

  getGrupos(): Promise<any> {
    return this.http.get('http://www.dsoutlet.com.br/igrejaApi/listaGrupo.php?id')
      .toPromise()
      .then(response => this.extractGetGrupos(response))
      .catch(this.handleErrorMessage);
  }

  private extractGetGrupos(res: Response) {
    let retorno = { error: false, type: false, data: [] };
    let data = res.json();
    if (data == null) {
      retorno.data = [];
    } else {
      retorno.type = true;
      retorno.data = data;
    }
    return retorno;
  }

  novoGrupo(grupo: Grupo): Promise<any> {
    return this.http
      .post('http://www.dsoutlet.com.br/igrejaApi/addGrupo.php', JSON.stringify(grupo), { headers: this.headers })
      .toPromise()
      .then(res => this.extractNovoGrupo(res))
      .catch(this.handleErrorMessage);
  }

  private extractNovoGrupo(res: Response) {
    let retorno = { error: false, type: false, message: '' };
    let data = res.json();
    if (data === true) {
      retorno.type = true;
      retorno.message = 'Grupo Criado';
    } else {
      retorno.message = 'Operação cancelada';
    }
    return retorno;
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

  private handleErrorMessage(error: any) {
    let retorno = { error: true, type: false, message: 'Falha na conexão' };
    return retorno;
  }

}
