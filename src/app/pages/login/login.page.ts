import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MessageService } from '@app/services/message.service';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public credentials: FormGroup;
  public keepLogin: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private msgService: MessageService,
  ) {}

  ngOnInit() {
    this.keepLogin = true;
    this.credentials = this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();
        this.router.navigateByUrl('home', { replaceUrl: true });
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Atenção!',
          message: res.error.error,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }

  // Easy access for form fields
  public get usuario() {
    return this.credentials.get('usuario');
  }

  public get password() {
    return this.credentials.get('password');
  }

  public async forgotPasswordModal(){
    const self = this;
    const alert = await self.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Recuperação de senha',
      message: `Por favor insira seu email cadastrado no nosso sistema:`,
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Digite aqui...',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: (alertData) => {
            if(alertData.email !== ''){
              this.sendMail(alertData.email);
            } else {
              this.msgService.messageAlert('Você precisa informar seu email cadastrado!');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private async sendMail(email: string){
    this.authService.forgotPassword({email}).subscribe(
      async (res) => {
        this.msgService.hideLoading();
        this.newPasswordAlert(email);
      },
      async (error) =>{
        this.msgService.hideLoading();
        this.msgService.messageAlert(error.msg);
      }
    );
  }

  private async newPasswordAlert(email: string){
    const self = this;
    const alert = await self.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Recuperação de senha',
      message: `Por favor insira o token enviado para seu email e sua nova senha, ela deve ter pelo menos 6 caracteres:`,
      inputs: [
        {
          name: 'token',
          type: 'text',
          placeholder: 'Informe o token',
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Digite sua senha',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: (alertData) => {
            if(alertData.password.length >= 6){
              this.authService.resetPassword({email, token: alertData.token, password: alertData.password}).subscribe(
                async (res) => {
                  this.msgService.hideLoading();
                  this.msgService.messageAlert('Senha alterada com sucesso!');
                },
                async (error) =>{
                  this.msgService.hideLoading();
                  this.msgService.messageAlert('Houve um erro durante o processo, por favor tente novamente mais tarde.');
                }
              );
            } else {
              this.msgService.messageAlert('Sua senha precisa de pelo menos 6 caracteres! Repita novamente a operação!');
            }
          }
        }
      ]
    });

    await alert.present();
  }

}
