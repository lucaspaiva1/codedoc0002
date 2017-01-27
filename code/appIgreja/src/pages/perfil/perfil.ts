import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../model/User';
import { FacebookService } from '../../providers/facebook-service';
import { UserService } from '../../providers/user-service';

import { ContaService } from '../../providers/conta-service';


@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {
  private user:FormGroup;
  private editar: boolean;
  private userAtual: User = new User();
  private loading: boolean = false;

  constructor(
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public userService: UserService,
    public facebookService: FacebookService,
    public contaService: ContaService
  ) {

    this.userService.get().then(response => {
      this.userAtual = response;
      this.editar = false;

          this.userAtual.nome = "Cleybson Cardoso";
          this.userAtual.connected = true;
          this.userAtual.email = "aaaa@a";
          this.userAtual.senha= "123456";
          this.userAtual.facebook = "1547554931938642";
          this.userAtual.id = 6;
          this.userAtual.foto = "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15036592_1477985475562255_7170420236271870875_n.jpg?oh=736778d890a0f3b9c1aeb7404b951e85&oe=59107F62";
      //Configurando objeto user com campos para validação
      this.user = this.formBuilder.group({
        nome: [this.userAtual.nome, Validators.compose([Validators.required])],
        nascimento: [this.userAtual.nascimento, Validators.compose([Validators.required])],
        genero: [this.userAtual.genero, Validators.compose([Validators.required])],
        email: [this.userAtual.email, Validators.compose([Validators.required, Validators.minLength(5)])],
        senhaatual: this.userAtual.senha,
        senha: '',
        repSenha: '',
        facebook:this.userAtual.facebook,
        id:this.userAtual.id,
        foto:this.userAtual.foto,
        permissao:this.userAtual.permissao
      });
      this.loading = true;
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

  conectarFace() {
    this.facebookService.vincular(this.userAtual.id).then(response => {
      if (response.connected) {
        this.userService.set(response);
        alert("Conta do Facebook vinculada com Sucesso")
      } else {
        alert("erro");
      }
    });
  }

  salvar() {
    if (this.validate()) {
      let atualizacao = this.contaService.editar('editar', this.user);
      atualizacao.then(response => {
        if (response) {
          let userAtualizado = new User();
          console.log(response);
          this.userService.set(userAtualizado);
        }else{
          alert("Alterações não foram salvas")
        }
      });

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
              this.salvar();              
            }
          }]
      });
      confirm.present();
    }
  }



}
