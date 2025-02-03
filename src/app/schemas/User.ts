import { Schema, model, Document, Mongoose, Types } from 'mongoose'
import bcrypt from 'bcryptjs'

export const permissao = {
    ADMINISTRADOR: {id: 'Administrador', level: 10000},
    COORDENACAO: {id: 'Coordenação', level: 1000},
    USUARIO: {id: 'Usuário', level: 1},
    BLOQUEADO: {id: 'Bloqueado', level: -1},
}

interface UserInterface extends Document {
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

const UserSchema = new Schema({
    nome: { type: String, required: true, lowercase: true },
    usuario: { type: String, required: true, unique: true},
    dataNascimento: { type: String, required: true, },
    cpf: { type: String, required: true, unique: true},
    email: { type: String, unique: true, required: true, lowercase: true },
    telefone: { type: String, required: true, },
    uf: { type: String, required: true, },
    org: { type: String, required: true, },
    password: { type: String, required: true, select: false },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
    createAt: { type: Date, default: Date.now },
    permissao: {type: Schema.Types.Mixed, default: permissao.USUARIO, select: true}
});

UserSchema.pre<UserInterface>("save", async function (next) {

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next();
})

export default model<UserInterface>('User', UserSchema)