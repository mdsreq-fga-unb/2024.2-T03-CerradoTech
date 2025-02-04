/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { FormType } from '@lib/form/Form.enum';
import { MessageService } from '@app/services/message.service';
import { ModalController } from '@ionic/angular';
import { NetworkService, ConnectionStatus } from '@services/network.service';
import { FaqPage } from '@app/modals/faq/faq.page';

@Component({
  selector: 'app-socioprodutivo-lista',
  templateUrl: './socioprodutivo-lista.page.html',
  styleUrls: ['./socioprodutivo-lista.page.scss'],
})
export class SocioprodutivoListaPage {

  idImovel: string;
  entrevistaList: any;
  entrevistasKeys: any;
  statusEnvio: any;

  constructor(
    private router: Router,
    private database: DatabaseService,
    private msgService: MessageService,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private networkService: NetworkService,
  ) {
    this.entrevistaList = [];
    this.entrevistasKeys = [];
  }

  async ionViewWillEnter(){
    await this.loadPage();
  }

  public async loadPage(){
    const self = this;
    self.msgService.showLoading();
    this.idImovel = this.route.snapshot.params.id;
    this.entrevistaList = [];
    this.entrevistasKeys = [];
    this.database.getImovelById(this.idImovel).then(((resp: any) => {
      this.statusEnvio = resp.statusEnvio;
      this.entrevistaList = Object.values(resp.entrevistas);
      this.entrevistasKeys = Object.values(this.entrevistaList);
      self.msgService.hideLoading();
    })).catch((error => {
      console.log(error);
      self.msgService.hideLoading();
    }));
  }

  public deletar(idSocioprodutivo: any) {
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
            self.msgService.messageAlert('Você precisa estar conectado a internet para deletar este questionário.');
          } else if (self.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online && self.statusEnvio.id !== 0) {
            self.database.deleteRemoteSocioprodutivo(this.idImovel, idSocioprodutivo, self.statusEnvio.id)
              .subscribe(resp => {
                console.log(resp);
                if (resp?.ok) {
                  self.database.deleteSocioprodutivo(this.idImovel, idSocioprodutivo).then((res) => {
                    console.log(res);
                    self.msgService.hideLoading();
                    self.msgService.messageAlert('Seu questionário foi excluído com sucesso');
                    self.loadPage();
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
            self.database.deleteSocioprodutivo(this.idImovel, idSocioprodutivo._id).then((res) => {
              console.log(res);
              self.msgService.hideLoading();
              self.msgService.messageAlert('Seu questionário foi excluído com sucesso');
              self.loadPage();
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

  async faq(){
    const modal = await this.modalController.create({
      component: FaqPage,
      componentProps: {
        tela: 'poligonoLista',
      }
    });

    await modal.present();
  }

}
