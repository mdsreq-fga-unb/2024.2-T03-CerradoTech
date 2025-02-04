import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ImovelContent {
    readonly label = {
        tipoImovel: 'Tipo do imóvel',
        estado: 'Estado',
        municipio: 'Município',
        municipioOutro:'Insira o nome do município',
        assentamento: 'Nome do assentamento',
        assentamentoOutro: 'Insira o nome do assentamento',
        numeroLote:'Número do lote',
        nomeTerritorio:'Nome do território',
        nomePropriedade:'Nome da propriedade',
        nomeUc: 'Nome da unidade de conservação',
        area: 'Tamanho do imóvel (ha)',
        localizacao: 'Localização da propriedade',
        coordenada:'GPS',
        latitude: 'Latitude',
        longitude: 'Longitude',
        coletarGPS: 'Coletar posição do GPS',
        localizarMapa: 'Localizar no mapa',
        salvar: 'Salvar',
    };

    readonly tipoImovel = [
        {id:1, tipo:'Assentamento'},
        {id:2, tipo:'Território de Povos e Comunidades Tradicionais'},
        {id:3, tipo:'Propriedade privada ou posse'},
        {id:4, tipo:'Unidade de conservação'}
    ];
}
