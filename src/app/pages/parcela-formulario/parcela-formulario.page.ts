/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { MessageService } from '@app/services/message.service';
import { NetworkService, ConnectionStatus } from '@services/network.service';
import { ParcelaContent } from '@lib/imovel/ParcelaContent';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, IonSlides, AlertController } from '@ionic/angular';
import { MapPage } from '@app/modals/map/map.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ViewChild } from '@angular/core';
import { MyCoords, Coord } from '@lib/user/Coordenadas.class';
import { Location } from '@angular/common';
import { OriginMap } from '@lib/imovel/MapOrigin';
import { CatalogoEspeciesService } from '@app/services/catalogo-especies.service';
import { ParcelaObservacaoPage } from '@app/modals/parcela-observacao/parcela-observacao.page';
import { FaqPage } from '@app/modals/faq/faq.page';

import { isDeactivatable } from '@app/guards/leave-form.guard';
import { Observable } from 'rxjs';
const longTime = 10000000000000000000;

@Component({
  selector: 'app-parcela-formulario',
  templateUrl: './parcela-formulario.page.html',
  styleUrls: ['./parcela-formulario.page.scss'],
})
export class ParcelaFormularioPage implements OnInit, isDeactivatable {
  @ViewChild(IonSlides) slides: IonSlides;
  slideOpts = { autoHeight: true };
  flagEspecial: boolean;
  title: string;
  form: FormGroup;
  idImovel: any;
  idPoligono: any;
  idParcela: any;
  poligono: any;
  parcela: any;
  anoMonitoramento: any;
  formularioSalvo: any;
  maxPage: number;
  myCoords: Array<Coord>;
  originMap: typeof OriginMap;
  contadorCobertura: number;
  coberturaVegetacao: { id: number; nome: string }[];
  listaEspecies: any[];
  salvouFormularioCorretamente: boolean;
  isCreateMode: boolean;

  constructor(
    public suporte: ParcelaContent,
    public networkService: NetworkService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private database: DatabaseService,
    private msgService: MessageService,
    private geolocation: Geolocation,
    private modalController: ModalController,
    private location: Location,
    private catalogoProvider: CatalogoEspeciesService,
    private alertCtrl: AlertController,
    private ref: ChangeDetectorRef,
  ) { }

