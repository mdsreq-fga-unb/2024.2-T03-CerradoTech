import { Request, Response } from 'express'

import Prada from '../schemas/Prada';
import Imovel from '../schemas/Imovel';
import moment from 'moment';

class PradaController {

    /**
     * Get all Pradas
     */
     public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const reports = await Prada.find()
            return res.send(reports)
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: error })
        }
    }

    /**
     * Get Prada by id 
     * @param req req.params.sicarId
     */
     public async getPradaById(req: Request, res: Response): Promise<Response> {
        
        try {
            const prada = await Prada.findById(req.params.pradaId)
            if(!prada) return res.status(400).send({msg:"Não foi encontrado um Sicar com este ID"});
            return res.send(prada)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    /**
     * Get Prada by imovel
     * @param req req.params.sicarId
     */
    public async imovelPrada(req: Request, res: Response): Promise<Response> {
        
        try {
            const prada = await Prada.findOne({'imovel.id': req.params.imovelId})
            if(!prada) return res.status(400).send({ error: 'Não encontramos um Prada para esta propriedade.' });
            res.send(prada)
        } catch (err) {
            return res.status(400).send({ error: 'Não encontramos registros ' + err });
        }
    }

    /**
     * Create Prada
     */
    public async registerPrada(req: Request, res: Response): Promise<Response> {
        
        try {
            const {
                usuario_interessado, tecnico_responsavel, imovel, area_recomposta, metodos_recomposicao, implantacao,
                especies_utilizadas, croqui_plantio, monitoramento, cronograma, orcamento, bibliografia
            } = req.body

            if(tecnico_responsavel.nome == undefined) return res.status(400).send({ error: 'Insira o nome do técnico responsável em Dados do Responsável!' });
            if(tecnico_responsavel.cpf == undefined) return res.status(400).send({ error: 'Insira o cpf do técnico responsável em Dados do Responsável!' });
            if(tecnico_responsavel.rg == undefined) return res.status(400).send({ error: 'Insira o rg do técnico responsável em Dados do Responsável!' });
            if(tecnico_responsavel.endereco == undefined) return res.status(400).send({ error: 'Insira o endereço do técnico responsável em Dados do Responsável!' });
            if(tecnico_responsavel.email == undefined) return res.status(400).send({ error: 'Insira o email do técnico responsável em Dados do Responsável!' });
            if(tecnico_responsavel.telefone == undefined) return res.status(400).send({ error: 'Insira o telefone do técnico responsável em Dados do Responsável!' });
            if(tecnico_responsavel.formacao_profissional == undefined) return res.status(400).send({ error: 'Insira a formação profissional do técnico responsável em Dados do Responsável!' });
            if(tecnico_responsavel.numero_registro == undefined) return res.status(400).send({ error: 'Insira o numero de registro do Conselho de Classe do técnico responsável em Dados do Responsável!' });
            
            //if(usuario_interessado.nome == undefined) return res.status(400).send({ error: 'Insira o nome do usuário em Dados do usuário interessado!' });
            //if(usuario_interessado.cpf == undefined) return res.status(400).send({ error: 'Insira o cpf do usuário em Dados do usuário interessado!' });
            if(usuario_interessado.rg == undefined) return res.status(400).send({ error: 'Insira o rg do usuário em Dados do usuário interessado!' });
            if(usuario_interessado.endereco == undefined) return res.status(400).send({ error: 'Insira o endereço do usuário em Dados do usuário interessado!' });
            //if(usuario_interessado.email == undefined) return res.status(400).send({ error: 'Insira o email do usuário em Dados do usuário interessado!' });
            //if(usuario_interessado.telefone == undefined) return res.status(400).send({ error: 'Insira o telefone do usuário em Dados do usuário interessado!' });
            if(usuario_interessado.car == undefined) return res.status(400).send({ error: 'Insira o car do usuário em Dados do usuário interessado!' });

            //if(imovel.estado == undefined) return res.status(400).send({ error: 'Insira o estado do imóvel em Imóvel a ser reconstruído!'});
            //if(imovel.municipio == undefined) return res.status(400).send({ error: 'Insira o município do imóvel em Imóvel a ser reconstruído!'});
            //if(imovel.area == undefined) return res.status(400).send({ error: 'Insira o área do imóvel em Imóvel a ser reconstruído!'});
            //if(imovel.modulos_fiscais == undefined) return res.status(400).send({ error: 'Insira os módulos fiscais do imóvel em Imóvel a ser reconstruído!'});
            if(imovel.bioma == undefined) return res.status(400).send({ error: 'Insira o bioma do imóvel em Imóvel a ser reconstruído!'});
            
            if(area_recomposta.identificacao_area == undefined) return res.status(400).send({ error: 'Insira a identificação da área a ser recomposta em Imóvel a ser reconstruído!'});
            if(area_recomposta.vegetacao_inicial == undefined) return res.status(400).send({ error: 'Insira a vegetação inicial da área a ser recomposta em Imóvel a ser reconstruído!'});
            if(area_recomposta.solo_recente == undefined) return res.status(400).send({ error: 'Insira o solo recentemente usado da área a ser recomposta em Imóvel a ser reconstruído!'});
            //if(area_recomposta.categoria == undefined) return res.status(400).send({ error: 'Insira a categoria da área a ser recomposta em Imóvel a ser reconstruído!'});
            //if(area_recomposta.area == undefined) return res.status(400).send({ error: 'Insira a area da área a ser recomposta em Imóvel a ser reconstruído!'});
            if(area_recomposta.caracteristicas_solo == undefined) return res.status(400).send({ error: 'Insira as caracteristicas do solo da área a ser recomposta em Características do Solo a ser recomposto!'});
            if(area_recomposta.mapa_satelite == undefined) return res.status(400).send({ error: 'Insira o mapa satélite da área a ser recomposta em Mapa da área a ser recomposta!'});
            if(area_recomposta.potencial_regeneracao == undefined) return res.status(400).send({ error: 'Insira o potencial de regeneração da área a ser recomposta em Métodos de recomposição!'});
            if(area_recomposta.fatores_degradacao == undefined) return res.status(400).send({ error: 'Insira os fatores de degradação da área a ser recomposta Fatores de degradação a ser recomposto!'});
            
            if(metodos_recomposicao.metodo == undefined) return res.status(400).send({ error: 'Escolha o método de recomposição do solo da área a ser recomposta em Métodos de recomposição!' });
            
            if(implantacao.formas_plantio == undefined) return res.status(400).send({ error: 'Escolha as formas de plantio da área a ser recomposta!' });
            if(implantacao.acoes_controle == undefined) return res.status(400).send({ error: 'Escolha as ações de controle da área a ser recomposta em Formas de plantio!' });
            
            if(especies_utilizadas.length < 2) return res.status(400).send({ error: 'Insira pelo menos 20 espécies para a área a ser recomposta em Espécies vegetais que serão utilizadas!' });
            //fazer a verificacao dentro da lista
            
            if(croqui_plantio.esquema_plantio == undefined) return res.status(400).send({ error: 'Insira o esquema do plantio da área a ser recomposta em Croqui do plantio!' });
            //if(croqui_plantio.croqui_detalhes == undefined) return res.status(400).send({ error: 'Insira pelo menos 20 espécies para a área a ser recomposta!' });
            
            if(monitoramento.indicadores_monitoramento == undefined) return res.status(400).send({ error: 'Escolha os indicadores de monitoramento para área a ser recomposta em Indicadores utilizados para monitorar a recomposição!' });
            if(monitoramento.proposta_monitoramento == undefined) return res.status(400).send({ error: 'Escolha a proposta de monitoramento para área a ser recomposta em Indicadores utilizados para monitorar a recomposição!' });
           
            if(cronograma.length < 1) return res.status(400).send({ error: 'Insira as atividades do cronograma relacionado á área a ser recomposta em Cronograma!' });
            //fazer a verificacao dentro da lista

            if(orcamento.length < 1) return res.status(400).send({ error: 'Insira os preços do orçamento para área a ser recomposta em Previsão do orçamento (insumos e serviços)!' });
            //fazer a verificacao dentro da lista

            //if(bibliografia.texto == undefined) return res.status(400).send({ error: 'Insira pelo menos 20 espécies para a área a ser recomposta!' });

            const params = {
                usuario_interessado:{
                    nome:usuario_interessado.nome,
                    cpf:usuario_interessado.cpf,
                    rg:usuario_interessado.rg,
                    endereco:usuario_interessado.endereco,
                    email:usuario_interessado.email,
                    telefone:usuario_interessado.telefone,
                    car:usuario_interessado.car
                },
                tecnico_responsavel:{
                    nome:tecnico_responsavel.nome,
                    cpf:tecnico_responsavel.cpf,
                    rg:tecnico_responsavel.rg,
                    endereco:tecnico_responsavel.endereco,
                    email:tecnico_responsavel.email,
                    telefone:tecnico_responsavel.telefone,
                    formacao_profissional:tecnico_responsavel.formacao_profissional,
                    numero_registro:tecnico_responsavel.numero_registro
                },
                imovel:{
                    id: imovel.id,
                    estado:imovel.estado,
                    municipio:imovel.municipio,
                    area:imovel.area,
                    modulos_fiscais:imovel.modulos_fiscais,
                    bioma:imovel.bioma
                },
                area_recomposta:{
                    identificacao_area:area_recomposta.identificacao_area,
                    categoria:area_recomposta.categoria,
                    categoria_area:area_recomposta.categoria_area,
                    area:area_recomposta.area,
                    vegetacao_inicial:area_recomposta.vegetacao_inicial,
                    solo_recente:area_recomposta.solo_recente, //.map(solo => ( solo )),
                    outro_solo:area_recomposta.outro_solo,
                    mapa_satelite:area_recomposta.mapa_satelite,
                    potencial_regeneracao:area_recomposta.potencial_regeneracao,
                    fatores_degradacao:area_recomposta.fatores_degradacao,//.map(fator => ( fator )),
                    caracteristicas_solo:area_recomposta.caracteristicas_solo,//.map(caracteristica => ( caracteristica ))
                    outras_caracteristicas:area_recomposta.outras_caracteristicas,
                },
                metodos_recomposicao:{
                    metodo: metodos_recomposicao.metodo
                },
                implantacao:{
                    formas_plantio: implantacao.formas_plantio.map(plantio => ( plantio )),
                    acoes_controle: implantacao.acoes_controle.map(controle => ({
                        text: controle.text,
                        detalhes: controle.detalhes
                    }))
                },
                especies_utilizadas: especies_utilizadas.map(especie => ({
                    nome_cientifico: especie.nome_cientifico ,
                    nome_popular: especie.nome_popular ,
                    estrategia_ocupacao: especie.estrategia_ocupacao ,
                    forma_propagacao: especie.forma_propagacao ,
                    quantidade_sementes: especie.quantidade_sementes ,
                })),
                croqui_plantio: {
                    esquema_plantio: croqui_plantio.esquema_plantio,
                    croqui_detalhes: croqui_plantio.croqui_detalhes
                },
                monitoramento: {
                    indicadores_monitoramento: monitoramento.indicadores_monitoramento.map(indicador => ( indicador )),
                    proposta_monitoramento: monitoramento.proposta_monitoramento
                },
                cronograma: cronograma.map(atividade => ({
                    atividade: atividade.atividade,
                    tipo_atividade: atividade.tipo_atividade,
                    tempo: atividade.tempo,
                })),
                orcamento: orcamento.map(item_orcamento => ({
                    item: item_orcamento.item,
                    preco: item_orcamento.preco,
                })),
                bibliografia:{
                    text: bibliografia.text
                }
            }

            const prada = await Prada.create(params)
            const updatedImovel = await Imovel.updateOne({_id: imovel.id}, {prada: prada._id})
            res.send(updatedImovel)

        } catch (err) {
            return res.status(400).send({ error: 'Registro do Prada falhou' + err });
        }
    }

    /**
     * Update Prada
     */
    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const prada: any = await Prada.updateOne(
                { _id: req.params.idPrada },
                {
                    $set: req.body,
                    $currentDate: { lastModified: true }
                }
            )
            return res.send({msg: 'Formulário enviado com sucesso!', id: prada._id, ok: true})
        } catch (error) {
            return res.status(400).json(error)
        }

    }

    /**
     * Delete Prada by id 
     * @param req req.params.sicarId
     */
     public async delete(req: Request, res: Response): Promise<Response> {
        
        try {
            const prada = await Prada.findById(req.params.pradaId)
            if(!prada) return res.status(400).send({msg:"Não foi encontrado um Prada com este ID"});

            const imovel = await Imovel.findOneAndUpdate({prada: prada._id}, {prada: null}, {useFindAndModify: false, new: true})

            await prada.deleteOne()

            return res.send({msg: 'Prada deletado com sucesso!', ok: true, prada})
            //const prada = await Prada.findByIdAndDelete(req.params.pradaId, {useFindAndModify: false, new: true})
        } catch (error) {
            return res.status(400).json(error)
        }
    }

}

export default new PradaController()
