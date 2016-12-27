import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';

/*
  Generated class for the EsqueciSenha page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-esqueci-senha',
  templateUrl: 'esqueci-senha.html'
})
export class EsqueciSenhaPage {

  email;

  constructor(private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public alertCtrl: AlertController) {
    //Configurando objeto user com campos para validação
    this.email = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EsqueciSenhaPage');
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

  enviar(){
    if (this.validate()) {
      // process the data
      let toast = this.toastCtrl.create({
        message: 'Email foi enviado',
        duration: 2000
      });
      toast.present();
      this.navCtrl.pop();
    }
  }
}
