import { Request, Response } from 'express'
import { resolveContent } from 'nodemailer/lib/shared'
import Imovel from '../schemas/Imovel'
import { ImovelInterface, ImovelInterfaceDoc } from '../../interfaces/Imovel'

import User from '../schemas/User';
import SicarController from './SicarController';
import Sicar from '../schemas/Sicar';

class ImovelController {

    /**
     * Get all 'imoveis' stored in Imovel Schema
     * @param req 
     * @param res 
     */
    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const imoveis = await Imovel.find()
            return res.json(imoveis)
        } catch (error) {
            console.log(error)

            return res.status(400).json({ msg: error })
        }

    }

    /**
     * Save a 'imovel' in Imovel Schema
     * @param req 
     * @param res 
     */
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const imovel = await Imovel.create(req.body);
            return res.send({msg: 'Formulário enviado com sucesso!', id: imovel._id, ok: true})
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: error.message })
        }

    }

    /**
     * Get a 'imovel' in Imovel Schema by your _id
     * @param req req.params.storyId 
     * @param res 
     */
    public async getById(req: Request, res: Response): Promise<Response> {
        try {
            const imovel = await Imovel.findOne({ "_id": req.params.idImovel })
            return res.json(imovel)
        } catch (error) {
            return res.status(400).json(error)
        }

    }

    /**
     * Get a 'imovel' in Imovel Schema by your username
     * @param req req.params.storyId 
     * @param res 
     */
    public async getByUser(req: Request, res: Response): Promise<Response> {
        try {
            const imoveis = await Imovel.find({ "criado": req.params.userId })
            return res.json(imoveis)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    /**
     * Update a imovel in Imovel Schema
     * @param req 
     * @param res 
     */
    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const imovel: any = await Imovel.findByIdAndUpdate(req.params.idImovel,
                {
                    $set: req.body,
                    $currentDate: { lastModified: true }
                }
            )
            return res.send({msg: 'Formulário enviado com sucesso!', id: imovel._id, ok: true})
        } catch (error) {
            return res.status(400).json(error)
        }

    }

    /**
     * Delete a imovel in Imovel Schema
     * @param req 
     * @param res 
     */
    public async removeImovel(req: Request, res: Response): Promise<Response> {
        try {
            const remove = await Imovel.findByIdAndDelete(req.params.idImovel)
            return res.send({msg: 'Imóvel deletado com sucesso!', id: remove._id, ok: true})
        } catch (error) {
            return res.status(400).json(error)
        }

    }

    /**
     * Delete a "Entrevista" in Imovel Schema
     * @param req 
     * @param res 
     */
     public async removeEntrevista(req: Request, res: Response): Promise<Response> {
        try {
            const idImovel = req.params.idImovel;
            const idEntrevista = req.params.idEntrevista;
            const statusEnvio = req.body.statusEnvio;
            const imovel = await Imovel.findById(idImovel);
            if(!imovel) return res.status(400).send({ error: 'Imóvel não encontrado' });
            
            const entrevista = imovel.entrevistas[idEntrevista];
            //Pode existir casos que o imóvel foi parcialmente enviado e a entrevista exista localmente mas não na base de dados da nuvem. Portantanto não é um erro
            if(!entrevista && statusEnvio >= 2) return res.status(200).send({ msg: 'Questionário socioprodutivo não encontrado', ok: true });
            if(!entrevista && statusEnvio === 1) return res.status(400).send({ error: 'Questionário socioprodutivo não encontrado' });
            
            delete imovel.entrevistas[idEntrevista];
            await Imovel.updateOne(
                { _id: req.params.idImovel },
                {
                    $set: {'entrevistas': imovel.entrevistas},
                    $currentDate: { lastModified: true }
                }
            )
            return res.send({msg: 'Questionário socioprodutivo excluído com sucesso!', id: idEntrevista, ok: true})
        } catch (error) {
            return res.status(400).json(error)
        }

    }

    /**
     * Delete a "Poligono" in Imovel Schema
     * @param req 
     * @param res 
     */
     public async removePoligono(req: Request, res: Response): Promise<Response> {
        try {
            const idImovel = req.params.idImovel;
            const idPoligono = req.params.idPoligono;
            const statusEnvio = req.body.statusEnvio;
            const imovel = await Imovel.findById(idImovel);
            if(!imovel) return res.status(400).send({ error: 'Imóvel não encontrado' });
            
            const poligono = imovel.poligonos[idPoligono];
            //Pode existir casos que o imóvel foi parcialmente enviado e o polígono existe localmente mas não na base de dados da nuvem. Portantanto não é um erro
            if(!poligono && statusEnvio >= 2) return res.status(200).send({ msg: 'Polígono não encontrado', ok: true });
            if(!poligono && statusEnvio === 1) return res.status(400).send({ error: 'Polígono não encontrado' });
            
            delete imovel.poligonos[idPoligono];
            await Imovel.updateOne(
                { _id: req.params.idImovel },
                {
                    $set: {'poligonos': imovel.poligonos},
                    $currentDate: { lastModified: true }
                }
            )
            return res.send({msg: 'Polígono excluído com sucesso!', id: idPoligono, ok: true})
        } catch (error) {
            return res.status(400).json(error)
        }

    }

    /**
     * Delete a "Parcela" in Imovel Schema
     * @param req 
     * @param res 
     */
     public async removeParcela(req: Request, res: Response): Promise<Response> {
        try {
            const idImovel = req.params.idImovel;
            const idPoligono = req.params.idPoligono;
            const idParcela = req.params.idParcela;
            const statusEnvio = req.body.statusEnvio;
            const imovel = await Imovel.findById(idImovel);
            if(!imovel) return res.status(400).send({ error: 'Imóvel não encontrado' });
            
            const poligono = imovel.poligonos[idPoligono];
            //Pode existir casos que o imóvel foi parcialmente enviado e o polígono existe localmente mas não na base de dados da nuvem. Portantanto não é um erro
            if(!poligono && statusEnvio >= 2) return res.status(200).send({ msg: 'Polígono não encontrado', ok: true });
            if(!poligono && statusEnvio === 1) return res.status(400).send({ error: 'Polígono não encontrado' });

            const parcela = poligono.parcelas[idParcela];
            //Pode existir casos que o imóvel foi parcialmente enviado e a parcela existe localmente mas não na base de dados da nuvem. Portantanto não é um erro
            if(!parcela && statusEnvio >= 2) return res.status(200).send({ msg: 'Parcela não encontrada', ok: true });
            if(!parcela && statusEnvio === 1) return res.status(400).send({ error: 'Parcela não encontrada' });
            
            delete imovel.poligonos[idPoligono].parcelas[idParcela];
            await Imovel.updateOne(
                { _id: req.params.idImovel },
                {
                    $set: {'poligonos': imovel.poligonos},
                    $currentDate: { lastModified: true }
                }
            )
            return res.send({msg: 'Parcela excluída com sucesso!', id: idParcela, ok: true})
        } catch (error) {
            return res.status(400).json(error)
        }

    }

    /**
     * Delete all"Parcelas" with the year in Imovel Schema
     * @param req 
     * @param res 
     */
     public async removeMonitoramento(req: Request, res: Response): Promise<Response> {
        try {
            const idImovel = req.params.idImovel;
            const idPoligono = req.params.idPoligono;
            const anoMonitoramento = req.params.ano;
            const statusEnvio = req.body.statusEnvio;
            const imovel = await Imovel.findById(idImovel);
            if(!imovel) return res.status(400).send({ error: 'Imóvel não encontrado' });
            
            if(!imovel.hasOwnProperty('poligonos')){
                if(statusEnvio >= 2) return res.status(200).send({ msg: 'Polígono não encontrado', ok: true });
                if(statusEnvio === 1) return res.status(400).send({ error: 'Polígono não encontrado' });
            }
            const poligono = imovel.poligonos[idPoligono];
            //Pode existir casos que o imóvel foi parcialmente enviado e o polígono existe localmente mas não na base de dados da nuvem. Portantanto não é um erro
            if(!poligono && statusEnvio >= 2) return res.status(200).send({ msg: 'Polígono não encontrado', ok: true });
            if(!poligono && statusEnvio === 1) return res.status(400).send({ error: 'Polígono não encontrado' });
            
            const parcelas = Object.values(poligono.parcelas);
            if(!parcelas && statusEnvio >= 2) return res.status(200).send({ msg: 'Não existem parcelas neste polígono', ok: true });
            if(!parcelas && statusEnvio === 1) return res.status(400).send({ error: 'Não existem parcelas neste polígono' });
            
            //Seleciona parcelas que possuem o anoMonitoramento informado
            let parcelasAno: any = parcelas.filter(
                (parcela: any) => parcela.anoMonitoramento === anoMonitoramento
            );
            //Mapeia as parcelas para obter apenas seu ID
            parcelasAno = parcelasAno.map((parcela: any) => parcela._id);

            //Remove as parcelas do polígono
            parcelasAno.forEach((idParcela: string) => {
                delete imovel.poligonos[idPoligono].parcelas[idParcela];
            });

            await Imovel.updateOne(
                { _id: req.params.idImovel },
                {
                    $set: {'poligonos': imovel.poligonos},
                    $currentDate: { lastModified: true }
                }
            )
            return res.send({msg: 'Ano de monitoramento excluído com sucesso!', ano: anoMonitoramento, ok: true})
        } catch (error) {
            console.log("erro: ", error)
            return res.status(400).json(error)
        }

    }
}

export default new ImovelController()