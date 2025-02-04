import { Component, Input, OnInit } from '@angular/core';
import { ModalController, } from '@ionic/angular';
@Component({
  selector: 'app-parcela-observacao',
  templateUrl: './parcela-observacao.page.html',
  styleUrls: ['./parcela-observacao.page.scss'],
})
export class ParcelaObservacaoPage implements OnInit {
  @Input() texto: any;
  @Input() edit: boolean;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParcelaObservacaoModalPage');
  }

  public fechar(){
    this.modalCtrl.dismiss();
  }

  public confirmar(){
    this.modalCtrl.dismiss(this.texto);
  }

}
