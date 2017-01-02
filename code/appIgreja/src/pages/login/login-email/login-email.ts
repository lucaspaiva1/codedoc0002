import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { EsqueciSenhaPage } from '../esqueci-senha/esqueci-senha'
import { TelaPrincipalPage } from '../../tela-principal/tela-principal';
import { UserService } from '../../../providers/user-service';

@Component({
  selector: 'page-login-email',
  templateUrl: 'login-email.html'
})
export class LoginEmailPage {

  email: string;
  senha: string;
  user;
  esqueciSenha = EsqueciSenhaPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public userService: UserService,

  ) {
    //Configurando objeto user com campos para validação
    this.user = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginEmailPage');
  }

  validate(): boolean {
    if (this.user.valid) {
      return true;
    }

    // figure out the error message
    let errorMsg = '';

    // validate each field
    let control = this.user.controls['senha'];
    if (!control.valid) {
      if (control.errors['required']) {
        errorMsg = 'Informe a senha';
      } else if (control.errors['minlength']) {
        errorMsg = 'Infome uma senha válida';
      }
    }
    control = this.user.controls['email'];
    if (!control.valid) {
      if (control.errors['required']) {
        errorMsg = 'Informe um email';
      } else if (control.errors['minlength']) {
        errorMsg = 'Informe um email válido';
      }
    }

    let alert = this.alertCtrl.create({
      title: 'Erro!',
      subTitle: errorMsg || 'Empty error message!',
      buttons: ['OK']
    });
    alert.present();

    return false;
  }

  login() {
    //if (this.validate()) {
    // process the data
    //this.userService.loginComConta();
    this.navCtrl.setRoot(TelaPrincipalPage);
    //}
  }

}
