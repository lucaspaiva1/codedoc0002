import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Administrador } from '../model/administradores';

@Injectable()
export class EstruturaService {

  private link:string="http://dsoutlet.com.br/igrejaApi/estrutura.php?administradoresAll";

  constructor(public http: Http) {
  }

  administradoresAll():Promise<Administrador[]>{
    return this.http.get(this.link).toPromise().then(response=>response.json());
  }

}