  async ngOnInit() {
    this.originMap = OriginMap;
    this.idImovel = this.route.snapshot.params?.idImovel;
    this.idPoligono = this.route.snapshot.params?.idPoligono;
    this.idParcela = this.route.snapshot.params?.idParcela;
    this.maxPage = !this.flagEspecial ? 3 : 1;
    this.contadorCobertura = 0;
    this.title = '';
    this.salvouFormularioCorretamente = false;
    this.isCreateMode = !this.idParcela;

    this.form = this.fb.group({
      _id: ['', Validators.required],
      versao: ['1.0'],
      numeroParcela: ['', Validators.required],
      anoMonitoramento: ['', Validators.required],
      gpsOuMapa: [''],
      latitude: [''],
      longitude: [''],
      parcelaPermanente: [],
      coberturaVegetacao: [],
      densidadeEspecies: [],
      especial: [this.flagEspecial, Validators.required],
      editado: [[]],
      status: [],
      fotoLocal: [''],
      fotoRemoto: [''],
      observacoes: [''],
    });

    if (!this.isCreateMode) {
      await this.fillEditForm();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  public async fillEditForm() {
    this.msgService.showLoading();
    await this.database.getPoligonoById(this.idImovel, this.idPoligono).then(((resp: any) => {
      if (resp === undefined) {
        this.msgService.hideLoading();
        this.msgService.messageAlert('Houve um erro ao carregar sua parcela, tente novamente mais tarde.', '', 'Atenção');
        this.router.navigate(['/home']);
        return;
      }

      this.poligono = {
        formacaoVegetal: resp.data.formacaoVegetal,
        tipo: resp.data.tipo
      };

      this.parcela = resp.data.parcelas[this.idParcela];
      this.anoMonitoramento = this.parcela.anoMonitoramento;
      this.title = this.parcela.numeroParcela;
      if(this.title === 'Densidade de indivíduos e espécies') { this.title = 'Densidade'; }

      if (this.poligono.formacaoVegetal.label === 'Florestal') {
        this.coberturaVegetacao = this.suporte.coberturaCopa;
      } else {
        this.coberturaVegetacao = this.suporte.coberturaVegetacao;
      }

      for (const key in this.parcela) {
        if ((['']).includes(key)) { continue; }
        this.f[key].setValue(this.parcela[key]);
      }
      this.flagEspecial = this.form.value.especial;
      // this.maxPage = !this.flagEspecial ? 3 : 1;
      if(this.poligono.tipo < 3) {
        this.maxPage = this.poligono.formacaoVegetal.label !== 'Campestre' ? 3 : 2;
      }
      else if(this.poligono.tipo === 3){
        if(this.flagEspecial){
          this.maxPage = 1;
        } else {
          this.maxPage = this.poligono.formacaoVegetal.label !== 'Campestre' ? 2 : 1;
        }
      }

      this.msgService.hideLoading();
      console.log(this.form.value);
    })).catch((err) => {
      this.msgService.hideLoading();
      this.msgService.messageAlert('Houve um erro ao carregar seu imóvel, tente novamente mais tarde.', '', 'Atenção');
      this.router.navigate(['/home']);
    });
  }

  async getGeolocation() {
    this.msgService.showLoading();
    this.geolocation.getCurrentPosition({ timeout: 5000, enableHighAccuracy: true, maximumAge: longTime }).then((resp) => {
      this.f.latitude.setValue(resp.coords.latitude);
      this.f.longitude.setValue(resp.coords.longitude);
      this.msgService.hideLoading();
    }).catch((error) => {
      console.log('Error getting location', error);
      this.msgService.hideLoading();
      this.msgService.messageAlert('Atenção! Houve um erro ao coletar sua localização, verifique se o aplicativo tem permissão para usar seu GPS e se ele estar funcionando corretamente!');
    });

  }

  async presentModal(connection?: string) {
    const self = this;
    let tempLat: any;
    let tempLong: any;
    let hasPoint: boolean;
    this.msgService.showLoading();
    if (self.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      // if (self.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      this.geolocation.getCurrentPosition({ timeout: 5000, enableHighAccuracy: true, maximumAge: longTime }).then(async (resp) => {
        if ((this.f.latitude.value === '' || this.f.latitude.value === 0) && (this.f.longitude.value === '' || this.f.longitude.value === 0)) {
          tempLat = resp.coords.latitude;
          tempLong = resp.coords.longitude;
          hasPoint = false;
        } else {
          tempLat = this.f.latitude.value;
          tempLong = this.f.longitude.value;
          hasPoint = true;
        };

        const modal = await this.modalController.create({
          component: MapPage,
          cssClass: 'my-custom-class',
          componentProps: {
            latitude: tempLat,
            longitude: tempLong,
            hasPoint,
            origin: OriginMap.PARCELA,
            offline: false
          }
        });

        modal.onDidDismiss().then((resp) => {
          console.log(resp);
          if (resp.data.hasData) {
            this.f.latitude.setValue(resp.data.latitude);
            this.f.longitude.setValue(resp.data.longitude);
            if (connection === 'offline') {
              this.f.gpsOuMapa.setValue('mapa');
            }
          }
        });

        return await modal.present();
      }).catch(async (error) => {
        this.msgService.hideLoading();
        console.log('Error getting location', error);
        this.msgService.messageAlert('Atenção! Houve um erro ao coletar sua localização, verifique se o aplicativo tem permissão para usar seu GPS e se ele estar funcionando corretamente!');
      });
    } else {
      this.database.getCoords().then(async (resp: MyCoords) => {
        this.myCoords = resp.coords;
        const inputs = [];
        for (const coord of this.myCoords) {
          inputs.push({
            name: coord.name,
            type: 'radio',
            label: coord.name,
            value: coord
          });
        }
        this.msgService.hideLoading();
        const customButtons = [{
          text: 'Não',
          role: 'cancel',
        }, {
          text: 'Confirmar',
          handler: async (alertData) => {
            console.log('Confirm Ok', alertData);

            const modal = await this.modalController.create({
              component: MapPage,
              cssClass: 'my-custom-class',
              componentProps: {
                latitude: this.f.latitude.value,
                longitude: this.f.longitude.value,
                hasPoint: (this.f.latitude.value !== 0 && this.f.longitude.value !== 0) ? true: false,
                origin: OriginMap.PARCELA,
                offline: true,
                center: {latitude: alertData.latitude, longitude: alertData.longitude}
              }
            });

            modal.onDidDismiss().then((resp) => {
              console.log(resp);
              if (resp.data.hasData) {
                this.f.latitude.setValue(resp.data.latitude);
                this.f.longitude.setValue(resp.data.longitude);
              }
            });
            return await modal.present();
          }
        }];
        this.msgService.messageAlert('Escolha uma localidade previamente cadastrada', customButtons, 'Você está offline!', '', inputs);
      });
    }
  }

