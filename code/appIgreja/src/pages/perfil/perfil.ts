import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../model/User';
import { FacebookService } from '../../providers/facebook-service';
import { UserService } from '../../providers/user-service';
import { ActionSheetController } from 'ionic-angular';
import { ContaService } from '../../providers/conta-service';


@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {
  private user: FormGroup;
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
    public contaService: ContaService,
    public actionSheetCtrl: ActionSheetController
  ) {

    this.userService.get().then(response => {
      this.userAtual = response;
      //Configurando objeto user com campos para validação
      this.user = this.formBuilder.group({
        nome: [this.userAtual.nome, Validators.compose([Validators.required])],
        nascimento: [this.userAtual.nascimento, Validators.compose([Validators.required])],
        genero: [this.userAtual.genero, Validators.compose([Validators.required])],
        email: [this.userAtual.email, Validators.compose([Validators.required, Validators.minLength(5)])],
        senhaatual: '',
        senha: '',
        repSenha: '',
        facebook: this.userAtual.facebook,
        id: this.userAtual.id,
        foto: this.userAtual.foto,
        permissao: this.userAtual.permissao
      });
      this.loading = true;
    });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
    this.editar = false;
    
  }

  validate(): boolean {
    if (this.user.valid) {
      return true;
    }

    // figure out the error message
    let errorMsg = '';

    // validate each field
    let control = this.user.controls['email'];
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

  alterarSenha(): boolean {

    if (this.user.get('senhaatual').value == '' || this.user.get('senhaatual').value == this.userAtual.senha && this.user.get('senha').value.length > 5 && this.user.get('senha').value == this.user.get('repSenha').value && this.user.get('senha').value != '') {
      return true;
    } else {
      if (this.user.get('senhaatual').value != this.userAtual.senha) {
        alert("Digite sua Senha atual Correta");
      } else if (this.user.get('senha').value == '') {
        alert("Digite a nova senha");
      } else if (this.user.get('senha').value.length < 5) {
        alert("Digite uma senha mais segura");
      } else {
        alert("As novas senhas não são iguais");
      }
      return false;
    }

  }

  salvar() {
    if (this.validate() && this.alterarSenha()) {
      let atualizacao = this.contaService.editar('editar', this.user);
      atualizacao.then(response => {
        if (response) {
          let userAtualizado = new User();
          userAtualizado.connected = true;
          userAtualizado.nome = this.user.get('nome').value;
          userAtualizado.nascimento = this.user.get('nascimento').value;
          userAtualizado.genero = this.user.get('genero').value;
          userAtualizado.email = this.user.get('email').value;
          userAtualizado.senha = this.user.get('repSenha').value;
          userAtualizado.facebook = this.user.get('facebook').value;
          userAtualizado.id = this.user.get('id').value;
          userAtualizado.foto = this.user.get('foto').value;
          userAtualizado.permissao = this.user.get('permissao').value;

          this.user.get('repSenha').value = "";
          this.user.get('senha').value = "";
          this.user.get('senhaatual').value = "";
          //LOGICA PARA SALVAR ALTERAÇÕES
          let toast = this.toastCtrl.create({
            message: 'Modificações salvas',
            duration: 3000
          });
          toast.present();
          this.userService.set(userAtualizado);
        } else {
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

              this.salvar();
            }
          }]
      });
      confirm.present();
    }
  }

  alterarFoto(){

  }



}
