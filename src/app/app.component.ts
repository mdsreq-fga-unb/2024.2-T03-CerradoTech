import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Página Inicial', url: '/home', icon: 'home' },
    { title: 'Meus Imóveis', url: '/imovel-lista', icon: 'compass', queryParams: 'meus-imoveis' },
    { title: 'Monitoramento', url: '/imovel-lista', icon: 'locate', queryParams: 'monitoramento' },
    // { title: 'Entrevistas', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Catálogo de espécies', url: '/catalogo-especies', icon: 'leaf' },
    { title: 'Localidades salvas', url: '/minhas-localizacoes', icon: 'map' },
    { title: 'Minha conta', url: '/my-account', icon: 'person' },
    { title: 'Sair', url: '/my-account', icon: 'log-out' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private screenOrientation: ScreenOrientation) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
}
