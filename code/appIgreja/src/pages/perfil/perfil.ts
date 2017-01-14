import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { User } from '../../model/User';
import { UserService } from '../../providers/user-service';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {
  private user;
  private editar: boolean = false;
  private userAtual:User= new User();
  private loading:boolean = false;

  constructor(
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public userService: UserService
  ) {

   this.userService.get().then(response=>{
     this.userAtual = response;
      //Configurando objeto user com campos para validação
      this.user = this.formBuilder.group({
        nome: [this.userAtual.nome, Validators.compose([Validators.required])],
        nascimento: [this.userAtual.nascimento, Validators.compose([Validators.required])],
        genero: [this.userAtual.genero, Validators.compose([Validators.required])],
        email: [this.userAtual.email, Validators.compose([Validators.required, Validators.minLength(5)])],
        senhaatual: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        senha: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        repSenha: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
      });
      this.loading=true;
   });
  


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
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

  salvar() {
    if (this.validate()) {
      //Logica
      alert(this.user.nome);
    }
  }

  editarAction() {
    if (this.editar == false) {
      this.editar = true;
    } else if (this.editar == true) {
      this.editar = false;
      //verificação se dejesa cancelar ou salvar
      let confirm = this.alertCtrl.create({
        title: 'Salvar',
        message: 'Deseja salvar as modificações feitas?',
        buttons: [
          {
            text: 'Descartar',
            handler: () => {
              // LOGICA PARA CANCELAR
              let toast = this.toastCtrl.create({
                message: 'Modificações descartadas',
                duration: 3000
              });
              toast.present();
            }
          },
          {
            text: 'Salvar',
            handler: () => {
              //LOGICA PARA SALVAR ALTERAÇÕES
              let toast = this.toastCtrl.create({
                message: 'Modificações salvas',
                duration: 3000
              });
              toast.present();
            }
          }]
      });
      confirm.present();
    }
  }


}
