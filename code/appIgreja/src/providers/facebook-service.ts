import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Facebook } from 'ionic-native';
import { User } from '../model/User';

/*
  Generated class for the FacebookService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FacebookService {

  private linkLogin: string = "http://dsoutlet.com.br/igrejaApi/loginFace.php";
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
    //id do aplicativo: 1817976801823786
    Facebook.browserInit(1817976801823786, "v2.8");
  }

  logar(): Promise<User> {
    return Facebook.login(["public_profile"]).then(response => 
      this.api(response)).catch(this.erro);
  }

  erro(){
    alert("erro ao tentar se conectar com o servidor");
  }

  api(response): Promise<User> {
    let userID = response.authResponse.userID;
    return Facebook.api('/' + response.authResponse.userID + '?fields=id,name,gender,birthday,email,picture', []).then(result =>
        this.http.post(this.linkLogin, JSON.stringify({userID,result}), { headers: this.headers })
          .toPromise()
          .then(res => res.json()
          )
    );
  }

  status(): Promise<any>{
    return Facebook.getLoginStatus().then(response=>response.status);
  }

  logout(): Promise<any>{
    return Facebook.logout().then(response=>alert("deslogado com Sucesso"));
  }

}
