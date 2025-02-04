/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

interface Assentamento {
  uf: string;
  mf: number;
  municipio: { codigo: string; nome: string };
  assentamento: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class GeoDataService {

  public cities: any;

  readonly uf = ['DF'];

  readonly municipios_e_assentamentos: Array<Assentamento> = [
    //DF
    { uf: 'DF', municipio: { nome: 'Brasilia', codigo: '2900355' }, mf: 5, assentamento: ['Rosely Nunes', 'Oziel Alves III', 'Patrícia Aparecida', 'Carlos Marighela', 'Renascer Palmares', '08 de março', 'OUTRO'] },
    { uf: 'DF', municipio: { nome: 'OUTRO', codigo: '0000000' }, mf: 0, assentamento: ['OUTRO'] },
    //CONTINUAR
  ];
  constructor() { }



  public converterAreaString(area: string) {
    if (area === '') {
      area = '0';
    } else {
      area = area.split('.').join('');
      area = area.replace(',', '.');
    }
    return area;
  }

  public converterAreaNumero2String(area: number) {
    const areaStr = area.toString();
    if (!areaStr.includes('.')) { return areaStr; }

    return areaStr.replace('.', ',');
  }

  public mostrarMunicipioAsync(estado: string, page?: number, size?: number, timeout = 1500): Observable<any> {
    return new Observable<any>(observer => {
      observer.next(this.mostrarMunicipio(estado, page, size));
      observer.complete();
    }).pipe(delay(timeout));
  }

  mostrarMunicipio(estado: string, page?: number, size?: number): any {
    switch (estado) {
      case 'DF':
        this.cities = [
          { nome: 'BRASÍLIA', codigo: '5300108', mf: 5, assentamento: ['Rosely Nunes', 'Oziel Alves III', 'Patrícia Aparecida', 'Carlos Marighela', 'Renascer Palmares', '08 de março', 'OUTRO'] },
          { nome: 'OUTRO', codigo: '0000000', mf: 0, assentamento: ['OUTRO'] },
        ];
        if (page && size) {
          this.cities = this.cities.slice((page - 1) * size, ((page - 1) * size) + size);
        };
        return this.cities;

      default:
        this.cities = [''];
        return this.cities;
    }
  }
}
