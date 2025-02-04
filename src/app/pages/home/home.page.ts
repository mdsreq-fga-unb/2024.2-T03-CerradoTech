import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FaqPage } from '@app/modals/faq/faq.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router, private modalController: ModalController) { }

  ngOnInit() {
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async faq(){
    const modal = await this.modalController.create({
      component: FaqPage,
      componentProps: {
        tela: 'home',
      }
    });

    await modal.present();
  }

}
