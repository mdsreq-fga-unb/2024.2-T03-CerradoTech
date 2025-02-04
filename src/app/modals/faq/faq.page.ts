import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FAQ } from '@lib/utils/faq';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  @Input() tela: any;
  listaPerguntas: any;

  constructor(private faq: FAQ, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.listaPerguntas = this.faq.duvidas[this.tela];
  }

  fechar(){
    this.modalCtrl.dismiss();
  }

}
