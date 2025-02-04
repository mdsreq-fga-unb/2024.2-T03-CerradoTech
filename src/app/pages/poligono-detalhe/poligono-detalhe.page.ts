/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { FormType } from '@lib/form/Form.enum';
import { MessageService } from '@app/services/message.service';
import { NetworkService, ConnectionStatus } from '@services/network.service';
import { ModalController } from '@ionic/angular';
import { MapPage } from '@app/modals/map/map.page';
import { OriginMap } from '@lib/imovel/MapOrigin';
import { FaqPage } from '@app/modals/faq/faq.page';
import { EstatisticasModelo } from '@lib/utils/estatisticas';

@Component({
  selector: 'app-poligono-detalhe',
  templateUrl: './poligono-detalhe.page.html',
  styleUrls: ['./poligono-detalhe.page.scss'],
})
export class PoligonoDetalhePage {
  idImovel: any;
  idPoligono: any;
  poligono: any;
  statusEnvio: any;
  originMap: typeof OriginMap;
  ultimoAno: any;
  anos: any;
  estatisticas: any;
  formList: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private database: DatabaseService,
    private msgService: MessageService,
    private networkService: NetworkService,
    private modalController: ModalController
  ) { }

  ionViewDidEnter() {
    this.idImovel = this.route.snapshot.params.idImovel;
    this.idPoligono = this.route.snapshot.params.idPoligono;  
    this.loadPage();
  }

  async loadPage() {
    this.msgService.showLoading();
    this.database.getPoligonoById(this.idImovel, this.idPoligono).then(((resp: any) => {
      console.log(resp);
      this.validatePoligono(resp.data);
      this.statusEnvio = resp.statusEnvio;
      this.contarParcelas();
      this.msgService.hideLoading();
    })).catch((error => {
      this.msgService.hideLoading();
      console.log(error);
      if (error.status === 404) {
        this.msgService.messageAlert('Houve um erro ao carregar seu polígono. Por favor tente novamente mais tarde!', '', 'Atenção');
        this.router.navigate(['/home']);
      }
    }));
  }

  public deletar() {
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
          if (self.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline && self.statusEnvio.id !== 0) {
            self.msgService.hideLoading();
            self.msgService.messageAlert('Você precisa estar conectado a internet para deletar este polígono.');
          } else if (self.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online && self.statusEnvio.id !== 0) {
            self.database.deleteRemotePoligono(this.idImovel, this.idPoligono, self.statusEnvio.id)
              .subscribe(resp => {
                console.log(resp);
                if (resp?.ok) {
                  self.database.deletePoligono(this.idImovel, this.idPoligono).then((res) => {
                    console.log(res);
                    self.msgService.hideLoading();
                    self.msgService.messageAlert('Seu polígono foi excluído com sucesso');
                    self.router.navigate(['/home']);
                  }).catch((error) =>{
                    self.msgService.hideLoading();
                    self.msgService.messageAlert('Um erro inesperado aconteceu, por favor tente novamente mais tarde.');
                    console.log(error);
                  });

                } else {
                  self.msgService.hideLoading();
                }
              });
          } else if (self.statusEnvio.id === 0) {
            self.database.deletePoligono(this.idImovel, this.idPoligono).then((res) => {
              console.log(res);
              self.msgService.hideLoading();
              self.msgService.messageAlert('Seu polígono foi excluído com sucesso');
              self.router.navigate(['/home']);
            }).catch((error) =>{
              console.log(error);
              self.msgService.hideLoading();
            });
          }
        }
      }
    ];

    this.msgService.messageAlert('Deseja realmente excluir este polígono?', customButtons, 'Atenção');
  }

  async verNoMapa() {
    const modal = await this.modalController.create({
      component: MapPage,
      cssClass: 'my-custom-class',
      componentProps: {
        latitude: this.poligono.latitude,
        longitude: this.poligono.longitude,
        hasPoint: true,
        draw: this.poligono.areaPontos,
        origin: OriginMap.VISUALIZAR
      }
    });

    await modal.present();
  }

  async faq() {
    const modal = await this.modalController.create({
      component: FaqPage,
      componentProps: {
        tela: 'poligonoDetalhe',
      }
    });

    await modal.present();
  }

  /**
   * Recupera do banco local as parcelas associadas ao polígono em tela e passa os dados do último monitoramento realizado para que se calcule as estatísticas do polígono 
   */
  public async contarParcelas() {
    const self = this;
    self.ultimoAno = -1;
    //Recupera do banco local as parcelas associadas ao polígono em tela
    const listaParcelas = Object.values(this.poligono.parcelas);

    //Filtra os anos dos monitoramentos realizados no parcelas do poligono
    self.anos = listaParcelas.filter(
      (thing: any, i, arr: any) => arr.findIndex((t: any) => t.anoMonitoramento === thing.anoMonitoramento) === i);
    self.anos = self.anos.map((value) => value.anoMonitoramento);

    //Caso exista monitoramento calcula-se as estatísticas do mais recente
    if (self.anos.length > 0) {

      //último ano que foi realizado o monitoramnto
      self.ultimoAno = self.anos.reduce((maiorAtual, antigo) => (maiorAtual > antigo) ? maiorAtual : antigo);

      //Seleciona as parcelas do monitoramento mais recente
      const monitoramentoRecente = listaParcelas.filter((parcela: any) => parcela.anoMonitoramento === self.ultimoAno);

      //Calcula as estatísticas do último monitoramento
      const tempEstatisticas = new EstatisticasModelo();
      self.estatisticas = await tempEstatisticas.calcularEstatisticaTodasParcelas(monitoramentoRecente, self.poligono.tipo);
    }
  }

  public async validatePoligono(data: any){
    const temp = data;
    const strProperty = ['_id', 'versao', 'nomeCod', 'dataEntrevista', 'utilizacaoAnteriorOutro', 'coberturaAtualOutro', 'gpsOuMapa', 'desenhoOuCar', 'areaValor', 'funcaoRecomposicao_outro'];
    const objProperty = ['formacaoVegetal', 'fitofisionomia', 'tipoArea', 'classificacaoArea', 'utilizacaoAnterior', 'coberturaAtual', 'suspensaoImediata', 'necessarioCercar', 'possivelCercar', ];
    
    const dataValue = Object.values(temp);
    strProperty.forEach(elm => {
      if(temp[elm] === undefined) {temp[elm] = '';}
    });

    objProperty.forEach(elm => {
      if(temp[elm] === undefined) {temp[elm] = {id: -1, label: ''};}
    });

    this.poligono = temp;
  }

}
