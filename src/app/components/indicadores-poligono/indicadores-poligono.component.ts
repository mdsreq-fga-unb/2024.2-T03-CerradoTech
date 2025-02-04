/* eslint-disable @angular-eslint/no-input-rename */
import { Component, AfterViewInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { EstatisticasModelo } from '@lib/utils/estatisticas';

@Component({
  selector: 'app-indicadores-poligono',
  templateUrl: './indicadores-poligono.component.html',
  styleUrls: ['./indicadores-poligono.component.scss'],
})
export class IndicadoresPoligonoComponent implements AfterViewInit, OnChanges {

  @Input('estatistica') dadosParcela: any;
  @Input('vegetacao') vegetacao: any;

  public estatisticas: any;

  constructor() {
    this.estatisticas = new EstatisticasModelo().estatistica;
    console.log(this.vegetacao);
  }

  ngAfterViewInit(){
    console.log(this.dadosParcela);
    this.estatisticas = this.dadosParcela;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes); // here you will get the data from parent once the input param is change
    this.estatisticas = changes.dadosParcela.currentValue;
    this.vegetacao = changes.vegetacao.currentValue;
  }

}
