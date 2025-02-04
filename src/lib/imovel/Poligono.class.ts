/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PoligonoContent {
    readonly simNao = [
        {id: 1, label:'Sim'},
        {id: 2, label:'Não'},
    ];

    readonly formacaoVegetal = [
        {id: 1, label: 'Florestal'},
        {id: 2, label:'Savânica'},
        {id: 3, label:'Campestre'},
    ];

    readonly fitofisionomia = {
        'Savânica':[
            {id: 1, label:'Cerrado típico'},
            {id: 2, label:'Cerrado rupestre'},
            {id: 3, label:'Parque do cerrado'},
            {id: 4, label:'Palmeiral'},
            {id: 5, label:'Vereda'},
        ],
        'Campestre':[
            {id: 6, label:'Campo rupestre'},
            {id: 7, label:'Campo Sujo'},
            {id: 8, label:'Campo limpo'},
        ],
        'Florestal':[
            {id: 9, label:'Mata ciliar'},
            {id: 10, label:'Mata de galeria'},
            {id: 11, label:'Mata seca'},
            {id: 12, label:'Cerradão'},
        ],
    };

    readonly tipoArea = [
        {id: 1, label:'Um único polígono'},
        {id: 2, label:'Conjunto de polígonos (com condições ambientais e método de recomposição)'},
    ];

    readonly utilizacaoAnterior = [
        {id:1, label: 'Pastagem'},
        {id:2, label: 'Agricultura mecanizada'},
        {id:3, label: 'Agricultura não mecanizada'},
        {id:4, label: 'Extração mineral (cascalho, areia, outros)'},
        {id:5, label: 'Outro'},
    ];

    readonly classificacaoArea = [
        {id: 1, label:'Área de Preservação Permanente (APP)'},
        {id: 2, label:'Área de Reserva Legal (ARL)'},
        {id: 3, label:'Área de Uso Restrito (AUR)'},
        {id: 4, label:'Outra área do imóvel ou Área de Uso Alternativo do Solo (AUA)'},
    ];

    readonly coberturaAtual = [
        {id: 1, label:'Agricultura'},
        {id: 2, label:'Mineração'},
        {id: 3, label:'Regeneração com pasto'},
        {id: 4, label:'Pasto limpo'},
        {id: 5, label:'Pasto sujo'},
        {id: 6, label:'Pasto com solo exposto'},
        {id: 7, label:'Outro'},
    ];

    readonly funcaoRecomposicao = [
        {value:'Cumprimento da legislação ambiental', isChecked: false },
        {value:'Pagamento de serviços ambientais (incluindo crédito de carebono)', isChecked: false },
        {value:'Produção com sistema agroflorestal', isChecked: false },
        {value:'Produção com manejo florestal', isChecked: false },
        {value:'Outros', isChecked: false },
    ];

    readonly quantasPessoas = [
        {id: 0, label:'0'},
        {id: 1, label:'1'},
        {id: 2, label:'2'},
        {id: 3, label:'3'},
        {id: 4, label:'4'},
        {id: 5, valor:'5 ou mais'},
    ];

    public tipoPoligono(area){
        if(area <= 0.5 ) {return 3;}
        if(area > 0.5 && area <= 1) {return 1;}
        if(area > 1) {return 2;}
    }
}