  async faq(){
    const modal = await this.modalController.create({
      component: FaqPage,
      componentProps: {
        tela: 'parcelaFormulario',
      }
    });

    await modal.present();
  }

  private async checarStatus() {
    let contador = 0;

    if (!this.flagEspecial && this.poligono.tipo < 3) {

      if (this.form.value.latitude !== 0 && this.form.value.longitude !== 0) { contador++; }

      const cobertura = this.form.value.coberturaVegetacao.filter((cobertura) => (cobertura.tipo.length > 0));
      if (cobertura.length === 26) { contador++; }

      const densidade = this.form.value.densidadeEspecies.filter((especie) => (especie.regenerante !== '' && especie.especie !== ''));

      if (densidade.length > 0) { contador++; }

      if (contador === 0) { return this.suporte.statusPreenchimento.nao_iniciado; }
      if (contador > 0 && contador < 3) { return this.suporte.statusPreenchimento.incompleto; }
      if (contador === 3) { return this.suporte.statusPreenchimento.finalizado; }
    } else if (!this.flagEspecial && this.poligono.tipo === 3) {

      if (this.form.value.latitude !== 0 && this.form.value.longitude !== 0) { contador++; }

      const cobertura = this.form.value.coberturaVegetacao.filter((cobertura) => (cobertura.tipo.length > 0));
      if (cobertura.length === 26) { contador++; }

      if (contador === 0) { return this.suporte.statusPreenchimento.nao_iniciado; }
      if (contador === 1) { return this.suporte.statusPreenchimento.incompleto; }
      if (contador === 2) { return this.suporte.statusPreenchimento.finalizado; }
    } else {
      const densidade = this.form.value.densidadeEspecies.filter((especie) => (especie.regenerante !== '' && especie.especie !== ''));

      if (densidade.length > 0) { contador++; }

      if (contador === 0) { return this.suporte.statusPreenchimento.nao_iniciado; }
      if (contador === 1) { return this.suporte.statusPreenchimento.finalizado; }
    }
  }

  private initIndividuos(): any {
    return {
      regenerante: '',
      especie: ''
    };
  }

  public addIndividuos(indexIndividuo: number): void {

    const controlDensidade = <any>this.form.controls.densidadeEspecies;
    const individuos = controlDensidade.value;

    if (individuos[indexIndividuo].regenerante !== '') {
      individuos.push(this.initIndividuos());
      this.form.controls.densidadeEspecies.setValue(individuos);
    } else {
      this.msgService.messageAlert('Você precisa primeiro precisa responder se o indivíduo é regenerante ou não.');
    }



  }

  public removerIndividuo(i: number): void {
    const individuos = this.form.controls.densidadeEspecies.value;
    individuos.splice(i, 1);
    this.form.controls.densidadeEspecies.setValue(individuos);
  }

  /**
   *
   * @param index 0 a 25 que representa o metro atual e consequentemente a posição no formulario.coberturaVegetacao
   * @param valor resposta selecionada
   */
  public marcarCobertura(valor: { id: number; nome: string }) {
    const control = <any>this.form.controls.coberturaVegetacao;
    const value = control.value;

    // atalho tipo
    const tipo = value[this.contadorCobertura].tipo;
    const indexAusente = tipo.findIndex(i => i.id === this.suporte.coberturaVegetacao[0].id);
    const indexSemCopa = tipo.findIndex(i => i.id === this.suporte.coberturaCopa[0].id);

    // Marca o tipo como ausente ou sem copa dependendo do caso
    if ((valor.id === 0 || valor.id === 5)) {
      if (indexAusente > -1) { tipo.splice(indexAusente, 1); return; }
      if (indexSemCopa > -1) { tipo.splice(indexSemCopa, 1); return; }
      value[this.contadorCobertura].tipo = [valor];
      control.setValue(value);
      return;
    }



    // Index para verificar necessidade de remover elementos do array (desmarcar opção)
    const index = tipo.indexOf(valor, 0);
    if (indexAusente > -1) { tipo.splice(indexAusente, 1); }
    if (indexSemCopa > -1) { tipo.splice(indexSemCopa, 1); }


    value[this.contadorCobertura].tipo = this.marcarValor(tipo, index, valor);
    control.setValue(value);
  }

