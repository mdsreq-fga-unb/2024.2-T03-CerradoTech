import { Document } from 'mongoose'

export interface ImovelInterface {
    _id: string;
    _rev: string;
    versao: string;
    tipoImovel: any;
    uf: string;
    municipio: any;
    municipioOutro: string;
    assentamento: string;
    assentamentoOutro: string;
    numeroLote: number;
    nomeTerritorio: string;
    area: string;
    moduloFiscal: number;
    latitude: number;
    longitude: number;
    enviado: any;
    criado: string;
    editado: any;
    statusEnvio: { id: number, nome: string };
    entrevistas: any;
    poligonos: any;
    prada: any;
}

export interface ImovelInterfaceDoc extends Document {
    _id: string;
    _rev: string;
    versao: string;
    tipoImovel: any;
    uf: string;
    municipio: any;
    municipioOutro: string;
    assentamento: string;
    assentamentoOutro: string;
    numeroLote: number;
    nomeTerritorio: string;
    area: string;
    moduloFiscal: number;
    latitude: number;
    longitude: number;
    enviado: any;
    criado: string;
    editado: any;
    statusEnvio: { id: number, nome: string };
    entrevistas: any;
    poligonos: any;
    prada: any;
}