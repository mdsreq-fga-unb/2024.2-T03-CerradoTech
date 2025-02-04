/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { MessageService } from '@app/services/message.service';
import { NetworkService, ConnectionStatus } from '@services/network.service';
import { Parcela } from '@lib/imovel/Parcela.class';
import { ParcelaContent } from '@lib/imovel/ParcelaContent';
import { ModalController } from '@ionic/angular';
import { FaqPage } from '@app/modals/faq/faq.page';

@Component({
  selector: 'app-parcela-monitoramento',
  templateUrl: './parcela-monitoramento.page.html',
  styleUrls: ['./parcela-monitoramento.page.scss'],
})
export class ParcelaMonitoramentoPage implements OnInit {

  idImovel: any;
  idPoligono: any;
  listaMonitoramento: any;
  poligono: any;
  listaPermanentes: any;
  listaParcelas: any;
  qtdParcelas: number;
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
    this.listaMonitoramento = [];
    this.loadPage();
  }

  async loadPage() {
    const self = this;
    self.msgService.showLoading();
    self.listaMonitoramento = [];
    self.database.getPoligonoById(self.idImovel, self.idPoligono).then(((resp: any) => {
      console.log(resp);
      self.poligono = resp.data;
      self.statusEnvio = resp.statusEnvio;
      self.qtdParcelas = self.poligono.quantidadeParcelas;
      self.contarMonitoramento();
      // this.msgService.hideLoading();
    })).catch((error => {
      self.msgService.hideLoading();
      console.log(error);
      if (error.status === 404) {
        self.msgService.messageAlert('Houve um erro ao carregar seu polígono. Por favor tente novamente mais tarde!', '', 'Atenção');
        self.router.navigate(['/home']);
      }
    }));
  }

  /**
   * Cria um novo ano de monitoramento
   */
   public novoMonitoramento() {
    const self = this;

    const title = 'Selecione o ano de monitoramento';
    const inputs = [];
    //Apresenta a modal para selecionar o ano do monitoramento
    for (const ano of self.suporte.anoDoMonitoramento) {
      inputs.push({
        type: 'radio',
        label: ano.label,
        value: ano.id.toString()
      });
    }
    const buttons = [
      {
        text: 'Cancelar',
      },
      {
        text: 'Confirmar',
        handler: ano => {
          //Verifica se o ano selecionado já existe
          const existeMonitoramento = self.listaMonitoramento.filter((monitoramento) => {
            if(monitoramento.ano === ano) {return monitoramento;}
          });
          if (existeMonitoramento.length === 0) {
            //Método recursivo que cria as parcelas do ano selecionado
            self.criarParcelas(ano);
          }
          else {self.msgService.messageAlert('Já existe um monitoramento referente ao ano selecionado!');}
        }
      }
    ];

    this.msgService.messageAlert(title, buttons, '', '', inputs);
  }

  // /**
  //  * Deleta um ano de monitoramento (Exclui todas as parcelas que pertencem a aquele ano)
  //  *
  //  * @param ano
  //  */
   public deletarMsg(ano: number) {
    const self = this;
    const msg = `Deseja realmente excluir todo seu monitoramento do ano ${ano}?`;
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
            self.msgService.messageAlert('Você precisa estar conectado a internet para deletar este ano de monitoramento.');
          } else if (self.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online && self.statusEnvio.id !== 0) {
            self.database.deleteRemoteMonitoramento(this.idImovel, self.poligono._id, ano, self.statusEnvio.id)
              .subscribe(resp => {
                console.log(resp);
                if (resp?.ok) {
                  self.database.excluirMonitoramento(this.idImovel, self.poligono._id, ano).then((res) => {
                    console.log(res);
                    self.msgService.hideLoading();
                    self.msgService.messageAlert('Seu ano de monitoramento foi excluído com sucesso');
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
            self.database.excluirMonitoramento(this.idImovel, self.poligono._id, ano).then((res) => {
              console.log(res);
              self.msgService.hideLoading();
              self.msgService.messageAlert('Seu ano de monitoramento foi excluído com sucesso');
              self.loadPage();
            }).catch((error) =>{
              console.log(error);
              self.msgService.hideLoading();
            });
          }
        }
        // handler: () => {
          //Caso a parcela a ser excluída tenha alguma foto enviada para o servidor, o usuário precisa de conexão com a internet para que seja possível excluir a mesma
          // self.verificarFotoRemoto(ano).then((res) => {
          //   if (!res) {
          //     self.msgService.showLoading();
          //     self.database.excluirMonitoramento(this.idImovel, self.poligono._id, ano).then(() => {
          //       self.msgService.hideLoading();
          //       self.msgService.messageAlert('Monitoramento excluído com sucesso.');
          //       self.loadPage();
          //     }).catch(() =>{
          //       this.msgService.messageAlert('Houve um erro ao excluir seu monitoramento.', false, 'Atenção');
          //     });
          //   } else {
          //     console.log('to do');
              // self.database.verificarConexao().then(() => {
              //   self.msgService.showLoading();
              //   self.database.excluirMonitoramento(self.poligono.imovelId, self.poligono._id, ano).then(() => {
              //     self.msgService.hideLoading();
              //     self.msgService.showMessage('Monitoramento excluído com sucesso.');
              //     self.loadPage();
              //   }).catch(() =>{
              //     this.msgService.messageAlert('Houve um erro ao excluir seu monitoramento.', false, 'Atenção');
              //   });
              // }).catch(() =>{
              //   self.msgService.messageAlert('Você precisa de conexão com a internet para continuar essa operação.', false, 'Atenção');
              // });
            // }
        //   });
        // },
      }
    ];
    this.msgService.messageAlert(msg, buttons, title);
  }

  async faq(){
    const modal = await this.modalController.create({
      component: FaqPage,
      componentProps: {
        tela: 'parcelaMonitoramento',
      }
    });

    await modal.present();
  }

  /**
   * Método recursivo para criar as parcelas do monitoramento
   *
   * @param ano do monitoramento
   * @param contador variável de controle
   * @param especial Flag que indica se a parcela é especial ou não (Contenha apenas cobertura da vegetação e densidade de espécies)
   */
  private async criarParcelas(ano: string) {
    const self = this;
    let parcela;
    const listaParcelas = [];
    const especial = false;
    self.msgService.showLoading();

    for(let contador = 0; contador < self.qtdParcelas; contador++){

      //Caso o polígono seja do tipo 3 a parcela deverá se chamar linha
      const nome = (self.poligono.tipo < 3) ? `Parcela ${contador+1}` : `Linha ${contador+1}`;

      //Verifica se em anos anteriores a parcela a ser criada foi marcada como permanente
      const permanente = await this.verificarParcelaPermanente(ano, nome);

      //Caso o polígono seja do tipo 1 ou 2 cria-se uma parcela normal
      if (self.poligono.tipo < 3) {parcela = new Parcela(nome, ano, especial, permanente);}
      //Caso o polígono seja do tipo 3 e a parcela não seja do tipo especial, cria-se a parcela normalmente
      else if (self.poligono.tipo === 3 && !especial) {parcela = new Parcela(nome, ano, especial, { resp: false, coordenada: [] });}

      listaParcelas.push(parcela.dados);
    }

    if(self.poligono.tipo === 3 && self.poligono.formacaoVegetal.label !== 'Campestre'){
      parcela = new Parcela(`Densidade de indivíduos e espécies`, ano, true, { resp: false, coordenada: [] });
      listaParcelas.push(parcela.dados);
    }

    await self.database.salvarMonitoramento(this.idImovel, this.idPoligono, listaParcelas).then(() =>{
      self.msgService.hideLoading();
      self.loadPage();
    });
  }

  /**
   * Verifica se a parcela a ser criada foi marcada em anos anteriores como permanente
   *
   * @param ano do monitoramento
   * @param nome da parcela
   * @returns Json contendo a resposta se é permanente ou não e caso true informa a coordenada da parcela
   */
   private async verificarParcelaPermanente(ano: string, nome: string) {
    if (+ano - 1 >= 0) {
      this.listaPermanentes = this.listaParcelas.filter((parcela) => +parcela.anoMonitoramento === +ano - 1 && parcela.parcelaPermanente && parcela.numeroParcela === nome);
      if (this.listaPermanentes.length > 0) {return { resp: true, coordenada: {latitude: this.listaPermanentes[0].latitude, longitude: this.listaPermanentes[0].longitude} };}

    }
    return { resp: false, coordenada: [] };
  }

  /**
   * Contabiliza os monitoramentos feitos
   */
   private contarMonitoramento() {
    const self = this;

    self.listaParcelas = Object.values(this.poligono.parcelas);

    //Verifica os anos de monitoramento registrados nas parcelas
    let anos = self.listaParcelas.filter(
      (thing, i, arr) => arr.findIndex(t => t.anoMonitoramento === thing.anoMonitoramento) === i);
    anos = anos.map((value) => value.anoMonitoramento);

    //Conta quantas parcelas existem em cada monitoramento
    for (const ano of anos) {
      self.listaMonitoramento.push({
        ano,
        qtdParcelas: self.listaParcelas.filter((parcela) => (parcela.anoMonitoramento === ano && !parcela.especial)).length,
      });
    }
    self.msgService.hideLoading();
  }



  private verificarFotoRemoto(ano: any) {
    return new Promise<boolean>((resolve) => {
      const parcelasValues = Object.values(this.poligono.parcelas);
      const contemFotoRemoto = parcelasValues.filter((p: any) => p.fotoRemoto !== '');
      if (contemFotoRemoto.length > 0) {resolve(true);}
      else {resolve(false);}
    });
  }



}
