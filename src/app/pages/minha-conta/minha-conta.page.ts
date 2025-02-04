import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/services/authentication.service';
import { MessageService } from '@app/services/message.service';
import { MustMatch } from '@lib/utils/must-match.validator';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.page.html',
  styleUrls: ['./minha-conta.page.scss'],
})
export class MinhaContaPage implements OnInit {

  user: any;
  passwordForm: any;
  ufList: string[];

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private msgService: MessageService,
  ) { }

  ngOnInit() {
    this.user = this.fb.group({
      nome: [''],
      dataNascimento: [''],
      telefone: [''],
      org: [''],
      uf: [''],
    });

    this.passwordForm = this.fb.group({
      senhaAtual: ['', Validators.required],
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      repitaNovaSenha: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: MustMatch('novaSenha', 'repitaNovaSenha')
    });

    this.ufList = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB',
      'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO' ];

    this.fillUserForm();
  }

  // convenience getter for easy access to user form fields
  get f() { return this.user.controls; }



  public changeUser() {
    this.msgService.showLoading();
    this.authService.changeUser(this.authService.user.id, this.user.value).subscribe((resp) => {
      this.msgService.hideLoading();
      if(resp.ok){
        this.authService.updateUserData(this.user.value);
         this.msgService.messageAlert(resp.msg);
      } else {
        this.msgService.messageAlert(resp.error);
      }
    });
  }

  public changePassword() {
    this.authService.changePassword(this.passwordForm.value).subscribe((resp) => {
      console.log(resp);
      this.msgService.messageAlert(resp.msg);
    });
  }

  // Easy access for form fields
  public get senhaAtual() {
    return this.passwordForm.get('senhaAtual');
  }

  public get novaSenha() {
    return this.passwordForm.get('novaSenha');
  }

  public get repitaNovaSenha() {
    return this.passwordForm.get('repitaNovaSenha');
  }


  public isoToDate(date: string, period: string) {
    date = date.substr(0, 10);
    const split = date.split('-');
    if (period === 'day') {
      return `${split[2]}/${split[1]}/${split[0]}`;
    } else if (period === 'month') {
      return `${split[1]}/${split[0]}`;
    } else if (period === 'year') {
      return `${split[0]}`;
    }
  }

  public dateToIso(date: string, period: string) {
    date = date.substr(0, 10);
    const split = date.split('/');
    if (period === 'day') {
      return `${split[2]}-${split[1]}-${split[0]}`;
    } else if (period === 'month') {
      return `${split[1]}-${split[0]}`;
    } else if (period === 'year') {
      return `${split[0]}`;
    }
  }

  private fillUserForm() {
    this.f.nome.setValue(this.authService.user?.nome);
    // let data = this.general.dateToIso(this.authService.user.dataNascimento, 'day');
    this.f.dataNascimento.setValue(this.authService.user?.dataNascimento);
    this.f.telefone.setValue(this.authService.user?.telefone);
    this.f.org.setValue(this.authService.user?.org);
    this.f.uf.setValue(this.authService.user?.uf);
  }

}
