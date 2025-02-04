/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { SocioprodutivoContent } from '@lib/imovel/Socioprodutivo';
import { DatabaseService } from '@services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormType } from '@lib/form/Form.enum';

import { MessageService } from '@app/services/message.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';
import { NetworkService, ConnectionStatus } from '@services/network.service';

import { FaqPage } from '@app/modals/faq/faq.page';
import { AlertController, IonSlides, ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { AuthenticationService } from '@app/services/authentication.service';
const longTime = 10000000000000000000;

enum FormArrayNames {
  DADOS_PESSOAIS = 'responsavel',
  DADOS_CONJUGE = 'conjuge',
  MEMBROS_MORADORES = 'membrosMoradores',
  PRODUCAO_ANIMAL = 'producaoAnimal',
  PRODUCAO_VEGETAL = 'producaoVegetalExtrativismo',
  PRODUTO_PRODUCAO_ANIMAL = 'produtosProducaoAnimal',
  DESTINO_COMERCIALIZACAO = 'destinoComercializacao',
  COMERCIALIZACAO_OUTROS = 'destinoComercializacaoOutros',
}

enum Checkbox {
  PRINCIPAIS_ATIVIDADES_PRODUTIVAS = 'principaisAtividadesProdutivas',
}

@Component({
  selector: 'app-socioprodutivo-formulario',
  templateUrl: './socioprodutivo-formulario.page.html',
  styleUrls: ['./socioprodutivo-formulario.page.scss'],
})
export class SocioprodutivoFormularioPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  public form: FormGroup;
  public isCreateMode: boolean;
  public salvouFormularioCorretamente: boolean;
  public slideOpts = {
    autoHeight: true
  };
  pagina: number;
  maxPage: number;
  idImovel: any;
  idSocioprodutivo: any;

  atividadesProdutivas: any;
  grauParentesco: any;
  escolaridade: any;

  constructor(
    private fb: FormBuilder,
    public suporte: SocioprodutivoContent,
    private database: DatabaseService,
    private route: ActivatedRoute,
    private msgService: MessageService,
    public networkService: NetworkService,
    private location: Location,
    private router: Router,
    private alertCtrl: AlertController,
    private modalController: ModalController,
    private authService: AuthenticationService
  ) { }

  async ngOnInit() {
    this.pagina = 1;
    this.idImovel = this.route.snapshot.params?.idImovel;
    this.idSocioprodutivo = this.route.snapshot.params?.idSocioprodutivo;
    this.salvouFormularioCorretamente = false;
    this.isCreateMode = !this.idSocioprodutivo;
    this.maxPage = 7;

    this.atividadesProdutivas = this.suporte.atividadesProdutivas;
    this.grauParentesco = this.suporte.grauParentesco;
    this.escolaridade = this.suporte.escolaridade;
    this.form = this.fb.group({
      _id: [new Date().toISOString()],
      versao: '1.0',
      nomeEntrevistador: [this.database.usuario],
      dataEntrevista: ['', Validators.required],
      nomeEntrevistado: ['', Validators.required],
      responsavel: this.fb.array([
        this.initFormArray(FormArrayNames.DADOS_PESSOAIS)
      ]),
      conjuge: this.fb.array([
        this.initFormArray(FormArrayNames.DADOS_CONJUGE)
      ]),
      principaisAtividadesProdutivas: this.fb.array([]),
      principaisAtividadesProdutivasOutros: [''],
      membrosMoradores: this.fb.array([
        this.initFormArray(FormArrayNames.MEMBROS_MORADORES)
      ]),
      producaoAnimal: this.fb.array([
        this.initFormArray(FormArrayNames.PRODUCAO_ANIMAL)
      ]),
      producaoVegetalExtrativismo: this.fb.array([
        this.initFormArray(FormArrayNames.PRODUCAO_VEGETAL)
      ]),
      produtosProducaoAnimal: this.fb.array([
        this.initFormArray(FormArrayNames.PRODUTO_PRODUCAO_ANIMAL)
      ]),
      producaoComercializada: [''],
      destinoComercializacao: this.fb.array([
        this.initFormArray(FormArrayNames.DESTINO_COMERCIALIZACAO)
      ]),
      destinoComercializacaoOutros: this.fb.array([
        this.initFormArray(FormArrayNames.COMERCIALIZACAO_OUTROS)
      ]),
      possuiDap: [''],
      tipoDap: [''],
      beneficios: [''],
      beneficiosOutro: [''],
      servicosPublicos: [''],
    });

    if (!this.isCreateMode) {
      await this.fillEditForm();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  public get fMembrosMoradores() { return this.form.controls.membrosMoradores; }
  public get fProducaoAnimal() { return this.form.controls.producaoAnimal; }
  public get fProducaoVegetalExtrativismo() { return this.form.controls.producaoVegetalExtrativismo; }
  public get fProdutosProducaoAnimal() { return this.form.controls.produtosProducaoAnimal; }
  public get fDestinoComercializacao() { return this.form.controls.destinoComercializacao; }
  public get fDestinoComercializacaoOutros() { return this.form.controls.fDestinoComercializacaoOutros; }

  public get formArrayNames(): typeof FormArrayNames {
    return FormArrayNames;
  }


  async fillEditForm() {
    this.msgService.showLoading();
    this.database.getImovelById(this.idImovel).then(((resp: any) => {
      if (resp === undefined) {
        this.msgService.hideLoading();
        this.msgService.messageAlert('Houve um erro ao carregar seu imóvel, tente novamente mais tarde.', '', 'Atenção');
        this.router.navigate(['/home']);
        return;
      }
      const dados = resp.getSocioprodutivo(this.idSocioprodutivo);
      const array: Array<string> = Object.values(FormArrayNames);
      const checkbox: Array<string> = Object.values(Checkbox);
      for(const key in dados){
        if((['_id']).includes(key)) {continue;}
        else if(array.includes(key)) { this.initEditarFormArray(key, dados[key]);}
        else if(checkbox.includes(key)) { this.fillCheck(dados[key], key);}
        else { this.f[key].setValue(dados[key]); }
      }

      this.msgService.hideLoading();
      console.log(this.form.value);
    })).catch((err) => {
      this.msgService.hideLoading();
      this.msgService.messageAlert('Houve um erro ao carregar seu questionário socioprodutivo, tente novamente mais tarde.', '', 'Atenção');
      this.router.navigate(['/home']);
    });
  }

  async faq() {
    const modal = await this.modalController.create({
      component: FaqPage,
      componentProps: {
        tela: 'socioprodutivoFormulario',
      }
    });

    await modal.present();
  }

  private initFormArray(tipo: string, data?: any): FormGroup {
    switch (tipo) {
      case FormArrayNames.DADOS_PESSOAIS:
        return this.fb.group({
          nome: [data?.nome || ''],
          cpf: [data?.cpf || ''],
          nisCad: [data?.nisCad || ''],
          celular: [data?.celular || ''],
        });

      case FormArrayNames.DADOS_CONJUGE:
        return this.fb.group({
          nome: [data?.nome || ''],
          cpf: [data?.cpf || ''],
          nisCad: [data?.nisCad || ''],
          celular: [data?.celular || ''],
        });

      case FormArrayNames.MEMBROS_MORADORES:
        return this.fb.group({
          grauParentesco: [data?.grauParentesco || ''],
          grauOutro: [data?.grauOutro || ''],
          idade: [data?.idade || 0],
          escolaridade: [data?.escolaridade || ''],
          nome: [data?.nome || ''],
        });

      case FormArrayNames.PRODUCAO_ANIMAL:
        return this.fb.group({
          tipo: [data?.tipo || {}],
          tipoOutro: [data?.tipoOutro || ''],
          unidadeMedida: [data?.unidadeMedida || ''],
          nAnimais: [data?.nAnimais || 0],
          valorTotalAnimais: [data?.valorTotalAnimais || 0],
          producaoVendida: [data?.producaoVendida || 0],
          paaPnae: [data?.paaPnae || 0],
          mercadosEstado: [data?.mercadosEstado || 0],
          mercadosOutrosEstados: [data?.mercadosOutrosEstados || 0],
          valorTotalVendas: [data?.valorTotalVendas || 0],
          parcelaConsumoFamiliar: [data?.parcelaConsumoFamiliar || 0],
          valorConsumo: [data?.valorConsumo || 0],
        });

      case FormArrayNames.PRODUCAO_VEGETAL:
        return this.fb.group({
          categoria: [data?.categoria || ''],
          tipo: [data?.tipo || {}],
          tipoOutro: [data?.tipoOutro || ''],
          quantidade: [data?.quantidade || 0],
          unidadeMedida: [data?.unidadeMedida || ''],
          pura: [data?.pura || '0.0000'],
          consorciada: [data?.consorciada || '0.0000'],
          unitario: [data?.unitario || 0],
          quantidadeVendida: [data?.quantidadeVendida || 0],
          paaPnae: [data?.paaPnae || 0],
          mercadosEstado: [data?.mercadosEstado || 0],
          mercadosOutrosEstados: [data?.mercadosOutrosEstados || 0],
          valorTotalVendas: [data?.valorTotalVendas || 0],
          familiar: [data?.familiar || 0],
          valor: [data?.valor || 0],
        });

      case FormArrayNames.PRODUTO_PRODUCAO_ANIMAL:
        return this.fb.group({
          tipo: [data?.tipo || {}],
          tipoOutro: [data?.tipoOutro || ''],
          quantidade: [data?.quantidade || 0],
          unidadeMedida: [data?.unidadeMedida || ''],
          unitario: [data?.unitario || 0],
          quantidadeVendida: [data?.quantidadeVendida || 0],
          paaPnae: [data?.paaPnae || 0],
          mercadosEstado: [data?.mercadosEstado || 0],
          mercadosOutrosEstados: [data?.mercadosOutrosEstados || 0],
          valorTotalVendas: [data?.valorTotalVendas || 0],
          familiar: [data?.familiar || 0],
          valor: [data?.valor || 0],
        });

      case FormArrayNames.DESTINO_COMERCIALIZACAO:
        return this.fb.group({
          paaPnae: [data?.paaPnae || ''],
          cooperativaAssociacao: [data?.cooperativaAssociacao || ''],
          eventos: [data?.eventos || ''],
          atravessador: [data?.atravessador || ''],
          comerciosLocais: [data?.comerciosLocais || ''],
          outros: [data?.outros || ''],
        });

      case FormArrayNames.COMERCIALIZACAO_OUTROS:
        return this.fb.group({
          resposta: [data?.resposta || ''],
        });

      default:
        break;
    }
  }

  private initEditarFormArray(tipo: string, dados: any): any {
    const control = <FormArray>this.form.get(tipo);
    dados.forEach(element => {
      control.push(this.initFormArray(tipo, element));
    });
    control.removeAt(0);
  }

  public addElementFormArray(tipo): void {
    const control = <FormArray>this.form.get(tipo);
    control.push(this.initFormArray(tipo));
    this.slides.update();

  }

  public removeElementFormArray(tipo: string, i: number): void {
    const control = <FormArray>this.form.get(tipo);
    control.removeAt(i);
  }

  /**
   * Método de apoio para o carregamento do select na view
   */
   compareCodigo(e1: any, e2: any): boolean {
    return e1 && e2 ? e1.codigo === e2.codigo : e1 === e2;
  }

  /**
   * Método de apoio para o carregamento do select na view
   */
   compareId(e1: any, e2: any): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  /**
   * Método de apoio para o carregamento do select na view
   */
  compareChaveId(e1: any, e2: any): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  public async submit() {
    console.log(this.form.value);
    this.msgService.showLoading();
    this.database.salvarFormulario(FormType.SOCIOPRODUTIVO, this.form.value, this.isCreateMode, this.idImovel).then(((resp: string) => {
      this.salvouFormularioCorretamente = true;
      this.msgService.hideLoading();
      this.msgService.messageAlert(resp);
      this.location.back();

    })).catch((error => {
      this.msgService.hideLoading();
      this.salvouFormularioCorretamente = false;
      console.log(`erro: ${error}`);
      this.msgService.messageAlert('Atenção: Houve um erro ao salvar seu questionário socioprodutivo.');
    }));
  }

  onCheckChange(event: any, formField: string) {
    // console.log(event);
    const control = <FormArray>this.form.get(formField);

    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      control.push(new FormControl(event.detail.value));
    }
    /* unselected */
    else {
      // find the unselected element
      let i = 0;

      control.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.detail.value) {
          // Remove the unselected element from the arrayForm
          control.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  fillCheck(data: Array<string>, formField: string) {
    const control = <FormArray>this.form.get(formField);
    data.forEach(element => {
      control.push(new FormControl(element));

      if (formField === 'principaisAtividadesProdutivas') {
        this.atividadesProdutivas.forEach(item => {
          if (item.value === element) { item.isChecked = true; }
        });
      }
    });
    console.log(this.form.value);
  }

  public setValorTotal(formField, i){
    const control = this.form.get(formField)['controls'];
    const unitario = +control[i].controls.unitario.value.replace(',', '.');
    const quantidadeVendida = control[i].controls.quantidadeVendida.value;
    control[i].controls.valorTotalVendas.setValue(unitario*quantidadeVendida);
    console.log(control[i].controls.valorTotalVendas.value);

  }
  public next() {
    // this.slides.slideNext();
    this.pagina++;
    this.getContent().scrollToTop(200);
  }

  public prev() {
    // this.slides.slidePrev();
    this.pagina--;
    this.getContent().scrollToTop(200);
  }

  getContent() {
    return document.querySelector('ion-content');
  }

  scrollToBottom() {
    this.getContent().scrollToBottom(200);
  }

  scrollToTop() {
    // this.slides.update();
    this.getContent().scrollToTop(200);
  }

  //canLeave
  async canPageLeave(nextUrl?: string) {
    if (this.salvouFormularioCorretamente) {
      return true;
    }

    // if (nextUrl && !nextUrl.includes('home')) {
    //   return true;
    // }

    const alert = await this.alertCtrl.create({
      header: 'Deseja realmente sair desta página?',
      message: 'Todo seu trabalho que não foi salvo irá ser perdido.',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Sim',
          role: 'goBack',
          handler: () => {}
        }
      ]
    });

    await alert.present();

    const data = await alert.onDidDismiss();

    if (data.role === 'goBack') {
      return true;
    } else {
      return false;
    }
  }

}
