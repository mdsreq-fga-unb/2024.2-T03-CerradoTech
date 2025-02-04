/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { CatalogoEspeciesService } from '@services/catalogo-especies.service';
import { MessageService } from '@services/message.service';
import { FaqPage } from '@app/modals/faq/faq.page';

@Component({
  selector: 'app-catalogo-especies',
  templateUrl: './catalogo-especies.page.html',
  styleUrls: ['./catalogo-especies.page.scss'],
})
export class CatalogoEspeciesPage implements OnInit {
  public listaEspecies: any[];

  constructor(
    private msgService: MessageService,
    private catalogoService: CatalogoEspeciesService,
    private modalController: ModalController
  ) { }

  /**
   * Sempre ao entrar na página carrega a lista de espécies do usuário, salva em seu banco local
   */
  async ngOnInit() {
    this.listaEspecies = [];
    await this.catalogoService.getLista().then((listaEspecies: any) => {
      this.listaEspecies = listaEspecies;
    });
    console.log(this.listaEspecies);
  }

  /**
   * Cadastra nova espécie salvando-a no banco local do usuário
   */
  public novaEspecie() {
    const title = 'Nova espécie';
    const message = 'Digite o nome da nova espécie';
    const inputs = [
      {
        name: 'nome',
        placeholder: 'Nome'
      },
    ];
    const buttons = [
      {
        text: 'Cancelar',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Salvar',
        handler: data => {
          this.msgService.showLoading();
          this.catalogoService.salvar({
            _id: '',
            _rev: '',
            nome: data.nome
          }).then(async () => {
            this.msgService.hideLoading();
            this.msgService.messageAlert('Espécie cadastrada com sucesso.');
            await this.catalogoService.getLista().then((listaEspecies: any) => {
              this.listaEspecies = listaEspecies;
            });
          }).catch((error) => {
            this.msgService.hideLoading();
            this.msgService.messageAlert(error);
          });
        }
      }
    ];

    this.msgService.messageAlert(message, buttons, title, '', inputs);

  }

  /**
   * Edita a espécie selecionada pelo usuário
   *
   * @param especie elemento a ser editado, é composto por _id, _rev e nome
   */
  public editar(especie: { _id: string; _rev: string; nome: string }) {
    const title = 'Renomear';
    const message = 'Digite o novo nome da espécie:';
    const inputs = [
      {
        name: 'nome',
        placeholder: 'Nome',
        value: especie.nome,
      },
    ];
    const buttons = [
      {
        text: 'Cancelar',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Salvar',
        handler: data => {
          this.msgService.showLoading();

          //Salva a espécie
          this.catalogoService.salvar({
            _id: especie._id,
            _rev: especie._rev,
            nome: data.nome
          }).then(async () => {
            this.msgService.hideLoading();
            this.msgService.messageAlert('Espécie renomeada com sucesso.');

            //Recarrega a página
            await this.catalogoService.getLista().then((listaEspecies: any) => {
              this.listaEspecies = listaEspecies;
            });
          }).catch(() => {
            this.msgService.hideLoading();
            this.msgService.messageAlert('Não foi possível renomear esta espécie, por favor tente novamente mais tarde.');
          });
        }
      }
    ];
    this.msgService.messageAlert(message, buttons, title, '', inputs);
  }


  /**
   * Deleta a espécie selecionada pelo usuário
   *
   * @param especie elemento a ser deletado, é composto por _id, _rev e nome
   */
  public deletar(especie: { _id: string; _rev: string; nome: string }) {
    const title = 'Excluir Espécie';
    const message = 'Deseja realmente excluir esta espécie da sua lista? (Esta operação não irá alterar nenhum formulário de parcela)';
    const buttons = [
      {
        text: 'Não',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Sim',
        handler: () => {
          this.msgService.showLoading();
          this.catalogoService.excluir(especie).then(async () =>{
            this.msgService.hideLoading();
            this.msgService.messageAlert('Espécie removida com sucesso.');
            await this.catalogoService.getLista().then((listaEspecies: any) =>{
              this.listaEspecies = listaEspecies;
            });
          }).catch(() =>{
            this.msgService.hideLoading();
            this.msgService.messageAlert('Não foi possível excluir esta espécie, por favor tente novamente mais tarde.');
          });
        }
      }
    ];
    this.msgService.messageAlert(message, buttons, title, '');
  }

  async faq(){
    const modal = await this.modalController.create({
      component: FaqPage,
      componentProps: {
        tela: 'catalogoEspecies',
      }
    });

    await modal.present();
  }

}
