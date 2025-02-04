/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { FormType } from '@lib/form/Form.enum';
import { MessageService } from '@app/services/message.service';
import { ModalController } from '@ionic/angular';
import { MapPage } from '@app/modals/map/map.page';
import { OriginMap } from '@lib/imovel/MapOrigin';
import { NetworkService, ConnectionStatus } from '@services/network.service';
import { FaqPage } from '@app/modals/faq/faq.page';
@Component({
  selector: 'app-poligono-lista',
  templateUrl: './poligono-lista.page.html',
  styleUrls: ['./poligono-lista.page.scss'],
})
export class PoligonoListaPage {

  idImovel: string;
  poligonoList: any;
  poligonosKeys: any;
  color: { verde: string; verdeEscuro: string; verdeClaro: string; azulClaro: string; ciano: string; vermelho: string };
  originMap: typeof OriginMap;
  statusEnvio: any;
  ultimoAno: any;
  parcelasPoligono: any;
  monitoramentoRecente: any;

  constructor(
    private router: Router,
    private database: DatabaseService,
    private msgService: MessageService,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private networkService: NetworkService,
  ) {
    this.poligonoList = [];
    this.poligonosKeys = [];
    this.color = {
      verde: '#00904C',
      verdeEscuro: '#007670',
      verdeClaro: '#2CC47F',
      azulClaro: '#0083EF',
      ciano: '#00C9D6',
      vermelho: '#FF4A05'
    };
    console.log(this.color);
  }

  async ionViewWillEnter() {
    await this.loadPage();
  }

  public async loadPage() {
    const self = this;
    self.msgService.showLoading();
    this.idImovel = this.route.snapshot.params.id;
    this.poligonoList = [];
    this.poligonosKeys = [];
    this.database.getImovelById(this.idImovel).then(((resp: any) => {
      // this.poligonoList = resp.poligonos;
      this.statusEnvio = resp.statusEnvio;
      this.poligonoList = Object.values(resp.poligonos);
      this.poligonosKeys = Object.values(this.poligonoList);
      this.contarParcelas();
      // self.msgService.hideLoading();
    })).catch((error => {
      console.log(error);
      self.msgService.hideLoading();
    }));
  }

  async verNoMapa(poligono: any) {
    const modal = await this.modalController.create({
      component: MapPage,
      cssClass: 'my-custom-class',
      componentProps: {
        latitude: poligono.latitude,
        longitude: poligono.longitude,
        hasPoint: true,
        draw: poligono.areaPontos,
        origin: OriginMap.VISUALIZAR
      }
    });

    await modal.present();
  }

  public deletar(idPoligono: any) {
    const self = this;
    const customButtons = [
      {
        text: 'Não',
        role: 'cancel',
      }, {
        text: 'Sim',
        handler: () => {
          self.msgService.showLoading();
          if (self.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline && self.statusEnvio.id !== 0) {
            self.msgService.hideLoading();
            self.msgService.messageAlert('Você precisa estar conectado a internet para deletar este polígono.');
          } else if (self.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online && self.statusEnvio.id !== 0) {
            self.database.deleteRemotePoligono(this.idImovel, idPoligono, self.statusEnvio.id)
              .subscribe(resp => {
                console.log(resp);
                if (resp?.ok) {
                  self.database.deletePoligono(this.idImovel, idPoligono).then((res) => {
                    console.log(res);
                    self.msgService.hideLoading();
                    self.msgService.messageAlert('Seu polígono foi excluído com sucesso');
                    self.loadPage();
                  }).catch((error) => {
                    self.msgService.hideLoading();
                    self.msgService.messageAlert('Um erro inesperado aconteceu, por favor tente novamente mais tarde.');
                    console.log(error);
                  });
                } else {
                  self.msgService.hideLoading();
                }
              });
          } else if (self.statusEnvio.id === 0) {
            self.database.deletePoligono(this.idImovel, idPoligono._id).then((res) => {
              console.log(res);
              self.msgService.hideLoading();
              self.msgService.messageAlert('Seu polígono foi excluído com sucesso');
              self.loadPage();
            }).catch((error) => {
              console.log(error);
              self.msgService.hideLoading();
            });
          }
        }
      }
    ];

    this.msgService.messageAlert('Deseja realmente excluir este polígono?', customButtons, 'Atenção');
  }

  async faq() {
    const modal = await this.modalController.create({
      component: FaqPage,
      componentProps: {
        tela: 'poligonoLista',
      }
    });

    await modal.present();
  }

  /**
   * Recupera do banco local as parcelas associadas ao polígono em tela e passa os dados do último monitoramento realizado para que se calcule as estatísticas do polígono
   */
  public async contarParcelas() {
    const self = this;
    try {
      self.parcelasPoligono = {};
      self.ultimoAno = {};
      self.monitoramentoRecente = {};

      self.poligonoList.forEach(poligono => {
        self.ultimoAno[poligono._id] = -1;
        if (poligono?.parcelas) {
          self.parcelasPoligono[poligono._id] = Object.values(poligono.parcelas) || {};


          //Filtra os anos dos monitoramentos realizados no parcelas do poligono
          let anos = self.parcelasPoligono[poligono._id].filter(
            (thing, i, arr) => arr.findIndex(t => t.anoMonitoramento === thing.anoMonitoramento) === i);
          anos = anos.map((value) => value.anoMonitoramento);

          //Caso exista monitoramento calcula-se as estatísticas do mais recente
          if (anos.length > 0) {

            //último ano que foi realizado o monitoramnto
            self.ultimoAno[poligono._id] = anos.reduce((maiorAtual, antigo) => (maiorAtual > antigo) ? maiorAtual : antigo);

            self.monitoramentoRecente[poligono._id] = self.parcelasPoligono[poligono._id].filter((parcela) => (parcela.anoMonitoramento === self.ultimoAno[poligono._id]));
          }
        }

      });
      // console.log(this.monitoramento_recente);
      self.msgService.hideLoading();

    } catch (error) {
      self.msgService.hideLoading();
    }
  }

}
