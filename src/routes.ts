import { Router } from 'express';
import FileUploadController from './app/controllers/FileUploadController';
import ImovelController from './app/controllers/ImovelController';
import PradaController from './app/controllers/PradaController';
import SicarController from './app/controllers/SicarController';
import UserController from './app/controllers/UserController';
import auth from './app/middlewares/auth';



/**
 * Exemplo para usar rota segura:
 * na requisição adicionar no header Authorization
 * formato: Bearer token
 * 
 * na rota o segundo argumento deve ser auth.verifyToken, e o terceiro argumento o método a ser executado na rota normalmente
 * 
 * lembrando que dentro da req será possível puxar o userId 
 * 
 * ex: routes.get('/auth', auth.verifyToken ,UserController.index) //Lista todas os usuários salvos
 */

const routes = Router()


routes.get('/auth/all', auth.verifyToken, UserController.index.bind(UserController))
routes.post('/auth/register', UserController.register.bind(UserController)) //Cria um novo usuário e trás o token
routes.post('/auth/authenticate', UserController.authenticate.bind(UserController)) //Realiza o login
routes.post('/auth/forgotPassword', UserController.forgotPassword.bind(UserController)) //Envia email de recuperação de senha, com validade de token de 1 hora.
routes.post('/auth/resetPassword', UserController.resetPassword.bind(UserController)) //Cria uma nova senha mediante a inserção do token recebido por e-mail
routes.post('/auth/changePassword', auth.verifyToken, UserController.changePassword.bind(UserController)) // Altera a senha informando a senha antiga
routes.put('/auth/:userId', auth.verifyToken, UserController.updateUser.bind(UserController)) //altera dados do usuário;
routes.get('/auth/get/:userId', auth.verifyToken, UserController.getUser.bind(UserController)) //retorna dados do usuário;
routes.delete('/auth/:userId', auth.verifyToken, UserController.remove.bind(UserController)) //remover usuário;

routes.get('/auth/teste', auth.verifyToken, UserController.testSecure.bind(UserController)) //teste
//===================================================
routes.post('/user', UserController.register.bind(UserController)) //Cria um novo usuário e trás o token
routes.put('/user/:userId', auth.verifyToken, UserController.updateUser.bind(UserController)) //altera dados do usuário;
routes.delete('/user/:userId', auth.verifyToken, UserController.remove.bind(UserController)) //deleta o usuário;

routes.get('/user/all', auth.verifyToken, UserController.index.bind(UserController))
routes.post('/user/authenticate', UserController.authenticate.bind(UserController)) //Realiza o login
routes.post('/user/forgotPassword', UserController.forgotPassword.bind(UserController)) //Envia email de recuperação de senha, com validade de token de 1 hora.
routes.post('/user/resetPassword', UserController.resetPassword.bind(UserController)) //Cria uma nova senha mediante a inserção do token recebido por e-mail
routes.post('/user/changePassword', auth.verifyToken, UserController.changePassword.bind(UserController)) // Altera a senha informando a senha antiga

routes.get('/user/teste', UserController.testSecure.bind(UserController)) //teste
//=====================================================================================================================
routes.post('/imovel', auth.verifyToken, ImovelController.create.bind(ImovelController)) // Cria um imóvel no BD
routes.get('/imovel/:idImovel', auth.verifyToken, ImovelController.getById.bind(ImovelController)) //Recupera um imóvel pelo Id
routes.put('/imovel/:idImovel', auth.verifyToken, ImovelController.update.bind(ImovelController)) //Atualiza um imóvel pelo Id
routes.delete('/imovel/:idImovel', auth.verifyToken, ImovelController.removeImovel.bind(ImovelController)) //Remove um imóvel pelo Id
routes.get('/imoveis', auth.verifyToken, ImovelController.getAll.bind(ImovelController)) //Recupera todos os imóveis
routes.get('/imoveis/user/:userId', auth.verifyToken, ImovelController.getByUser.bind(ImovelController)) //Recupera todos os imóveis do mesmo usuário

routes.get('/sicar', auth.verifyToken, SicarController.getAll.bind(SicarController)) //Recuperar todos os sicars
routes.get('/sicar/:sicarId', auth.verifyToken, SicarController.getSicarById.bind(SicarController)) //Recuperar os sicars por ID
routes.get('/sicar/imovel/:imovelId', auth.verifyToken, SicarController.imovelSicar.bind(SicarController)) //Retorna os Sicars de um imóvel
routes.post('/sicar/create', auth.verifyToken, SicarController.registerSicar.bind(SicarController)) //Criar cicar pelos mockups <--- RETIRAR DEPOIS DE RECEBER OS DADOS
routes.delete('/sicar/delete/:sicarId', auth.verifyToken, SicarController.delete.bind(SicarController)) //Deletar Sicar pelo ID

routes.get('/prada', auth.verifyToken, PradaController.getAll.bind(PradaController)) //Todos os pradas
routes.get('/prada/:pradaId', auth.verifyToken, PradaController.getPradaById.bind(PradaController)) //Pegar prada por id
routes.get('/prada/imovel/:imovelId', auth.verifyToken, PradaController.imovelPrada.bind(PradaController))
routes.post('/prada/create', auth.verifyToken, PradaController.registerPrada.bind(PradaController)) //Criar prada
routes.put('/prada/:idPrada', auth.verifyToken, PradaController.update.bind(PradaController)) //Atualiza um imóvel pelo Id
routes.delete('/prada/delete/:pradaId', auth.verifyToken, PradaController.delete.bind(PradaController)) //Deletar prada

//routes.post('/upload/pdf/:directory', auth.verifyToken, FileUploadController.readPdf.bind(FileUploadController)) //Leitor de PDF que retorna os dados do PDF
//routes.post('/upload/aws/:directory', auth.verifyToken, FileUploadController.fileUpload.bind(FileUploadController))
routes.post('/upload/file/:directory', auth.verifyToken, FileUploadController.uploadFile.bind(FileUploadController))
routes.get('/upload/files/preview/:filename', FileUploadController.getFile.bind(FileUploadController))


routes.get('/imoveis', auth.verifyToken, ImovelController.getAll.bind(ImovelController)) //Recupera todos os imóveis
routes.get('/imoveis/user/:userId', auth.verifyToken, ImovelController.getByUser.bind(ImovelController)) //Recupera todos os imóveis do mesmo usuário
//=====================================================================================================================
routes.put('/poligono/:idImovel/:idPoligono', auth.verifyToken, ImovelController.removePoligono.bind(ImovelController)) //Remove um imóvel pelo Id
routes.put('/parcela/:idImovel/:idPoligono/:idParcela', auth.verifyToken, ImovelController.removeParcela.bind(ImovelController)) //Remove um imóvel pelo Id
routes.put('/monitoramento/:idImovel/:idPoligono/:ano', auth.verifyToken, ImovelController.removeMonitoramento.bind(ImovelController)) //Remove um imóvel pelo Id
//========================================================================================================================
routes.put('/socioprodutivo/:idImovel/:idSocioprodutivo', auth.verifyToken, ImovelController.removeEntrevista.bind(ImovelController)) //Remove um imóvel pelo Id

export default routes