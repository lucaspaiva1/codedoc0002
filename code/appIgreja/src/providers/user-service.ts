import { Injectable, EventEmitter,NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../model/User';
import firebase from 'firebase';

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {

  currentUser:any;
  autenticado:boolean;
  loginSucessoEventEmitter:EventEmitter<any>;
  loginFalhaEventEmitter:EventEmitter<any>;
  logoutEventEmitter:EventEmitter<any>;  
  
  constructor(public ngZone: NgZone) {
    this.loginSucessoEventEmitter = new EventEmitter();
    this.loginFalhaEventEmitter = new EventEmitter();
    this.logoutEventEmitter = new EventEmitter();
    firebase.auth().onAuthStateChanged(usuario=>{
      this.callBackStateChange(usuario);
    })
  }

//verificar se usuario esta logado no celular
  private callBackStateChange(usuario){
    this.ngZone.run(()=>{
      if(usuario == null){
        this.currentUser = null;
        this.autenticado = false;
      }else{
        this.currentUser = usuario;
        this.autenticado = true;
      }
    });
  }

  registrar(user:User){
    console.log(user);
    firebase.auth().createUserWithEmailAndPassword(user.email, user.senha)
    .then(result => console.log(result))
    .catch(error => console.log(error));
    
  }

  loginComFacebook(){
    let provider = new firebase.auth.FacebookAuthProvider();

    return firebase.auth().signInWithPopup(provider)
    .then(result => this.callbackSucessoLogin(result))
    .catch(error => this.callbackFalhaLogin(error));
  }

  loginComConta(user:User){
    firebase.auth().signInWithEmailAndPassword(user.email, user.senha)
    .then(result => this.callbackSucessoLogin(result))
    .catch(error => this.callbackFalhaLogin(error));
  }

  loginComGoogle(){
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(result => this.callbackSucessoLogin(result))
    .catch(error => this.callbackFalhaLogin(error));

  }


  private callbackSucessoLogin(response){
    this.loginSucessoEventEmitter.emit(response.user);
  }

  private callbackFalhaLogin(error){
    this.loginSucessoEventEmitter.emit({code: error.code, message: error.menssage});
  }

  logout(){
    firebase.auth().signOut()
    .then(()=>this.logoutEventEmitter.emit(true))
    .catch(error => this.callbackFalhaLogin(error))
  }

}
