import { Schema, model, Document } from 'mongoose'
import { PradaInterfaceDoc } from '../../interfaces/Prada'

const PradaSchema = new Schema({
    usuario_interessado:{
        nome: {type: String},
        cpf:{type: String} ,
        rg:{type: Number},
        endereco: {type: String},
        email: {type: String},
        telefone: {type: Number},
        car: {type: Number},
    },
    tecnico_responsavel:{
        nome: {type: String},
        cpf:{type: String} ,
        rg:{type: Number},
        endereco: {type: String},
        email: {type: String},
        telefone: {type: String},
        formacao_profissional: {type: String},
        numero_registro: {type: Number},
    },
    imovel:{
        _id: {type: Schema.Types.ObjectId, ref:'Imovel'},
        estado:{type: String},
        municipio:{type: String},
        area:{type: Number},
        modulos_fiscais:{type: Number},
        bioma:{type: String},
    },
    area_recomposta:{
        identificacao_area:{type: String},
        categoria_area: {type: String}, 
        area:{type: Number},
        vegetacao_inicial:{type: String},
        solo_recente: {type: String},
        outro_solo: {type: String},
        mapa_satelite: {type: String},
        potencial_regeneracao: {type: String},
        fatores_degradacao: {type: [String]},
        caracteristicas_solo: {
            texura_radio: {type: String},
            solo_radio: {type: String},
            profundidade_radio: {type: String},
            drenagem_radio: {type: String},
        },
        outras_caracteristicas: {type: String},
    },
    metodos_recomposicao:{ 
        metodo: {type: String},
    },
    implantacao: {
        formas_plantio: {type: [String]},
        acoes_controle: [{
            text: {type: String},
            detalhes: {type: String}
        }],
    },
    especies_utilizadas: [{
        nome_cientifico: {type: String}, 
        nome_popular: {type: String},
        estrategia_ocupacao: {type: String},
        forma_propagacao: {type: String},
        quantidade_sementes: {type: Number},
    }],
    croqui_plantio: {
        esquema_plantio: {type: String},
        croqui_detalhes: {type: String}, //esse pode ser nullable
    },
    monitoramento: {
        indicadores_monitoramento: {type: [String]},
        proposta_monitoramento: {type: String},
    },
    cronograma: [{
        atividade: {type: String}, 
        tipo_atividade: {type: String}, 
        tempo: {type: String},
    }],
    orcamento: [{
        item: {type: String}, 
        preco: {type: Number},
    }],
    bibliografia: {
        text: {type: String}, //esse pode ser nullable
    }
})

export default model<PradaInterfaceDoc>('Prada', PradaSchema)