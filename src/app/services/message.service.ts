import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  isLoading = false;

  loading: HTMLIonLoadingElement;

  constructor(public alertController: AlertController, public loadingController: LoadingController,) { }


  public async messageAlert(msg: string, customButtonsText?: any, header?: string, subHeader?: string, inputs?: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: msg,

    });
    if (header) { alert.header = header; }
    if (subHeader) { alert.subHeader = subHeader; }
    if(inputs) { alert.inputs = inputs; }
    if (!customButtonsText) { alert.buttons = ['OK']; }
    else { alert.buttons = customButtonsText; }
    await alert.present();
  }

  async showLoading(message?: string) {
    this.isLoading = true;
    this.loadingController.create({
      message: message ? message : 'Aguarde...'
    }).then(loader => {
      loader.present().then(() => {
        if (!this.isLoading) {
          loader.dismiss();
        }
      });
    });
  }

  async hideLoading() {
    this.isLoading = false;
    this.loadingController.getTop().then(loader => {
      if (loader) {
        loader.dismiss();
      }
    });
  }

}
