/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { FormType } from '@lib/form/Form.enum';
import { MessageService } from '@app/services/message.service';
import { NetworkService, ConnectionStatus } from '@services/network.service';
import { Parcela } from '@lib/imovel/Parcela.class';
import { ParcelaContent } from '@lib/imovel/ParcelaContent';
import { ModalController } from '@ionic/angular';
import { MapPage } from '@app/modals/map/map.page';
import { ParcelaObservacaoPage } from '@app/modals/parcela-observacao/parcela-observacao.page';
import { OriginMap } from '@lib/imovel/MapOrigin';
import { FaqPage } from '@app/modals/faq/faq.page';

@Component({
  selector: 'app-parcela-lista',
  templateUrl: './parcela-lista.page.html',
  styleUrls: ['./parcela-lista.page.scss'],
})
export class ParcelaListaPage implements OnInit {
  idImovel: any;
  idPoligono: any;
  poligono: any;
  listaParcelas: any[];
  anoMonitoramento: any;
  qtdParcelas: any;
  originMap: typeof OriginMap;
  statusEnvio: any;

  constructor(
    public suporte: ParcelaContent,
    private route: ActivatedRoute,
    private router: Router,
    private database: DatabaseService,
    private msgService: MessageService,
    private modalController: ModalController,
    private networkService: NetworkService,

  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.idImovel = this.route.snapshot.params.idImovel;
    this.idPoligono = this.route.snapshot.params.idPoligono;
    this.anoMonitoramento = this.route.snapshot.params.ano;
    this.listaParcelas = [];
    this.loadPage();
  }

  async loadPage() {
    const self = this;
    this.msgService.showLoading();
    self.listaParcelas = [];
    this.database.getPoligonoById(this.idImovel, this.idPoligono).then(((resp: any) => {
      console.log(resp);
      this.poligono = resp.data;
      this.statusEnvio = resp.statusEnvio;
      this.qtdParcelas = this.poligono.quantidade_parcelas;
      self.msgService.showLoading();
      const parcelas = Object.values(this.poligono.parcelas);
      self.listaParcelas = parcelas.filter(
        (parcela: any) => parcela.anoMonitoramento === this.anoMonitoramento
      );
      self.listaParcelas.sort((a, b) => (a.numeroParcela > b.numeroParcela) ? 1 : ((b.numeroParcela > a.numeroParcela) ? -1 : 0));
      // console.log(self.listaParcelas);
      self.msgService.hideLoading();
      // this.msgService.hideLoading();
    })).catch((error => {
      this.msgService.hideLoading();
      console.log(error);
      if (error.status === 404) {
        this.msgService.messageAlert('Houve um erro ao carregar seu polígono. Por favor tente novamente mais tarde!', '', 'Atenção');
        this.router.navigate(['/home']);
      }
    }));
  }

  public async verObservacoes(texto) {
    const modal = await this.modalController.create({
      component: ParcelaObservacaoPage,
      componentProps: {
        texto,
        edit: false
      }
    });
    modal.present();
  }

  public async verNoMapa(latitude: any, longitude: any) {
    const modal = await this.modalController.create({
      component: MapPage,
      cssClass: 'my-custom-class',
      componentProps: {
        latitude,
        longitude,
        hasPoint: true,
        origin: OriginMap.VISUALIZAR
      }
    });

    await modal.present();
  }

  public novaParcelaModal() {
    const title = 'Nova parcela';
    const message = 'Digite o nome da nova parcela';
    const inputs = [
      {
        name: 'nome',
        placeholder: 'Nome'
      },
    ];
    const buttons = [
      {
        text: 'Cancelar',
      },
      {
        text: 'Salvar',
        handler: async data => {
          //data.nome
          this.msgService.showLoading();
          const nomeRepetido = await this.verificarNome(data.nome);
          if (!nomeRepetido) {
            const novaParcela = new Parcela(data.nome, this.anoMonitoramento, false, { resp: false, coordenada: [] });
            this.database.salvarParcela(this.idImovel, this.idPoligono, novaParcela.dados).then(() => {
              this.msgService.hideLoading();
              this.msgService.messageAlert('Você agora pode encontra-la em sua lista de parcelas.', false, 'Parcela criada com sucesso');
              this.loadPage();
            }).catch(() => {
              this.msgService.hideLoading();
              this.msgService.messageAlert('Houve um erro ao criar sua parcela. Tente novamente mais tarde.', false, 'Atenção');
            });
          } else {
            this.msgService.hideLoading();
            this.msgService.messageAlert('Já existe uma parcela com este nome no ano de monitoramento em tela.', false, 'Atenção');
          }

        }
      }
    ];

    this.msgService.messageAlert(message, buttons, title, '', inputs);
  }

