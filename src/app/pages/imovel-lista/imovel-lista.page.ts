import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '@services/database.service';

import { FormType } from '@lib/form/Form.enum';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { MessageService } from '@services/message.service';
import { FaqPage } from '@app/modals/faq/faq.page';

@Component({
  selector: 'app-imovel-lista',
  templateUrl: './imovel-lista.page.html',
  styleUrls: ['./imovel-lista.page.scss'],
})
export class ImovelListaPage implements OnInit {

  public imovelList: any;
  public associateData: any;
  public origin: string;
  public text: string;

  constructor(
    private database: DatabaseService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private loadingController: LoadingController,
    private msgService: MessageService,
    private modalController: ModalController,
  ) {}

  ngOnInit() {
    this.imovelList = [];
    this.text = '';
  }

  async ionViewWillEnter(){
    await this.loadPage();
  }

  public async loadPage(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.origin = this.route.snapshot.queryParamMap.get('param');
    if (this.origin === 'meus-imoveis'){
      this.text = 'Meus imóveis';
    } else if(this.origin === 'monitoramento'){
      this.text = 'Qual imóvel deseja monitorar?';
    } else if(this.origin === 'socioprodutivo'){
      this.text = 'Sobre qual imóvel deseja responder o questionário de diagnóstico?';
    };
    this.imovelList = [];
    this.associateData = [];
    this.database.getTodosFormularios(FormType.IMOVEL).then((resp => {
      this.imovelList = resp;
      this.imovelList.forEach(imovel => {
        this.associateData.push({ entrevista: Object.keys(imovel.entrevistas).length, poligono: Object.keys(imovel.poligonos).length});
      });
      loading.dismiss();
    })).catch((error => {
      console.log(error);
      loading.dismiss();
    }));
  }

  public navigateTo(id: string){
    if (this.origin === 'meus-imoveis'){
      this.router.navigate(['/imovel-detalhe', id]);
    } else if(this.origin === 'monitoramento'){
      this.router.navigate(['/poligono-lista', id]);
    } else if(this.origin === 'socioprodutivo'){
      this.router.navigate(['/socioprodutivo-lista', id]);
    }
  }

  public deleteImovel(id: string){
    this.database.deleteImovel(id);
  }

  async faq(){
    const modal = await this.modalController.create({
      component: FaqPage,
      componentProps: {
        tela: 'imovelLista',
      }
    });

    await modal.present();
  }

  public downloadRemoteForms(){
    const self = this;
    // self.msgService.showLoading();
    self.database.syncImoveis(this.authService.user.usuario);
    self.database.syncAux.subscribe( async (value: any) =>{
      self.msgService.hideLoading();
      if(!value) {self.msgService.messageAlert('Download realizado com sucesso.');}
      await self.loadPage();
    });
  }


}
