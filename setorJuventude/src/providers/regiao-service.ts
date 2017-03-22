import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Regioes } from '../model/regioes';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegiaoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
  }

  getRegiao(nomeCidade: string): Promise<any> {
    return this.http.get('http://www.dsoutlet.com.br/igrejaApi/listaRegiao.php?nome=' + nomeCidade)
      .toPromise()
      .then(response => response.json())
      .catch(() => alert("Erro ao se conectar com o servidor"));
  }

  editGrupo(regiao: Regioes): Promise<any> {
    return this.http
      .post('http://www.dsoutlet.com.br/igrejaApi/editRegiao.php', JSON.stringify({regiao: regiao}), { headers: this.headers })
      .toPromise()
      .then(res => this.extractEditGrupo(res))
      .catch(this.handleErrorMessage);
  }

  private extractEditGrupo(res: Response) {
    let retorno = { error: false, message: '' };
    let data = res.json();
    if (data == true) {
      retorno.message = 'Edição concluída';
    } else {
      retorno.error = true;
      retorno.message = 'Não foi possível editar';
    }
    return retorno;
  }

  private handleErrorMessage(error: any) {
    let retorno = { error: true, message: 'Falha na conexão' };
    return retorno;
  }

}
