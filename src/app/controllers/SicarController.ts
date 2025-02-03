import { Request, Response } from 'express'
import { environment } from '../../environments/environments';
import User from '../schemas/User'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth.json'
import crypto from 'crypto'
import Mailer from '../../modules/mailer'
import Sicar from '../schemas/Sicar';
import Imovel from '../schemas/Imovel';
import moment from 'moment';

class SicarController {
    /**
     * Get all Sicars 
     */
    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const reports = await Sicar.find()
            return res.send(reports)
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: error })
        }
    }

    /**
     * Get all Sicars 
     */
    public async registerSicar(req: Request, res: Response): Promise<Response> {
        
        try {
            const {usuario, imovel, cobertura_solo, reserva_legal, 
                area_preservacao_permanente, 
                areas_uso_restrito, 
                restricoes_ir} = req.body
                
            const existentRegister = await Sicar.find().where({'usuario.registro': usuario.registro})
            if(existentRegister.length > 1)return res.status(400).send({ error: 'Sicar já cadastrado!' });

            if(usuario.registro == undefined) return res.status(400).send({ error: 'Insira o registro SICAR!' });
            if(usuario.data_cadastro == undefined) return res.status(400).send({ error: 'Insira a data de cadastro!' });
            if(usuario.ultima_verificacao == undefined) return res.status(400).send({ error: 'Insira a data da última verificação!' });

            if(imovel.area_imovel == undefined) return res.status(400).send({ error: 'Insira a área do imóvel!' });
            if(imovel.modulos_fiscais == undefined) return res.status(400).send({ error: 'Insira os módulos fiscais!' });
            if(imovel.longitude == undefined) return res.status(400).send({ error: 'Insira a longitude!' });
            if(imovel.latitude == undefined) return res.status(400).send({ error: 'Insira a latidude!' });
            if(imovel.municipio == undefined) return res.status(400).send({ error: 'Insira o município!' });
            if(imovel.unidade_federacao == undefined) return res.status(400).send({ error: 'Insira a unidade da federação!' });
            if(imovel.condicao == undefined) return res.status(400).send({ error: 'Insira a condição!' });
            if(imovel.data_analise_car == undefined) return res.status(400).send({ error: 'Insira a data de análise do CAR!' });
            if(imovel.situacao == undefined) return res.status(400).send({ error: 'Insira a situação do seu imóvel!' });
            if(imovel.programa_regularizacao_ambiental == undefined) return res.status(400).send({ error: 'Insira o programa de regularização ambiental!' });
            if(imovel.condicao_pra == undefined) return res.status(400).send({ error: 'Insira a condição do PRA!' });
            
            if(cobertura_solo.vegetacao_nativa == undefined) return res.status(400).send({ error: 'Insira a área total de vegetação nativa!' });
            if(cobertura_solo.uso_consolidado == undefined) return res.status(400).send({ error: 'Insira a área total de uso consolidado!' });
            if(cobertura_solo.servidao_administrativa == undefined) return res.status(400).send({ error: 'Insira a área total de servidão administrativa!' });
            
            if(reserva_legal.situacao == undefined) return res.status(400).send({ error: 'Insira a situação da reserva legal!' });
            if(reserva_legal.averbada_vetorizada == undefined) return res.status(400).send({ error: 'Insira a área de reserva legal Averbada vetorizada!' });
            if(reserva_legal.aprovada_nao_averbada_vetorizada == undefined) return res.status(400).send({ error: 'Insira a área de reserva legal Aprovada não vetorizada!' });
            if(reserva_legal.proposta_vetorizada == undefined) return res.status(400).send({ error: 'Insira a área de reserva legal Proposta vetorizada!' });
            if(reserva_legal.declarada_proprietario == undefined) return res.status(400).send({ error: 'Insira a área total de reserva legal declarada pelo proprietário!' });
            
            if(area_preservacao_permanente.area == undefined) return res.status(400).send({ error: 'Insira a área de preservação permanente!' });
            
            if(areas_uso_restrito.area == undefined) return res.status(400).send({ error: 'Insira a área de uso restrito!' });
            
            if((restricoes_ir.length > 0)){
                const filledRestriction = restricoes_ir.every(item => (item.area_conflito && item.descricao && item.origem && item.percentual && item.processamento))
                if(!filledRestriction) return res.status(400).send({ error: 'Insira os dados faltantes da restrição' });
            } 
            const params = {
                usuario:{
                    registro: usuario.registro,
                    data_cadastro: moment(usuario.data_cadastro).format() ,
                    ultima_verificacao:moment(usuario.ultima_verificacao).format()
                },
                imovel:{
                    id: imovel.id,
                    area_imovel:imovel.area_imovel,
                    modulos_fiscais:imovel.modulos_fiscais,
                    latitude:imovel.latitude,
                    longitude:imovel.longitude,
                    municipio:imovel.municipio,
                    unidade_federacao:imovel.unidade_federacao,
                    condicao:imovel.condicao,
                    data_analise_car:moment(imovel.data_analise_car).format(),
                    situacao:imovel.situacao,
                    programa_regularizacao_ambiental:imovel.programa_regularizacao_ambiental,
                    condicao_pra:imovel.condicao_pra
                },
                cobertura_solo:{
                    vegetacao_nativa:cobertura_solo.vegetacao_nativa,
                    uso_consolidado:cobertura_solo.uso_consolidado,
                    servidao_administrativa:cobertura_solo.servidao_administrativa
                },
                reserva_legal:{
                    situacao:reserva_legal.situacao,
                    averbada_vetorizada:reserva_legal.averbada_vetorizada,
                    aprovada_nao_averbada_vetorizada:reserva_legal.aprovada_nao_averbada_vetorizada,
                    proposta_vetorizada:reserva_legal.proposta_vetorizada,
                    declarada_proprietario:reserva_legal.declarada_proprietario
                },
                area_preservacao_permanente:{
                    area:area_preservacao_permanente.area
                },
                areas_uso_restrito:{
                    area:areas_uso_restrito.area
                },
                restricoes_ir: restricoes_ir.map((restricao) => {return(
                    {
                        origem:restricao.origem,
                        descricao:restricao.descricao,
                        processamento:moment(restricao.processamento).format(),
                        area_conflito:restricao.area_conflito,
                        percentual:restricao.percentual 
                    }
                )})
            }

            const sicar = await Sicar.create(params)
            const updatedImovel = await Imovel.updateOne({_id: imovel.id}, {sicar: sicar._id})
            res.send({sicar, updatedImovel})
           
        } catch (err) {
            return res.status(400).send({ error: 'Registro falhou' + err });
        }
    }
    /**
     * Get all Sicars for imovel 
     * @param req req.params.imovelId
     */
    public async imovelSicar(req: Request, res: Response): Promise<Response> {
        
        try {
            const sicar = await Sicar.findOne({'imovel.id': req.params.imovelId})
            if(!sicar) return res.status(400).send({ error: 'Não encontramos um SICAR para esta propriedade.' });
            res.send(sicar)
        } catch (err) {
            return res.status(400).send({ error: 'Não encontramos registros ' + err });
        }
    }
    
    /**
     * Delete Sicar by id 
     * @param req req.params.sicarId
     */
    public async delete(req: Request, res: Response): Promise<Response> {
        
        try {
            const sicar = await Sicar.findByIdAndDelete(req.params.sicarId)
            if(!sicar) return res.status(400).send({msg:"Não foi encontrado um Sicar com este ID"});
            return res.send({msg: 'Sicar deletado com sucesso!', id: sicar._id, ok: true})
        } catch (error) {
            return res.status(400).json(error)
        }
    }
    
    /**
     * Get Sicar by id 
     * @param req req.params.sicarId
     */
    public async getSicarById(req: Request, res: Response): Promise<Response> {
        
        try {
            const sicar = await Sicar.findById(req.params.sicarId)
            if(!sicar) return res.status(400).send({msg:"Não foi encontrado um Sicar com este ID"});
            return res.send(sicar)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

}

export default new SicarController()
