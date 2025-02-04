/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OriginMap } from '@lib/imovel/MapOrigin';
import * as Leaflet from 'leaflet';
import { icon, Marker } from 'leaflet';
// import 'leaflet/dist/images/marker-shadow.png';
// import 'leaflet/dist/images/marker-icon-2x.png';
// import 'leaflet/dist/images/marker-icon.png';
// import 'leaflet/dist/images/layers-2x.png';
// import 'leaflet/dist/images/layers.png';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import 'leaflet.tilelayer.pouchdbcached';
import { MessageService } from '@app/services/message.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as turf from '@turf/turf';
import { GeoDataService } from '@app/services/geo-data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @Input() latitude: any;
  @Input() longitude: any;
  @Input() hasPoint: boolean;
  @Input() origin: any;
  @Input() name: string;
  @Input() draw: any;
  @Input() offline: boolean;
  @Input() center: any;
  // map: Leaflet.Map;
  map: any;

  marker: {
    latitude: number;
    longitude: number;
  };

  titleMsg: string;
  titlePage: string;
  msg: string;
  buttons: any;
  inputs: { name: string; type: string; placeholder: string; value: string }[];
  constructor(private modalCtrl: ModalController, private msgService: MessageService, private geoData: GeoDataService) { }

  ngOnInit() {
    Leaflet.Icon.Default.imagePath = 'assets/map/';
    console.log(this.latitude);
    this.marker = {
      latitude: 0,
      longitude: 0,
    };

    if (this.origin === OriginMap.IMOVEL) { this.titlePage = 'Marque a localização do imóvel';}
    else if (this.origin === OriginMap.POLIGONO_LOC) {this.titlePage = 'Marque a localização do polígono'; }
    else if (this.origin === OriginMap.POLIGONO_DESENHO) {this.titlePage = 'Desenhe a área do seu polígono'; }
    else if (this.origin === OriginMap.LOCS_SALVAS) {this.titlePage = 'Informe uma localização'; }
    else if (this.origin === OriginMap.PARCELA) {this.titlePage = 'Marque a localização da sua parcela'; }
    else { this.titlePage = 'Localização'; }

    if (typeof this.draw == 'string') { this.draw = JSON.parse(this.draw); }
    else { this.draw = {}; }
  }

  async closeModal(hasData: boolean) {
    const self = this;
    let okCoords: any;
    if (([OriginMap.VISUALIZAR, OriginMap.VISUALIZAR_DESENHO]).includes(this.origin)){ this.modalCtrl.dismiss({ hasData: false }); return; }
    else if (([OriginMap.IMOVEL, OriginMap.POLIGONO_LOC, OriginMap.LOCS_SALVAS, OriginMap.PARCELA]).includes(this.origin)){ okCoords = self.coletarCoordenadas(); }
    else { okCoords = this.desenhoPoligonoArea(); }

    if (!hasData) {
      this.modalCtrl.dismiss({ hasData: false });
    } else if (okCoords) {
      if (this.origin === OriginMap.IMOVEL) {
        this.msg = `Confirma este ponto como sendo a localização do seu imóvel?<br><br><strong>Latitude:</strong> ${self.marker.latitude}<br><strong>Longitude:</strong> ${self.marker.longitude}`;
        this.titleMsg = `Localização do imóvel`;
        this.buttons = [{
          text: 'Não',
          role: 'cancel',
        }, {
          text: 'Sim',
          role: 'confirm',
          handler: () => {
            this.modalCtrl.dismiss({
              hasData,
              latitude: self.marker.latitude,
              longitude: self.marker.longitude,
            });
          }
        }];
      } else if (this.origin === OriginMap.POLIGONO_LOC) {
        this.msg = `Confirma este ponto como sendo a localização do seu polígono?<br><br><strong>Latitude:</strong> ${self.marker.latitude}<br><strong>Longitude:</strong> ${self.marker.longitude}`;
        this.titleMsg = `Localização do polígono`;
        this.buttons = [{
          text: 'Não',
          role: 'cancel',
        }, {
          text: 'Sim',
          handler: () => {
            this.modalCtrl.dismiss({
              hasData,
              latitude: self.marker.latitude,
              longitude: self.marker.longitude,
            });
          }
        }];
      } else if (this.origin === OriginMap.POLIGONO_DESENHO) {
        this.msg = `Confirma o desenho informado como sendo o desenho do polígono? A área calculada do desenho informado é de: <strong>${okCoords.areaValor} ha</strong>`;
        this.titleMsg = `Desenho do polígono`;
        this.buttons = [{
          text: 'Não',
          role: 'cancel',
        }, {
          text: 'Sim',
          handler: () => {
            this.modalCtrl.dismiss(okCoords);
          }
        }];
      } else if (this.origin === OriginMap.LOCS_SALVAS) {
        this.msg = `Informe o nome desta localidade e confirme a coordenada a ser salva:<br><br><strong>Latitude:</strong> ${self.marker.latitude}<br><strong>Longitude:</strong> ${self.marker.longitude}`;
        this.titleMsg = `Localidade`;
        this.inputs = [
          {
            name: 'name',
            type: 'text',
            placeholder: 'Informe o nome desta localidade',
            value: this.name,
          },
        ];
        this.buttons = [
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
              if(alertData.name !== ''){
                this.modalCtrl.dismiss({
                  hasData,
                  id: new Date().toISOString(),
                  latitude: self.marker.latitude,
                  longitude: self.marker.longitude,
                  name: alertData.name
                });
              } else {
                this.msgService.messageAlert('Você precisa informar um nome para esta localidade!');
              }
            }
          }
        ];
      } else if (this.origin === OriginMap.PARCELA) {
        this.msg = `Confirma este ponto como sendo a localização da sua parcela?<br><br><strong>Latitude:</strong> ${self.marker.latitude}<br><strong>Longitude:</strong> ${self.marker.longitude}`;
        this.titleMsg = `Localização da parcela`;
        this.buttons = [{
          text: 'Não',
          role: 'cancel',
        }, {
          text: 'Sim',
          role: 'confirm',
          handler: () => {
            this.modalCtrl.dismiss({
              hasData,
              latitude: self.marker.latitude,
              longitude: self.marker.longitude,
            });
          }
        }];
      }
      this.msgService.messageAlert(this.msg, this.buttons, this.titleMsg, '', this.inputs);
    } else {
      this.msg = 'Só é permitido uma marcação do tipo \'ponto\'. Após adicionar o ponto no mapa, certifique-se de clicar em \'Finalizar\' que aparece ao lado da caixa de seleção do marcador no canto superior esquerdo.';
      this.titleMsg = 'Atenção!';
      this.msgService.messageAlert(this.msg, '', this.titleMsg);
    }
  }

  ionViewDidEnter() {
    this.leafletMap();
  }

  leafletMap() {
    const iconRetinaUrl = 'assets/map/marker-icon-2x.png';
    const iconUrl = 'assets/map/marker-icon.png';
    const shadowUrl = 'assets/map/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    Marker.prototype.options.icon = iconDefault;

    // this.map = Leaflet.map('mapId').setView([28.644800, 77.216721], 5);
    if(!this.offline){
      this.map = Leaflet.map('mapId', {
        center: [this.latitude, this.longitude],
        zoom: 14,
        maxZoom: 17,
      });
    } else {
      this.map = Leaflet.map('mapId', {
        center: [this.center.latitude, this.center.longitude],
        zoom: 14,
        maxZoom: 17,
      });
    }

    Leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      crossOrigin: true,
    }).addTo(this.map);

    //Adiciona o pino no mapa
    if (this.hasPoint) {
      Leaflet.marker([this.latitude, this.longitude], { pmIgnore: false }).addTo(this.map);
    }


    //Adiciona a biblioteca de desenho PM no mapa
    if ( ([OriginMap.IMOVEL, OriginMap.POLIGONO_LOC, OriginMap.LOCS_SALVAS]).includes(this.origin)){
      this.map.pm.addControls({
        position: 'topleft',
        drawCircle: false,
        drawCircleMarker: false,
        drawPolyline: false,
        drawRectangle: false,
        drawPolygon: false,
        editMode: false,
        dragMode: true,
        rotateMode: false,
        cutPolygon: false,
      });
    } else if(this.origin === OriginMap.POLIGONO_DESENHO){
      this.map.pm.addControls({
        position: 'topleft',
        drawMarker: false,
        drawCircle: false,
        drawCircleMarker: false,
        drawPolyline: true,
        drawRectangle: false,
        cutPolygon: false,
        rotateMode: false,
      });
    }

    //Carrega o desenho do poligono
    if (Object.keys(this.draw).length > 0) {
      Leaflet.geoJSON(this.draw).addTo(this.map);
    }

    this.map.on('pm:create', e => {
      console.log(e);
    });

    const customTranslation = {
      actions: {
        cancel: 'Finalizar',
      },
    };

    this.map.pm.setLang('pt_br', customTranslation, 'pt_br');
    this.msgService.hideLoading();
  }

  /** Remove map when we have multiple map object */
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy() {
    this.map.remove();
  }

  /**
   * Verifica se foi adicionado apenas um objeto do tipo 'ponto' no mapa e salva a localização deste no formulário
   */
  public coletarCoordenadas(): boolean {
    const self = this;
    const collection = {
      type: 'FeatureCollection',
      features: []
    };
    const x = [];

    //Coleta os objetos inseridos no mapa usando a biblioteca pm
    self.map.eachLayer((layer: any) => {

      // const L = Leaflet;
      if (layer.pm) {
        const geojson = layer.toGeoJSON();
        collection.features.push(geojson);
      }

      x.push(layer);
    });
    console.log(collection);

    //Verifica se mais de um objeto foi inserido no mapa
    if (collection.features.length > 1) { return false; }

    //Verifica se não foi inserido nenhum objeto no mapa
    if (collection.features.length === 0) { return false; }

    //Verifica se o tipo do objeto inserido no mapa não é ponto
    if (collection.features[0].geometry.type !== 'Point') { return false; }

    //Caso exista apenas um ponto e que seja do tipo 'ponto' adiciona sua latitude e longitude no formulário
    self.marker.latitude = collection.features[0].geometry.coordinates[1];
    self.marker.longitude = collection.features[0].geometry.coordinates[0];
    return true;
  }

  public desenhoPoligonoArea(){
    const collection = {
      type: 'FeatureCollection',
      features: []
    };
    const x = [];

    this.map.eachLayer((layer) => {

      if (layer.pm) {
        const geojson = layer.toGeoJSON();
        collection.features.push(geojson);
      }

      x.push(layer);
    });
    console.log(collection);
    collection.features.forEach((value, index, object) => {
      if (value.type === 'FeatureCollection') {object.splice(index, 1);}
    });
    let area_turf = 0;
    let poligono_turf: any;
    for (const feature of collection.features) {
      if (feature.geometry !== undefined && feature.geometry.type !== 'Point') {
        poligono_turf = turf.polygon(feature.geometry.coordinates);
        area_turf += turf.area(poligono_turf) / 10000;
      }
    }

    area_turf = +area_turf.toFixed(4);

    const data = {
      hasData: true,
      areaValor: this.geoData.converterAreaNumero2String(area_turf),
      areaPontos: JSON.stringify(collection)
    };

    return data;
  }

}
