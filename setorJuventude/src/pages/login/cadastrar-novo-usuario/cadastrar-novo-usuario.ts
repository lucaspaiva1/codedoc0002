import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../model/User';
import { ContaService } from '../../../providers/conta-service';
import { StatusBar } from 'ionic-native';

@Component({
  selector: 'page-cadastrar-novo-usuario',
  templateUrl: 'cadastrar-novo-usuario.html'
})
export class CadastrarNovoUsuarioPage {
  private user: FormGroup;
  private userNovo: User = new User();
  private bloquearBotao: boolean = false;

  constructor(
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private contaService: ContaService) {


    //Configurando objeto user com campos para validação
    this.user = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      repSenha: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  ionViewDidEnter() {
    StatusBar.overlaysWebView(true);
    StatusBar.show();
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

    let alert = this.alertCtrl.create({
      title: 'Erro!',
      subTitle: errorMsg || 'Empty error message!',
      buttons: ['OK']
    });
    alert.present();

    return false;
  }

  senhas(): boolean {
    if (this.user.get('senha').value == this.user.get('repSenha').value) {
      return true;
    } else {
      alert("Senhas estão diferentes");
      return false;
    }

  }

  cadastrar() {

    if (this.validate() && this.senhas()) {
      this.bloquearBotao = true;

        // process the data
        this.contaService.cadastrar("cadastro", this.user.get('nome').value, '2015-05-03', 'm', this.user.get('email').value, this.user.get('senha').value)
          .then(res => {
            if (res) {
              let toast = this.toastCtrl.create({
                message: 'Usuário cadastrado',
                duration: 3000
              });
              toast.present();
              this.navCtrl.pop();
            } else {
              this.bloquearBotao = false;
              let toast = this.toastCtrl.create({
                message: 'Cadastro não efetuado',
                duration: 3000
              });
              toast.present();
            }
          });

    }
  }



}
