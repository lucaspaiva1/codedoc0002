import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Facebook } from 'ionic-native';


/*
  Generated class for the FacebookService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FacebookService {

  constructor(public http: Http) {
  }

   login():Boolean {
    Facebook.login(['email']).then(response => {
      alert("Logado com Sucesso");
      return true;
    }, (erro) => {
      alert(erro);
    });
    return false;
  }

  getdetails() {
    Facebook.getLoginStatus().then((response) => {
      if (response.status == "connected") {
        Facebook.api('/' + response.authResponse.userID + '?fields=id,name,gender,last_name,picture', []).then(response => {
          alert(JSON.stringify(response));

        }, (erro) => {
          alert(erro);
        });
      }
      else {
        alert("nao conectou");
      }
    })

  }

  logout() {
    Facebook.logout().then((response) => {
      alert(JSON.stringify(response))
    }, (erro) => {
      alert(erro);
    });
  }

}
