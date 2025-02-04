/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { FormType } from '@lib/form/Form.enum';
import { MessageService } from '@app/services/message.service';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { NetworkService, ConnectionStatus } from '@services/network.service';
import { GeoDataService } from '@services/geo-data.service';
import { MapPage } from '@app/modals/map/map.page';
import { OriginMap } from '@lib/imovel/MapOrigin';
import { FaqPage } from '@app/modals/faq/faq.page';

@Component({
  selector: 'app-imovel-detalhe',
  templateUrl: './imovel-detalhe.page.html',
  styleUrls: ['./imovel-detalhe.page.scss'],
})
export class ImovelDetalhePage {

  public id: string;
  public imovel: any;
  public areaModulo: string;
  public color: any;
  originMap: typeof OriginMap;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private database: DatabaseService,
    private msgService: MessageService,
    private loadingController: LoadingController,
    private networkService: NetworkService,
    private alertController: AlertController,
    private geoData: GeoDataService,
    private modalController: ModalController
  ) {
    this.color = {
      verde:       '#00904C',
      verdeEscuro: '#007670',
      verdeClaro:  '#2CC47F',
      azulClaro:   '#0083EF',
      ciano:       '#00A2AD',
      vermelho:    '#FF4A05'
    };
  }

  public async ionViewDidEnter() {
    this.loadPage();
  }

  public deleteForm() {
    const self = this;
    const customButtons = [
      {
        text: 'Não',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Sim',
        handler: () => {
          self.msgService.showLoading();
          if (self.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline && self.imovel.statusEnvio.id !== 0) {
            self.msgService.hideLoading();
            self.msgService.messageAlert('Você precisa estar conectado a internet para deletar este imóvel.');
          } else if (self.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online && self.imovel.statusEnvio.id !== 0) {
            self.database.deleteRemoteForm(this.id)
              .subscribe(resp => {
                console.log(resp);
                if (resp?.ok) {
                  self.database.deleteImovel(this.id).then((res) => {
                    console.log(res);
                    self.msgService.hideLoading();
                    self.router.navigate(['/home']);
                    self.msgService.messageAlert(resp.msg);
                  }).catch((error) =>{
                    self.msgService.hideLoading();
                    self.msgService.messageAlert('Um erro inesperado aconteceu, por favor tente novamente mais tarde.');
                    console.log(error);
                  });

                } else {
                  self.msgService.hideLoading();
                  self.msgService.messageAlert('Um erro inesperado aconteceu ao deletar seus dados salvos, por favor tente novamente mais tarde.');
                  console.log(resp);
                }
              });
          } else if (self.imovel.statusEnvio.id === 0) {
            self.database.deleteImovel(this.id).then((res) => {
              console.log(res);
              self.msgService.hideLoading();
              self.router.navigate(['/home']);
            });
          }
        }
      }
    ];

    this.msgService.messageAlert('Deseja realmente excluir este imóvel?', customButtons);
  }

  async loadPage() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.database.getById(FormType.IMOVEL, this.id).then((resp => {
      console.log(resp);
      this.imovel = resp;
      this.areaModulo = (+this.geoData.converterAreaString(this.imovel.area) / this.imovel.moduloFiscal).toFixed(2);
      loading.dismiss();

      this.avisoUpload();
    })).catch((error => {
      loading.dismiss();
      console.log(error);
      if (error.status === 404) {
        this.router.navigate(['/home']);
      }
    }));
  }

  // /** Remove map when we have multiple map object */
  // ngOnDestroy() {
  //   if (this.hasCoords) {this.map.remove();}
  // }

  uploadImovel() {
    const self = this;
    if (self.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline && self.imovel.statusEnvio.id !== 1) {
      self.msgService.messageAlert('Você precisa estar conectado a internet para enviar este imóvel para a nuvem.');
    } else {
      if (self.imovel.statusEnvio.id === 0) {
        self.database.salvarFormulario(FormType.IMOVEL, self.imovel, false, self.imovel._id, true).then((resp: any) => {
          self.imovel._rev = resp._rev;
          self.database.uploadNewImovel(resp)
            .subscribe(resp => {
              console.log(resp);
              if (resp?.ok) {
                self.msgService.messageAlert(resp.msg);
                self.imovel.statusEnvio = { id: 1, nome: 'ENVIADO' };
                this.loadPage();
              } else {
                self.database.alterarStatus(self.imovel, { id: 3, nome: 'ERRO AO ENVIAR' });
              }
            });
        });
      } else if (self.imovel.statusEnvio.id === 2 || self.imovel.statusEnvio.id === 3 ) {
        self.database.salvarFormulario(FormType.IMOVEL, self.imovel, false, self.imovel._id, true).then((resp) => {
          self.database.uploadEditedForm(resp)
            .subscribe(resp => {
              console.log(resp);
              if (resp?.ok) {
                self.msgService.messageAlert(resp.msg);
                self.imovel.statusEnvio = { id: 1, nome: 'ENVIADO' };
                this.loadPage();
              } else {
                self.database.alterarStatus(self.imovel, { id: 3, nome: 'ERRO AO ENVIAR' });
              }
            });
        });
      }
    }
  }

  async verNoMapa(){
    const modal = await this.modalController.create({
      component: MapPage,
      cssClass: 'my-custom-class',
      componentProps: {
        latitude: this.imovel.latitude,
        longitude: this.imovel.longitude,
        hasPoint: true,
        origin: OriginMap.VISUALIZAR
      }
    });

    await modal.present();
  }

  async avisoUpload(){
    if(this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online && this.imovel.statusEnvio.id !== 1){
      const alert = await this.alertController.create({
        cssClass: '',
        header: 'Atenção',
        message: 'Você ainda não enviou este imóvel! Deseja enviar agora?',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Não enviar');
            }
          }, {
            text: 'Sim',
            handler: async () => {
              console.log('Confirm Ok');
              this.uploadImovel();
            }
          }
        ]
      });
      await alert.present();
    }
  }

  async faq(){
    const modal = await this.modalController.create({
      component: FaqPage,
      componentProps: {
        tela: 'imovelDetalhe',
      }
    });

    await modal.present();
  }


}
