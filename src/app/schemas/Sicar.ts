import { Schema, model, Document, Mongoose, Types } from 'mongoose'

interface SicarInterface extends Document {
    nome: string,
    usuario: string,
    dataNascimento: string,
    cpf: string,
    email: string,
    telefone: string,
    permissao: {id:string, level: number},
    uf: string,
    org: string,
    password: string,
    passwordResetToken: string,
    passwordResetExpires: any,
    createAt: any,
}

const SicarSchema = new Schema({
    usuario:{
        registro: {type: String},
        data_cadastro:{type: Date} ,
        ultima_verificacao:{type: String}
    },
    imovel:{
        _id: {type: Schema.Types.ObjectId, ref:'Imovel'},
        area_imovel:{type: Number},
        modulos_fiscais:{type:Number},
        latitude:{type:Number},
        longitude:{type:Number},
        municipio:{type:String},
        unidade_federacao:{type:String},
        condicao:{type:String},
        data_analise_car:{type:Date},
        situacao:{type:String},
        programa_regularizacao_ambiental:{type:String},
        condicao_pra:{type:String}
    },
    cobertura_solo:{
        vegetacao_nativa:{type:Number},
        uso_consolidado:{type:Number},
        servidao_administrativa:{type:Number}
    },
    reserva_legal:{
        situacao:{type:String},
        averbada_vetorizada:{type:Number},
        aprovada_nao_averbada_vetorizada:{type:Number},
        proposta_vetorizada:{type:Number},
        declarada_proprietario:{type:Number}
    },
    area_preservacao_permanente:{
        area:{type:Number}
    },
    areas_uso_restrito:{
        area:{type:Number}
    },
    restricoes_ir:[{
        origem:{type:String},
        descricao:{type:String},
        processamento:{type:Date},
        area_conflito:{type:Number},
        percentual:{type:Number} 
    }]
})

export default model<SicarInterface>('Sicar', SicarSchema)