import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SenhaService } from '../../../providers/senha-service';

@Component({
  selector: 'page-esqueci-senha',
  templateUrl: 'esqueci-senha.html'
})
export class EsqueciSenhaPage {

  private email: FormGroup;

  constructor(
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private esqueciSenhaService: SenhaService
  ) {
    //Configurando objeto user com campos para validação
    this.email = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  validate(): boolean {
    if (this.email.valid) {
      return true;
    }

    // figure out the error message
    let errorMsg = '';

    // validate each field
    let control = this.email.controls['email'];
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

  enviar() {
    if (this.validate()) {
      // process the data
      this.esqueciSenhaService.esqueciSenha(this.email.get('email').value).then(res => {
        if (res == true) {
          let toast = this.toastCtrl.create({
            message: 'Email foi enviado',
            duration: 2000
          });
          toast.present();
          this.navCtrl.pop();
        } else {
          alert("Email não encontrado");
        }
      }
      )

    }
  }
}
