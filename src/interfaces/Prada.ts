import { Document } from 'mongoose'

export interface PradaInterface {    
    area: string;
    categoriaArea: number;
    dimensao: number;
    estruturaVegetacao: string;
    soloRecente: string;
    mapa: string;
    potencialRegeneracao: number;
    fatoresDegradacao: [number];
    caracteristicasSolo: string;
    criado: string;
    editado: any;
}

export interface PradaInterfaceDoc extends Document {
    area: string;
    categoriaArea: number;
    dimensao: number;
    estruturaVegetacao: string;
    soloRecente: string;
    mapa: string;
    potencialRegeneracao: number;
    fatoresDegradacao: [number];
    caracteristicasSolo: string;
    criado: string;
    editado: any;
}