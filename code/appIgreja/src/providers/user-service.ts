import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from '../model/User';

import { NativeStorage } from 'ionic-native';


/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {


  constructor(public http: Http) {
    console.log('Hello UserService Provider');
  }

  set(user: User) {
    NativeStorage.setItem('usuarioAtual', user)
      .then(
      () => console.log('Stored item!'),
      error => alert('Erro ao carregar dados')
      );
  }

  get(): Promise<User> {
    return NativeStorage.getItem('usuarioAtual')
      .then(
      data => data,
      error => {
        return new User()  
      }
      );
  }

  deslogar() {
   return NativeStorage.remove('usuarioAtual').then(response=>{
      console.log("deslogado");
    });
  }

}