  public async verificarNome(nome: string) {
    const listaNomesRepetidos = this.listaParcelas.filter((parcela) => parcela.numeroParcela.trim().toLowerCase() === nome.trim().toLowerCase());
    if (listaNomesRepetidos.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  // /**
  //  * Deleta um ano de monitoramento (Exclui todas as parcelas que pertencem a aquele ano)
  //  *
  //  * @param ano
  //  */
  public deletarMsg(idParcela: string) {
    const self = this;
    const msg = `Deseja realmente excluir esta parcela?`;
    const title = 'Atenção';
    const buttons = [
      {
        text: 'Não',
      },
      {
        text: 'Sim',
        handler: () => {
          self.msgService.showLoading();
          if (self.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline && self.statusEnvio.id !== 0) {
            self.msgService.hideLoading();
            self.msgService.messageAlert('Você precisa estar conectado a internet para deletar este polígono.');
          } else if (self.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online && self.statusEnvio.id !== 0) {
            self.database.deleteRemoteParcela(this.idImovel, this.poligono._id, idParcela, self.statusEnvio.id)
              .subscribe(resp => {
                console.log(resp);
                if (resp?.ok) {
                  self.database.excluirParcela(this.idImovel, self.poligono._id, idParcela).then((res) => {
                    console.log(res);
                    self.msgService.hideLoading();
                    self.msgService.messageAlert('Sua parcela foi excluída com sucesso');
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
              self.database.excluirParcela(this.idImovel, self.poligono._id, idParcela).then((res) => {
                console.log(res);
                self.msgService.hideLoading();
                self.msgService.messageAlert('Sua parcela foi excluída com sucesso');
                self.loadPage();
              }).catch((error) =>{
                console.log(error);
                self.msgService.hideLoading();
              });
            }
          }
          // //Caso a parcela a ser excluída tenha alguma foto enviada para o servidor, o usuário precisa de conexão com a internet para que seja possível excluir a mesma
          // self.verificarFotoRemoto(idParcela).then((res) => {
          //   if (!res) {
          //     self.msgService.showLoading();
          //     self.database.excluirParcela(this.idImovel, self.poligono._id, idParcela).then(() => {
          //       self.msgService.hideLoading();
          //       self.msgService.messageAlert('Parcela excluída com sucesso.');
          //       self.loadPage();
          //     }).catch(() => {
          //       this.msgService.messageAlert('Houve um erro ao excluir sua parcela.', false, 'Atenção');
          //     });
          //   } else {
          //     console.log('to do');
          //     // self.database.verificarConexao().then(() => {
          //     //   self.msgService.showLoading();
          //     //   self.database.excluirMonitoramento(self.poligono.imovelId, self.poligono._id, ano).then(() => {
          //     //     self.msgService.hideLoading();
          //     //     self.msgService.showMessage('Monitoramento excluído com sucesso.');
          //     //     self.loadPage();
          //     //   }).catch(() =>{
          //     //     this.msgService.messageAlert('Houve um erro ao excluir seu monitoramento.', false, 'Atenção');
          //     //   });
          //     // }).catch(() =>{
          //     //   self.msgService.messageAlert('Você precisa de conexão com a internet para continuar essa operação.', false, 'Atenção');
          //     // });
          //   }
          // });
        // },
      }
    ];
    this.msgService.messageAlert(msg, buttons, title);
  }

  async faq(){
    const modal = await this.modalController.create({
      component: FaqPage,
      componentProps: {
        tela: 'parcelaLista',
      }
    });

    await modal.present();
  }

  private verificarFotoRemoto(idParcela: any) {
    return new Promise<boolean>((resolve) => {
      const parcela = this.poligono.parcelas[idParcela];
      if (parcela.fotoRemoto !== '') { resolve(true); }
      else { resolve(false); }
    });
  }

}
