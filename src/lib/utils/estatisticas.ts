/* eslint-disable guard-for-in */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { ParcelaContent } from '@lib/imovel/ParcelaContent';

class Individuo {
    especie: string;
    regenerante: boolean;

    constructor() {
        this.especie = undefined;
        this.regenerante = undefined;
    }
};

@Injectable({
    providedIn: 'root'
})

export class EstatisticasModelo {
    private _estatistica;
    private parcelaInfo = new ParcelaContent();

    constructor() {
        this.estatistica = {
            cobertura: {
                exoticaPerene: 0,
                lenhosaNativa: 0,
                lenhosaTotal: 0,
                gramineasNativas: 0,
                gramineasExoticas: 0,
                vegetacaoNativa: 0,
                coberturaTotal: 0,
                naoInformado: 0,
            },
            densidade: {
                individuos: {
                    nativaReg: 0,
                },
                especies: {
                    total: []
                }
            }
        };
    }

    public get estatistica() {
        return this._estatistica;
    }

    public set estatistica(value) {
        this._estatistica = value;
    }

    public async calcularEstatisticaTodasParcelas(parcelas: any, tipoPoligono: number) {
        // const estatisticas = new EstatisticasModelo().estatistica;
        const categorias = ['cobertura', 'densidade'];
        const categoriasDensidade = ['especies', 'individuos'];

        for (const parcela of parcelas) {
          const denominadorCobertura = parcela.especial ? (parcelas.length - 1) : parcelas.length;
          const denominadorDensidade = parcela.especial ? 1 : parcelas.length;
          // if (tipoPoligono < 3 || (tipoPoligono === 3 && parcela.especial)) {
          const atual = this.calcularEstatisticaParcela(parcela, parcela.especial, tipoPoligono);
          for (const categoria of categorias) {
            if (categoria === 'cobertura') {
              for (const key in this._estatistica[categoria]) {
                this._estatistica[categoria][key] += atual[categoria][key] / denominadorCobertura;
              }
            } else {
              for (const catDens of categoriasDensidade) {
                for (const key in this._estatistica[categoria][catDens]) {
                  if(catDens === 'individuos') {this._estatistica[categoria][catDens][key] += 100*atual[categoria][catDens][key] / denominadorDensidade;}
                  if(catDens === 'especies'){
                    this._estatistica[categoria][catDens][key].push(atual[categoria][catDens][key]);
                  }
                }
              }

            }
          }
        }

        const temp = [];
        this._estatistica.densidade.especies.total.forEach(function(obj) {
          obj.forEach(element => {
            const id = element.especie;
            if (!this[id]) {temp.push(this[id] = element);}
          });

        }, Object.create(null));

        this._estatistica.densidade.especies.total = temp.length;

        return this._estatistica;
      }

      public calcularEstatisticaParcela(parcela: any, especial: boolean, tipoPoligono: number) {
        const estatisticas = new EstatisticasModelo().estatistica;

        if (!especial) {
          for (const cobertura of parcela.coberturaVegetacao) {
            if (cobertura.tipo.length > 0) {
              //contém Exótica perene ou ciclo longo
              const exoticaPerene = cobertura.tipo.findIndex(i => i.id === this.parcelaInfo.coberturaVegetacao[1].id) > -1;
              //Lenhosa nativa
              const lenhosaNativa = cobertura.tipo.findIndex(i => i.id === this.parcelaInfo.coberturaVegetacao[2].id) > -1;
              //Gramínea exótica
              const gramineaExotica = cobertura.tipo.findIndex(i => i.id === this.parcelaInfo.coberturaVegetacao[3].id) > -1;
              //Gramínea nativa
              const gramineaNativa = cobertura.tipo.findIndex(i => i.id === this.parcelaInfo.coberturaVegetacao[1].id) > -1;
              //Cobertura total
              const coberturaTotal = (cobertura.tipo.findIndex(i => i.id === this.parcelaInfo.coberturaVegetacao[0].id) === -1)&&(cobertura.tipo.findIndex(i => i.id === this.parcelaInfo.coberturaCopa[0].id) === -1);

              if (exoticaPerene) {estatisticas.cobertura.exoticaPerene++;}

              if (lenhosaNativa) {estatisticas.cobertura.lenhosaNativa++;}

              if (gramineaExotica) {estatisticas.cobertura.gramineasExoticas++;}

              if (gramineaNativa) {estatisticas.cobertura.gramineasNativas++;}

              if (coberturaTotal) {estatisticas.cobertura.coberturaTotal++;}

              if(lenhosaNativa || gramineaNativa) {estatisticas.cobertura.vegetacaoNativa++;}

              if(lenhosaNativa || exoticaPerene) {estatisticas.cobertura.lenhosaTotal++;}
            } else {
              estatisticas.cobertura.naoInformado++;
            }

          }
        }

        if (tipoPoligono < 3 || (tipoPoligono === 3 && especial)) {
          const arrayIndividuos: Array<Individuo> = [];
          let arrayEspecies: Array<Individuo> = [];

          for (const individuo of parcela.densidadeEspecies) {
            const temp = new Individuo();
            if (individuo.especie !== '' && individuo.especie !== undefined) {
              temp.especie = individuo.especie;
              if (individuo.regenerante !== '') {
                temp.regenerante = individuo.regenerante === 'sim' ?true : false;
              } else {
                temp.regenerante = undefined;
              }
              arrayIndividuos.push(temp);
            }
          }
          if (arrayIndividuos.length > 0) {
            arrayEspecies = [];

            arrayIndividuos.forEach(function(obj) {
              const id = obj.especie;
              if (!this[id]) {arrayEspecies.push(this[id] = obj);}
              else {
                this[id].regenerante = obj.regenerante || this[id].regenerante;
                // this[id].qtd += obj.qtd;
              }
            }, Object.create(null));

            console.log('Array Espécies: ', arrayEspecies);
            console.log('Array Individuos: ', arrayIndividuos);

            estatisticas.densidade.individuos.nativaReg = arrayIndividuos.filter(i => i.regenerante).length;

            estatisticas.densidade.especies.total = arrayEspecies;
          }
        }

        return estatisticas;

      }
}
