/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';

import { ImovelContent } from '@lib/imovel/Content.class';
import { GeoDataService } from '@services/geo-data.service';
import { DatabaseService } from '@services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormType } from '@lib/form/Form.enum';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { MapPage } from '@app/modals/map/map.page';
import { MessageService } from '@app/services/message.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';
import { NetworkService, ConnectionStatus } from '@services/network.service';

import { MyCoords, Coord } from '@lib/user/Coordenadas.class';
import { Location } from '@angular/common';
import { OriginMap } from '@lib/imovel/MapOrigin';
import { FaqPage } from '@app/modals/faq/faq.page';

const longTime = 10000000000000000000;

@Component({
  selector: 'app-imovel-formulario',
  templateUrl: './imovel-formulario.page.html',
  styleUrls: ['./imovel-formulario.page.scss'],
})
export class ImovelFormularioPage implements OnInit {
  public title: string;
  public form: FormGroup;
  public isCreateMode: boolean;
  public id: string;
  public mapPage: MapPage;
  public slideOpts = {
    autoHeight: true
  };

  // public map: Leaflet.Map;

  public cities: any;
  public citiesSubscription: Subscription;

  public page = 2;
  public maxPage: number;

  public myCoords: Array<Coord>;

  public settlementList: Array<string>;
  salvouFormularioCorretamente: boolean;

