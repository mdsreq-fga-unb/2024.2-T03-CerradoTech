/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, IonSlides, LoadingController } from '@ionic/angular';

import { PoligonoContent } from '@lib/imovel/Poligono.class';
import { GeoDataService } from '@services/geo-data.service';
import { DatabaseService } from '@services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewChild } from '@angular/core';

import { FormType } from '@lib/form/Form.enum';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapPage } from '@app/modals/map/map.page';
import { MessageService } from '@app/services/message.service';
import { Subscription } from 'rxjs';
import { NetworkService, ConnectionStatus } from '@services/network.service';
import { MyCoords, Coord } from '@lib/User/Coordenadas.class';
import { Location } from '@angular/common';
import { OriginMap } from '@lib/imovel/MapOrigin';

import { PoligonoFormUF } from '@lib/form/PoligonoUF';


const longTime = 10000000000000000000;

enum FormArrayNames {
  FUNCAORECOMPOSICAO = 'funcaoRecomposicao',
}

@Component({
  selector: 'app-df',
  templateUrl: './df.component.html',
  styleUrls: ['./df.component.scss'],
})
export class PoligonoDFComponent implements OnInit {

  @Output() salvouFormularioCorretamente = new EventEmitter<boolean>();

  @ViewChild(IonSlides) slides: IonSlides;

  public form: FormGroup;
  public isCreateMode: boolean;
  public idImovel: string;
  public idPoligono: string;
  public slideOpts = { autoHeight: true };
  public maxPage = 5;
  public myCoords: Array<Coord>;
  public originMap: any;
  public customMonthNames = ['Janeiro', 'Fevereiro', 'Mar\u00e7o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  public funcaoRecomposicao: any;

  constructor(
    private fb: FormBuilder,
    private geoData: GeoDataService,
    public suporte: PoligonoContent,
    private database: DatabaseService,
    private route: ActivatedRoute,
    private router: Router,
    private geolocation: Geolocation,
    private modalController: ModalController,
    private msgService: MessageService,
    public networkService: NetworkService,
    private location: Location,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.idImovel = this.route.snapshot.params.idImovel;
    this.idPoligono = this.route.snapshot.params.idPoligono;
    this.isCreateMode = !this.idPoligono;
    this.originMap = OriginMap;
    const formQuestions = new PoligonoFormUF(this.fb);
    this.form = formQuestions.chooseForm('DF');
    this.updateSaveState(false);

    if (!this.isCreateMode) {
      this.fillEditForm();
    }
    this.funcaoRecomposicao = this.suporte.funcaoRecomposicao;
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  teste() {
    console.log(this.suporte.fitofisionomia);
    console.log(this.f.formacaoVegetal.value.label);
    console.log(this.suporte.fitofisionomia[this.f.formacaoVegetal.value.label]);
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

  async getGeolocation() {
    this.msgService.showLoading();
    this.geolocation.getCurrentPosition({ timeout: 5000, enableHighAccuracy: true, maximumAge: longTime }).then((resp) => {
      this.f.latitude.setValue(resp.coords.latitude);
      this.f.longitude.setValue(resp.coords.longitude);
      this.msgService.hideLoading();
    }).catch((error) => {
      console.log('Error getting location', error);
      this.msgService.messageAlert('Atenção! Houve um erro ao coletar sua localização, verifique se o aplicativo tem permissão para usar seu GPS e se ele estar funcionando corretamente!');
      this.msgService.hideLoading();
    });

  }

  async presentModal(connection?: string, origin?: any) {
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
            draw: this.f.areaPontos.value,
            origin,
            offline: false
          }
        });

        modal.onDidDismiss().then((resp) => {
          console.log(resp);
          if (resp.data.hasData && origin === OriginMap.POLIGONO_LOC) {
            this.f.latitude.setValue(resp.data.latitude);
            this.f.longitude.setValue(resp.data.longitude);
            if (connection === 'offline') {
              this.f.gpsOuMapa.setValue('mapa');
            }
          } else if (resp.data.hasData && origin === OriginMap.POLIGONO_DESENHO) {
            this.f.areaValor.setValue(resp.data.areaValor);
            this.f.areaPontos.setValue(resp.data.areaPontos);
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
        const alert = await this.alertController.create({
          cssClass: '',
          header: 'Você está offline! Escolha uma localidade previamente cadastrada',
          inputs,
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
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
                    origin,
                    draw: this.f.areaPontos.value,
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
            }
          ]
        });

        await alert.present();
      });
    }
  }

  public next() {
    this.slides.slideNext();
  }

  public prev() {
    this.slides.slidePrev();
  }

  public async submit() {
    const loading = await this.loadingController.create();
    await loading.present();
    const area = this.geoData.converterAreaString(this.form.value.areaValor);
    const tipo = this.suporte.tipoPoligono(+area);
    this.form.controls.tipo.setValue(tipo);
    if (+area === 0.0000) { this.form.controls.quantidadeParcelas.setValue(0); }
    else if (tipo === 1 || tipo === 3) { this.form.controls.quantidadeParcelas.setValue(5); }
    else if (tipo === 2) { this.form.controls.quantidadeParcelas.setValue(4 + Math.ceil(+area)); }

    this.database.salvarFormulario(FormType.POLIGONO, this.form.value, this.isCreateMode, this.idImovel).then(((resp: string) => {
      this.updateSaveState(true);
      console.log(resp);
      loading.dismiss();
      this.msgService.messageAlert(resp);
      this.location.back();

    })).catch((error => {
      loading.dismiss();
      console.log(`erro: ${error}`);
      this.msgService.messageAlert('Atenção: Houve um erro ao salvar seu polígono.');
    }));
  }

  updateSaveState(state: boolean){
    this.salvouFormularioCorretamente.emit(state);
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

      if (formField === 'funcaoRecomposicao') {
        this.funcaoRecomposicao.forEach(item => {
          if (item.value === element) { item.isChecked = true; }
        });
      }
    });
    // console.log(this.form.value)
  }

  private async fillEditForm() {
    this.msgService.showLoading();
    this.database.getPoligonoById(this.idImovel, this.idPoligono).then(((resp: any) => {
      if (resp.data === undefined) {
        this.msgService.hideLoading();
        this.msgService.messageAlert('Houve um erro ao carregar seu polígono, tente novamente mais tarde.', '', 'Atenção');
        this.router.navigate(['/home']);
        return;
      }

      for (const key in resp.data) {
        if( key === 'funcaoRecomposicao') {this.fillCheck(resp.data.funcaoRecomposicao, 'funcaoRecomposicao');}
        else {this.f[key].setValue(resp.data[key]);}
      }

      this.msgService.hideLoading();
      console.log(this.form.value);
    })).catch((err) => {
      this.msgService.hideLoading();
      this.msgService.messageAlert('Houve um erro ao carregar seu polígono, tente novamente mais tarde.', '', 'Atenção');
      this.router.navigate(['/home']);
    });
  }

}