  /**
   *
   * @param index 0 a 25 que representa o metro atual e consequentemente a posição no formulario.coberturaVegetacao
   * @param valor resposta selecionada
   */
  public marcarDensidade(valor: any, indexIndividuo?: number) {
    const controlDensidade = <any>this.form.controls.densidadeEspecies;
    const valueDensidade = controlDensidade.value;
    valueDensidade[indexIndividuo].regenerante = valor;
    controlDensidade.setValue(valueDensidade);
    console.log('marcou');
  }

  private marcarValor(array: Array<{ id: number; nome: string }>, index: number, valor: { id: number; nome: string }) {
    if (!array.includes(valor)) {
      array.push(valor);
    } else {
      if (index > -1) {
        array.splice(index, 1);
      }
    }
    return array;
  }

  public proximoMetro() {
    if (this.contadorCobertura < 25) {
      const control = <any>this.form.controls.coberturaVegetacao;
      if (control.value[this.contadorCobertura].tipo.length > 0) {
        this.contadorCobertura++;
        this.ref.detectChanges();
        this.slides.slideTo(1);
      }
      else { this.msgService.messageAlert('Você precisa fazer a marcação antes de seguir para o próximo ponto!'); }
    } else {
      this.msgService.messageAlert('Parabéns! Você chegou ao final da coleta de informações sobre a cobertura de vegetação!');
    }
  }

  public metroAnterior() {
    if (this.contadorCobertura > 0) { this.contadorCobertura--; }
  }

  public writeEspecie(nome: any, index: number) {
    const controlDensidade = <any>this.form.controls.densidadeEspecies;
    const valueDensidade = controlDensidade.value;
    valueDensidade[index].especie = nome.detail.value;
    controlDensidade.setValue(valueDensidade);
  }

  public next() {
    this.slides.slideNext();
  }

  public prev() {
    this.slides.slidePrev();
  }

  public checarCobertura(valor, opt) {
    return valor.findIndex(i => i.id === opt.id) > -1;
  }

  public async submit() {
    this.msgService.showLoading();
    const statusPreenchimento = await this.checarStatus();
    this.form.controls.status.setValue(statusPreenchimento);
    await this.database.salvarParcela(this.idImovel, this.idPoligono, this.form.value).then(((resp: string) => {
      this.msgService.hideLoading();
      this.salvouFormularioCorretamente = true;
      this.msgService.messageAlert(resp);
      this.location.back();
    })).catch((error => {
      this.msgService.hideLoading();
      console.log(`erro: ${error}`);
      this.msgService.messageAlert('Atenção: Houve um erro ao salvar sua parcela.');
      this.salvouFormularioCorretamente = true;
    }));
  }

  //Catálogo de espécies
  public async consultarCatalogo(index: number) {
    this.listaEspecies = [];
    this.msgService.showLoading();
    await this.catalogoProvider.getLista().then((listaEspecies: any) => {
      this.msgService.hideLoading();

      const title = 'Escolha uma espécie';
      const message = '';

      this.listaEspecies = listaEspecies;
      const inputs = [];
      for (const especie of listaEspecies) {
        inputs.push({
          type: 'radio',
          label: especie.nome,
          value: especie.nome,
          checked: false
        });
      }

      const buttons = [
        {
          text: 'Cancelar',
        },
        {
          text: 'Confirmar',
          handler: data => {
            console.log('Checkbox data:', data);
            const controlDensidade = <any>this.form.controls.densidadeEspecies;
            const valueDensidade = controlDensidade.value;
            valueDensidade[index].especie = data;
            controlDensidade.setValue(valueDensidade);
          }
        }
      ];

      this.msgService.messageAlert(message, buttons, title, '', inputs);
    }).catch((error) => {
      this.msgService.hideLoading();
      this.msgService.messageAlert('No momento não foi possível buscar seu catálogo de espécies. Tente novamente mais tarde.');
    });
  }

  public adicionarEspecie(index: number) {
    this.msgService.showLoading();
    const nome = this.form.value.densidadeEspecies[index].especie;
    this.catalogoProvider.salvar({
      _id: '',
      _rev: '',
      nome
    }).then(() => {
      this.msgService.hideLoading();
      this.msgService.messageAlert('Espécie cadastrada com sucesso.');
    }).catch((err) => {
      this.msgService.hideLoading();
      this.msgService.messageAlert(err);
    });
  }

  //Observações

  public async fazerObservacao() {
    const modal = await this.modalController.create({
      component: ParcelaObservacaoPage,
      componentProps: {
        texto: this.form.value.observacoes,
        edit: true
      }
    });
    modal.present();

    modal.onDidDismiss().then((resp: any) => {
      if (resp.data !== undefined) {this.form.controls.observacoes.setValue(resp.data);}
    });
  }

  //Fotos e anexos


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