  constructor(
    private fb: FormBuilder,
    public geoData: GeoDataService,
    public imovelContent: ImovelContent,
    private database: DatabaseService,
    private route: ActivatedRoute,
    private geolocation: Geolocation,
    private modalController: ModalController,
    private msgService: MessageService,
    public networkService: NetworkService,
    private location: Location,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    // this.leafletMap();
    this.id = this.route.snapshot.params?.id;
    this.isCreateMode = !this.id;
    this.title = (this.isCreateMode) ? 'Novo imóvel' : 'Editar imóvel';
    this.salvouFormularioCorretamente = false;
    // this.atividadesAgricolas = this.imovelContent.atividadesAgricolas;
    // this.producaoAgroalimentar = this.imovelContent.producaoAgroalimentar;

    this.form = this.fb.group({
      versao: ['1.0', Validators.required],
      tipoImovel: [{}, Validators.required],
      uf: ['', Validators.required],
      municipio: [{}, Validators.required],
      municipioOutro: [''],
      assentamento: [''],
      assentamentoOutro: [''],
      numeroLote: [0],
      nomeTerritorio: [''],
      area: ['', Validators.required],
      moduloFiscal: [0],
      gpsOuMapa: [''],
      latitude: [0],
      longitude: [0],
      criado: [this.database.usuario],
      enviado: [[]],
      editado: [[]],
    });

    if (!this.isCreateMode) {
      this.fillEditForm();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  public resetImovel() {
    this.f.assentamento.setValue('');
    this.f.assentamentoOutro.setValue('');
    this.f.numeroLote.setValue(0);
    this.f.nomeTerritorio.setValue('');
  }

  public get states(): Array<string> {
    return this.geoData.uf;
  }

  public getCities(): void {
    this.cities = this.geoData.mostrarMunicipio(this.f.uf.value, 1, 25);
  }

  public searchCities(event: {
    component: IonicSelectableComponent;
    text: string;
  }) {
    const text = event.text.trim().toLowerCase();
    event.component.startSearch();

    // Close any running subscription.
    if (this.citiesSubscription) {
      this.citiesSubscription.unsubscribe();
    }

    if (!text) {
      // Close any running subscription.
      if (this.citiesSubscription) {
        this.citiesSubscription.unsubscribe();
      }

      event.component.items = this.geoData.mostrarMunicipio(this.f.uf.value, 1, 25);

      // Enable and start infinite scroll from the beginning.
      this.page = 2;
      event.component.endSearch();
      event.component.enableInfiniteScroll();
      return;
    }

    this.citiesSubscription = this.geoData
      .mostrarMunicipioAsync(this.f.uf.value)
      .subscribe(cities => {
        // Subscription will be closed when unsubscribed manually.
        if (this.citiesSubscription.closed) {
          return;
        }

        event.component.items = this.filterCities(cities, text);
        event.component.endSearch();
      });
  }

  filterCities(cities: any, text: string) {
    return cities.filter(city => city.nome.toLowerCase().indexOf(text) !== -1 ||
      city.nome.toLowerCase().indexOf(text) !== -1);
  }

  getMoreCities(event: {
    component: IonicSelectableComponent;
    text: string;
  }) {
    const text = (event.text || '').trim().toLowerCase();

    // There're no more ports - disable infinite scroll.
    // if (this.page > 3) {
    //   event.component.disableInfiniteScroll();
    //   return;
    // }

    this.geoData.mostrarMunicipioAsync(this.f.uf.value, this.page, 15).subscribe(cities => {
      cities = event.component.items.concat(cities);

      if (text) {
        cities = this.filterCities(cities, text);
      }

      event.component.items = cities;
      event.component.endInfiniteScroll();
      this.page++;
    });
  }

  teste() {
    console.log(this.form.value);
  }

  public setCity(city: any) {
    city = city.value;
    this.f.moduloFiscal.setValue(city.mf);
    this.settlementList = city.assentamento;
    this.f.municipio.setValue({ nome: city.nome, codigo: city.codigo });
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
            origin: OriginMap.IMOVEL,
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
                origin: OriginMap.IMOVEL,
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

  public async submit() {
    this.msgService.showLoading();
    this.database.salvarFormulario(FormType.IMOVEL, this.form.value, this.isCreateMode, this.id).then(((resp: string) => {
      console.log(resp);
      this.msgService.hideLoading();
      this.salvouFormularioCorretamente = true;
      this.msgService.messageAlert(resp);
      this.location.back();

    })).catch((error => {
      this.msgService.hideLoading();
      this.salvouFormularioCorretamente = false;
      console.log(`erro: ${error}`);
      this.msgService.messageAlert('Atenção: Houve um erro ao salvar seu imóvel.');
    }));
  }



  /**
   * Método que auxilia a exibição dos JSONs dentro dos selects que tenham o identificador código
   *
   * @param e1
   * @param e2
   */
  public compareIBGE(e1: any, e2: any): boolean {
    return e1 && e2 ? e1.codigo === e2.codigo : e1 === e2;
  }

    /**
     * Método que auxilia a exibição dos JSONs dentro dos selects que tenham o identificador id
     *
     * @param e1
     * @param e2
     */
     public compareId(e1: any, e2: any): boolean {
      return e1 && e2 ? e1.id === e2.id : e1 === e2;
    }

  onCheckChange(event: any, formField: string) {
    // console.log(event);
    // const control = <FormArray>this.form.get(formField);
    const control = this.form.get(formField) as FormArray;

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

  async fillEditForm() {
    this.msgService.showLoading();
    this.database.getImovelById(this.id).then(((resp: any) => {
      if (resp === undefined) {
        this.msgService.hideLoading();
        this.msgService.messageAlert('Houve um erro ao carregar seu imóvel, tente novamente mais tarde.', '', 'Atenção');
        this.router.navigate(['/home']);
        return;
      }

      for(const key in resp.form){
        if((['_id', '_rev', 'criado', 'entrevistas', 'poligonos', 'statusEnvio']).includes(key)) {continue;}
        this.f[key].setValue(resp.form[key]);
      }

      if(this.form.value.municipio.codigo !== '0000000'){
        const cities = this.geoData.mostrarMunicipio(this.form.value.uf);
        this.settlementList = cities.filter(city => city.codigo === this.form.value.municipio.codigo)[0].assentamento;
      };

      this.msgService.hideLoading();
      console.log(this.form.value);
    })).catch((err) => {
      this.msgService.hideLoading();
      this.msgService.messageAlert('Houve um erro ao carregar seu imóvel, tente novamente mais tarde.', '', 'Atenção');
      this.router.navigate(['/home']);
    });
  }

  async faq(){
    const modal = await this.modalController.create({
      component: FaqPage,
      componentProps: {
        tela: 'imovelFormulario',
      }
    });

    await modal.present();
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
