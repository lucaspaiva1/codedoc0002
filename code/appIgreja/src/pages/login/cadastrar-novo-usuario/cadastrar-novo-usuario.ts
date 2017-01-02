import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../../providers/user-service';

/*
  Generated class for the CadastarNovoUsuario page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cadastrar-novo-usuario',
  templateUrl: 'cadastrar-novo-usuario.html'
})
export class CadastrarNovoUsuarioPage {
  user;

  constructor(
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public UserService
  ) {
    //Configurando objeto user com campos para validação
    this.user = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required])],
      nascimento: ['', Validators.compose([Validators.required])],
      genero: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      repSenha: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastrarNovoUsuarioPage');
  }

  validate(): boolean {
    if (this.user.valid) {
      return true;
    }

    // figure out the error message
    let errorMsg = '';

    // validate each field
    let control = this.user.controls['repSenha'];
    if (!control.valid) {
      if (control.errors['required']) {
        errorMsg = 'Repita a senha';
      } else if (control.errors['minlength']) {
        errorMsg = 'Senhas não conferem';
      }
    }
    control = this.user.controls['senha'];
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
    control = this.user.controls['nome'];
    if (!control.valid) {
      if (control.errors['required']) {
        errorMsg = 'Informe seu nome';
      }
    }
    control = this.user.controls['nascimento'];
    if (!control.valid) {
      if (control.errors['required']) {
        errorMsg = 'Informe sua data de nascimento';
      }
    }
    control = this.user.controls['genero'];
    if (!control.valid) {
      if (control.errors['required']) {
        errorMsg = 'Informe seu gênero';
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

  cadastrar() {
    if (this.validate()) {
      // process the data
      let toast = this.toastCtrl.create({
        message: 'Usuário cadastrado',
        duration: 3000
      });
      toast.present();
      this.navCtrl.pop();
    }
  }



}
