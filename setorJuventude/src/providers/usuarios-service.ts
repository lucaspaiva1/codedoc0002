import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { User } from '../model/User';

@Injectable()
export class UsuariosService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
  }

  operacao(id:number, type:string) :Promise<boolean>{
    return this.http.post("http://dsoutlet.com.br/igrejaApi/usuarios.php", JSON.stringify({id, type}), this.headers)
    .toPromise()
    .then(res=>res.json())
    .catch(this.handleErrorMessage);
  }

  private handleErrorMessage(error: any) {
  }

}
