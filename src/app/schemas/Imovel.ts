import { Schema, model, Document } from 'mongoose'
import { ImovelInterfaceDoc } from '../../interfaces/Imovel'

const ImovelSchema = new Schema({
    _id: { type: String, required: true },
    _rev: { type: String, required: true },
    versao: { type: String, required: true },
    tipoImovel: { type: Schema.Types.Mixed, required: true },
    uf:{ type: String, required: true },
    municipio: { type: Schema.Types.Mixed, required: true },
    municipioOutro:{ type: String },
    assentamento:{ type: String },
    assentamentoOutro:{ type: String },
    numeroLote:{ type: Number },
    nomeTerritorio:{ type: String },
    area:{ type: String, required: true },
    moduloFiscal:{ type: Number },
    gpsOuMapa: { type: String},
    latitude:{ type: Number },
    longitude:{ type: Number },
    enviado: { type: Schema.Types.Mixed },
    criado: { type: String },
    editado:{ type: Schema.Types.Mixed },
    statusEnvio: { type: Schema.Types.Mixed },
    entrevistas:{ type: Schema.Types.Mixed },
    poligonos:{ type: Schema.Types.Mixed },
    sicar: {type: Schema.Types.ObjectId, ref:'Sicar'},
    prada: {type: Schema.Types.ObjectId, ref:'Prada'},
    imagePoligono:[{
        image:{type: String},
        data:{type: String}, 
    }],
}, {
    timestamps: true
})

export default model<ImovelInterfaceDoc>('Imovel', ImovelSchema, 'Imoveis')