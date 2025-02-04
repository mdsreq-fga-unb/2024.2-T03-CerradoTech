/* eslint-disable no-underscore-dangle */
export class User {
    private _id: string;
    private _nome: string;
    private _dataNascimento: string;
    private _usuario: string;
    private _cpf: string;
    private _uf: string;
    private _org: string;
    private _email: string;
    private _telefone: string;
    private _permissao: string;
    private _token: any;


    /// ---------------------------------------------------

    // Constructors and Destructors.
    constructor(userData: any, token: any) {
        this._id = userData._id;
        this._nome = userData.nome;
        this._usuario = userData.usuario;
        this._dataNascimento = userData.dataNascimento;
        this._cpf = userData.cpf;
        this._email = userData.email;
        this._telefone = userData.telefone;
        this._org = userData.org;
        this.uf = userData.uf;
        this._token = token;
    }

    /// ---------------------------------------------------

    // Getters and Setters.

    public get id(): string {
        return this._id;
    }

    public get nome(): string {
        return this._nome;
    }

    public set nome(value: string) {
        this._nome = value;
    }

    public get dataNascimento(): string {
        return this._dataNascimento;
    }

    public set dataNascimento(value: string) {
        this._dataNascimento = value;
    }

    public get usuario(): string {
        return this._usuario;
    }

    public set usuario(value: string) {
        this._usuario = value;
    }

    public get cpf(): string {
        return this._cpf;
    }

    public get uf(): string {
        return this._uf;
    }
    public set uf(value: string) {
        this._uf = value;
    }

    public get org(): string {
        return this._org;
    }
    public set org(value: string) {
        this._org = value;
    }

    public get telefone(): string {
        return this._telefone;
    }
    public set telefone(value: string) {
        this._telefone = value;
    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    public get permissao(): string {
        return this._permissao;
    }
    public set permissao(value: string) {
        this._permissao = value;
    }

    public get token(): string {
        return this._token;
    }
    public set token(value: string) {
        this._token = value;
    }

    public dados(){
        return {
            _id: this._id,
            nome: this._nome,
            usuario: this._usuario,
            dataNascimento: this._dataNascimento,
            cpf: this._cpf,
            email: this._email,
            telefone: this._telefone,
            org: this._org,
            token: this._token
        };
    }


}
