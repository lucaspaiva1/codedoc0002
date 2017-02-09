import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { User } from '../model/User';


@Injectable()
export class BuscaService {

  private link:string="http://dsoutlet.com.br/igrejaApi/busca.php?usersAll";

  constructor(public http: Http) {
    console.log('Hello UserService Provider');
  }

  usersAll():Promise<User[]>{
    return this.http.get(this.link).toPromise().then(response=>response.json());
  }

}
