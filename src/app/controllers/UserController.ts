import { Request, Response } from 'express'
import { environment } from '../../environments/environments';
import User from '../schemas/User'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth.json'
import crypto from 'crypto'
import Mailer from '../../modules/mailer'
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(environment.SENDGRID_API_KEY)

const formsVersion = {
    IMOVEL: 1.1,
    POLIGONO: 1.1,
    PARCELA: 1.0,
    SOCIOPRODUTIVO: 1.0,
    PRADA: 1.0
}

class UserController {
    public async index(req: Request, res: Response): Promise<Response> {
        const users = await User.find()

        return res.json(users);
    }

    public generateToken(usuario:any){
        return jwt.sign( usuario, authConfig.secret, {
            expiresIn: 86400, // 1 dia
        });
    }

    public async register(req: Request, res: Response): Promise<Response> {
        const { email } = req.body
        const { cpf } = req.body
        const { usuario } = req.body
        try {
            if (await User.findOne({ email })) return res.status(400).send({ error: 'Email já cadastrado' });
            if (await User.findOne({ cpf })) return res.status(400).send({ error: 'CPF já cadastrado' });
            if (await User.findOne({ usuario })) return res.status(400).send({ error: 'Usuário já cadastrado' });
            const user = await User.create(req.body)
            user.password = undefined
            res.send({
                user,
                token: this.generateToken({ usuario: usuario }),
                formsVersion
            })
        } catch (err) {
            return res.status(400).send({ error: 'Registro falhou' });
        }

    }

    public async authenticate(req: Request, res: Response): Promise<Response> {
        var self = this;
        const { usuario, password } = req.body
        try {
            const user = await User.findOne({ usuario }).select('+password')

            if (!user) return res.status(400).send({ error: 'Usuário ou senha incorreta' })
            if (!await bcrypt.compare(password, user.password)) return res.status(400).send({ error: 'Usuário ou senha incorreta' })

            user.password = undefined
            res.send({
                user,
                token: this.generateToken({ usuario: user.usuario }),
                formsVersion 
            })
        } catch (err) {
            return res.status(400).send({ error: 'Autenticação falhou' });
        }
    }

    public async updateUser(req: any, res: Response): Promise<Response> {
    
        const { nome, dataNascimento, telefone, uf, org } = req.body;
        try{
            const user = await User.findOne({ usuario: req.user });
            if (!user) return res.status(400).send({ error: 'Usuário não encontrado' });
            const data = {
                nome: nome || user.nome,
                dataNascimento: dataNascimento || user.dataNascimento,
                telefone: telefone || user.telefone,
                uf: uf || user.uf,
                org: org || user.org
            };
            await User.updateOne(
                { _id: user._id },
                {
                    $set: req.body,
                    $currentDate: { lastModified: true }
                }
            )
            return res.send({msg: 'Usuário alterado com sucesso!', id: user._id, ok: true})

        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Houve um erro em alterar os dados do usuário. Por favor tente novamente mais tarde.' });
        }
    }

    public async testSecure(req: Request, res: Response): Promise<Response> {
        try { 
            return res.send({msg: "ok"});
        } catch (err) {
            return res.status(400).send({ error: 'Erro testSecure' });
        }
    }

    public async forgotPassword(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;
        let resp = 'Foi enviado um email com as intruções para alteração de senha, verifique sua caixa de entrada.';
        try {
            if (!email) return res.status(400).send({ error: 'Email não informado!' });
            const user = await User.findOne({ email })
            if (!user) return res.status(400).send({ error: 'Email não cadastrado!' });
            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1);
            
            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now,
                }
            })
            
            const msg = {
                to: email,
                from: 'radiscerrado@cegafiunb.com', 
                subject: 'Alteração de senha',
                text: 'Alteração de senha RADIS CERRADO',
                html: `<p>Radis Cerrado</p>
                <p>Caso você tenha solicitado a recuperação de sua senha, insira abaixo no local indicado pelo aplicativo. Se não foi você a solicitar esta recuperação de senha, não se preocupe, nenhuma ação precisa ser tomada.</p>
                <br>
                <p>Você esqueceu sua senha? Utilize esse token: <strong>${token}</strong></p>
                
                <p><strong>Atenção, este token tem validade de 1 hora.</strong></p>`,
              }
              
              await sgMail
                .send(msg).then(() =>{
                    return res.status(200).json({ msg: "Foi enviado um email com as intruções para alteração de senha, verifique sua caixa de entrada." })
                })
                .catch((error: any) => {
                  return res.status(400).json({ error: error });
                })
                return res.status(200).json({ msg: resp });

        } catch (err) {
            return res.status(400).json({ error: 'Não foi possível enviar o e-mail com a recuperação de senha! Por favor, tente novamente mais tarde e se persistir contate a coordenação do projeto!' });
        }
    }

    public async resetPassword(req: Request, res: Response): Promise<Response> {
        const { email, token, password } = req.body

        try {
            const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires');
            if (!user) return res.status(400).send({ error: 'Email não cadastrado!' });
            
            if (token !== user.passwordResetToken) return res.status(400).send({ error: 'Token inválido' });
            
            const now = new Date()
            
            if (now > user.passwordResetExpires) return res.status(400).send({ error: 'Token expirado! Solicite a alteração de senha novamente.' });
            
            user.password = password;

            await user.save();

            return res.send({msg: "Senha atualizada com sucesso!"});
        } catch (err) {
            return res.status(400).send({ error: 'Não foi possível resetar sua senha! Tente novamente mais tarde.' });
        }
    }

    public async changePassword(req: any, res: Response): Promise<Response> {
        const { senhaAtual, novaSenha } = req.body
        const token = req.token;
        const usuario = req.user;
        try{
            if(!usuario) return res.status(400).send({ error: 'Nome de usuário não encontrado' })
            const user = await User.findOne({ usuario }).select('+password')
            if (!user) return res.status(400).send({ error: 'Usuário não encontrado' });
            if (!await bcrypt.compare(senhaAtual, user.password)) return res.status(400).send({ error: 'Senha incorreta' });

            user.password = novaSenha;

            await user.save()
            res.send({msg: 'Senha alterada com sucesso!', ok: true})
        } catch (err) {
            console.log(err)
            return res.status(400).send({ error: 'Não foi possível resetar a senha! Por favor, tente novamente mais tarde e se persistir contate a coordenação do projeto!' });
        }
    }
    
    public async getUser(req: Request, res: Response): Promise<Response> {
        const { userId } = req.params
        try{
            if(!userId) return res.status(400).send({ error: 'Usuário não encontrado' });
            const user = await User.findOne({_id: userId })
            if (!user) return res.status(400).send({ error: 'Usuário não encontrado' });
            

            res.send(user)
        } catch (err) {
            console.log(err)
            return res.status(400).send({ error: 'Não foi possível encontrar este usuário, tente novamente!' });
        }
    }

    /**
     * Delete a User in User Schema
     */
     public async remove(req: Request, res: Response): Promise<Response> {
        try {
            const remove = await User.findByIdAndDelete(req.params.userId)
            return res.send({msg: 'User deletado com sucesso!', id: remove._id, ok: true})
        } catch (error) {
            return res.status(400).json(error)
        }

    }
}

export default new UserController()