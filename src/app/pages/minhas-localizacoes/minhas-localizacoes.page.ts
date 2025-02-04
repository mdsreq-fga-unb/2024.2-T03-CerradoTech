/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit } from '@angular/core';
import { MessageService } from '@app/services/message.service';
import { NetworkService, ConnectionStatus } from '@services/network.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import { FaqPage } from '@app/modals/faq/faq.page';
import { MapPage } from '@app/modals/map/map.page';
import { DatabaseService } from '@app/services/database.service';
import { MyCoords, Coord } from '@lib/user/Coordenadas.class';
import { OriginMap } from '@lib/imovel/MapOrigin';
const longTime = 50000;
@Component({
  selector: 'app-minhas-localizacoes',
  templateUrl: './minhas-localizacoes.page.html',
  styleUrls: ['./minhas-localizacoes.page.scss'],
})
export class MinhasLocalizacoesPage implements OnInit {

  public coords: Array<Coord>;
  constructor(
    private msgService: MessageService,
    private geolocation: Geolocation,
    private modalController: ModalController,
    private database: DatabaseService,
    private networkService: NetworkService
  ) { }

  ngOnInit() {
    this.database.getCoords().then((resp: MyCoords) => {
      this.coords = resp.coords;
    });
  }

  public deleteLocation(id: string) {
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
          self.database.deleteCoord(id).then((resp: string) => {
            self.msgService.hideLoading();
            self.msgService.messageAlert(resp);
            self.ngOnInit();
          }).catch((error: string) => {
            console.log(error);
            self.msgService.hideLoading();
            self.msgService.messageAlert(error);
          });
        }
      }
    ];

    self.msgService.messageAlert('Deseja realmente excluir esta coordenada?', customButtons);
  }

  async openMap(coord?: Coord) {
    const self = this;
    if (self.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      let tempLat: any;
      let tempLong: any;
      let hasPoint: boolean;
      let name: string;
      this.msgService.showLoading();
      this.geolocation.getCurrentPosition({ timeout: 5000, enableHighAccuracy: true, maximumAge: longTime }).then(async (resp) => {
        if (!coord) {
          tempLat = resp.coords.latitude;
          tempLong = resp.coords.longitude;
          hasPoint = false;
          name = '';
        } else {
          tempLat = coord.latitude;
          tempLong = coord.longitude;
          hasPoint = true;
          name = coord.name;
        }



        const modal = await this.modalController.create({
          component: MapPage,
          cssClass: 'my-custom-class',
          componentProps: {
            latitude: tempLat,
            longitude: tempLong,
            hasPoint,
            origin: OriginMap.LOCS_SALVAS,
            name
          }
        });

        modal.onDidDismiss().then((resp) => {
          // console.log(resp);
          if (resp.data.hasData) {
            delete resp.data.hasData;
            if (!coord) {
              this.saveLocation(resp.data);
            } else {
              this.editLocation(resp.data, coord.id);
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
      this.msgService.messageAlert('Você precisa estar ONLINE para cadastrar uma nova localidade.');
    }

  }

  async faq(){
    const modal = await this.modalController.create({
      component: FaqPage,
      componentProps: {
        tela: 'minhasLocalidades',
      }
    });

    await modal.present();
  }

  private saveLocation(coords) {
    // console.log(coords);
    this.msgService.showLoading();
    this.database.saveNewCoord(coords).then((resp: string) => {
      this.msgService.hideLoading();
      this.msgService.messageAlert(resp);
      this.ngOnInit();
    }).catch((error: string) => {
      console.log(error);
      this.msgService.hideLoading();
      this.msgService.messageAlert(error);
    });
  }

  private editLocation(newCoord, id) {
    this.msgService.showLoading();
    this.database.editCoord(newCoord, id).then((resp: string) => {
      this.msgService.hideLoading();
      this.msgService.messageAlert(resp);
      this.ngOnInit();
    }).catch((error: string) => {
      console.log(error);
      this.msgService.hideLoading();
      this.msgService.messageAlert(error);
    });
  }

}
