/* eslint-disable no-bitwise */
/* eslint-disable no-underscore-dangle */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ParcelaContent {

    readonly anoDoMonitoramento = [
        { label: 'Ano do início do monitoramento', id: 0 },
        { label: '1 ano após o início', id: 1 },
        { label: '2 anos após o início', id: 2 },
        { label: '3 anos após o início', id: 3 },
        { label: '4 anos após o início', id: 4 },
        { label: '5 anos após o início', id: 5 },
        { label: '6 anos após o início', id: 6 },
        { label: '7 anos após o início', id: 7 },
        { label: '8 anos após o início', id: 8 },
        { label: '9 anos após o início', id: 9 },
        { label: '10 anos após o início', id: 10 },
    ];

    readonly statusPreenchimento = {
        nao_iniciado: { id: 0, nome: 'Não inciada' },
        incompleto: { id: 1, nome: 'Incompleta' },
        finalizado: { id: 2, nome: 'Finalizada' }
    };

    readonly coberturaVegetacao = [
        { id: 0, nome: 'Ausente' },
        { id: 1, nome: 'Exótica perene ou ciclo longo' },
        { id: 2, nome: 'Lenhosa nativa' },
        { id: 3, nome: 'Gramínea exótica' },
        { id: 4, nome: 'Gramínea nativa' }
    ];

    readonly coberturaCopa = [
        { id: 5, nome: 'Sem copa' },
        { id: 1, nome: 'Exótica perene ou ciclo longo' },
        { id: 6, nome: 'Nativa' },
    ];

    private versao = '1.0';

};
