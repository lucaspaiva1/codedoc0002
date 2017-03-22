import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Administrador } from '../model/administradores';

@Injectable()
export class ContatoService {

  private link:string="http://dsoutlet.com.br/igrejaApi/contato.php?gestaoAll";

  constructor(public http: Http) {
  }

  gestaoAll():Promise<Administrador[]>{
    return this.http.get(this.link).toPromise().then(response=>response.json());
  }

}
