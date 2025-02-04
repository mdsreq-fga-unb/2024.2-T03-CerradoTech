/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

//validador do formulário email
const EmailConfere: ValidatorFn = (fg: FormGroup) => {
  const email = fg.get('email').value;
  const confirmEmail = fg.get('confirmEmail').value;
  return email !== '' && confirmEmail !== '' && email === confirmEmail
    ? null
    : { emailConfere: true };
};

//validador do formulário senha
const SenhaConfere: ValidatorFn = (fg: FormGroup) => {
  const password = fg.get('password').value;
  const confirmPassword = fg.get('confirmPassword').value;
  return password !== '' && confirmPassword !== '' && password === confirmPassword
    ? null
    : { senhaConfere: true };
};

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public register: FormGroup;
  public ufList: Array<string>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.register = this.fb.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern('^[a-zA-Z\u00C0-\u017F\s ]+$')])],
      usuario: ['',Validators.compose([Validators.required, Validators.pattern('^[A-Za-z0-9_-]*$'), Validators.minLength(3), Validators.maxLength(30)])],
      dataNascimento: ['', Validators.required],
      cpf: ['', Validators.compose([Validators.required,Validators.minLength(14), Validators.maxLength(14)])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      confirmEmail:['',Validators.compose([Validators.required])],
      telefone: ['', Validators.compose([Validators.required,Validators.minLength(13), Validators.maxLength(15)])],
      uf:['',Validators.compose([Validators.required])],
      org:[''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, {validator:[EmailConfere, SenhaConfere]});

    this.ufList = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB',
      'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO' ];

  }

  public async signup() {
    const loading = await this.loadingController.create();
    await loading.present();
  
    this.authService.signup(this.register.value).subscribe(
      async (response) => {
        await loading.dismiss();
        this.router.navigateByUrl('home', { replaceUrl: true });
      },
      async (error) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Registro falhou',
          message: error.error.error,
          buttons: ['OK'],
        });
  
        await alert.present();
      }
    );
  }
  

  public teste() {
    console.log(this.register.value);
    console.log(this.f.cpf.errors);
  }

  // convenience getter for easy access to user form fields
  get f() { return this.register.controls; }
}
