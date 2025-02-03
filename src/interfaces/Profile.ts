import { Document } from 'mongoose'

export interface ProfileInterface {    
    nome: string;
    description: string;
    hierachial_level: number;
    active: boolean;
    criado: string;
    editado: any;
}

export interface ProfileInterfaceDoc extends Document {
    nome: string;
    description: string;
    hierachial_level: number;
    active: boolean;
    criado: string;
    editado: any;
}