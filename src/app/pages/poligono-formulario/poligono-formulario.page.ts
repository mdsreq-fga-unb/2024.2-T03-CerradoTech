import { Component, OnInit } from '@angular/core';
import { isDeactivatable } from '@app/guards/leave-form.guard';
import { AlertController, ModalController } from '@ionic/angular';
import { FaqPage } from '@app/modals/faq/faq.page';

@Component({
  selector: 'app-poligono-formulario',
  templateUrl: './poligono-formulario.page.html',
  styleUrls: ['./poligono-formulario.page.scss'],
})
export class PoligonoFormularioPage implements OnInit, isDeactivatable {
  salvouFormularioCorretamente: boolean;

  constructor(private alertCtrl: AlertController, private modalController: ModalController) { }

  ngOnInit() {
    this.salvouFormularioCorretamente = false;
  }

  async canPageLeave(nextUrl?: string) {
    if (this.salvouFormularioCorretamente) {
      return true;
    }

    // if (nextUrl && !nextUrl.includes('home')) {
    //   return true;
    // }

    const alert = await this.alertCtrl.create({
      header: 'Deseja realmente sair desta página?',
      message: 'Todo seu trabalho que não foi salvo irá ser perdido.',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Sim',
          role: 'goBack',
          handler: () => {}
        }
      ]
    });

    await alert.present();

    const data = await alert.onDidDismiss();

    if (data.role === 'goBack') {
      return true;
    } else {
      return false;
    }
  }

  updateSaveState(state: boolean){
    this.salvouFormularioCorretamente = state;
  }

  async faq(){
    const modal = await this.modalController.create({
      component: FaqPage,
      componentProps: {
        tela: 'poligonoFormulario',
      }
    });

    await modal.present();
  }
}
