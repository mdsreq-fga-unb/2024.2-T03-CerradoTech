/* eslint-disable max-len */
/* eslint-disable no-bitwise */
/* eslint-disable no-underscore-dangle */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, Inject  } from '@angular/core';
import { ParcelaContent } from './ParcelaContent';

export class Parcela {
    private _id: string;

    private _versao = '1.0';

    private _numeroParcela: string;

    private _anoMonitoramento: string;

    private _gpsOuMapa: string;

    private _latitude: any;

    private _longitude: any;

    private _parcelaPermanente: boolean;

    private _coberturaVegetacao: any;

    private _densidadeEspecies: any;

    private _especial: boolean;

    private _editado: string[];

    private _status: {id: number; nome: string};

    private _fotoLocal: any;

    private _fotoRemoto: any;

    private _observacoes: string;

    // constructor( @Inject(String) nome: string, @Inject(String) ano: string, @Inject(Boolean) especial: boolean, permanente: any) {
    constructor( nome: string, ano: string, especial: boolean, permanente: any) {

        const suporte = new ParcelaContent();

        this._id = this.mongoObjectId();
        this._numeroParcela = nome;
        this._anoMonitoramento = ano;

        if(permanente.resp) {
            this._latitude = permanente.latitude;
            this._longitude = permanente.longitude;
            this._gpsOuMapa = 'mapa';
        }
        else {
            this._latitude = 0;
            this._longitude = 0;
        }

        this._parcelaPermanente = permanente.resp;
        this._coberturaVegetacao = this.novaCobertura();
        this._densidadeEspecies = this.novaDensidade();

        this._especial = especial;
        this._status = suporte.statusPreenchimento.nao_iniciado;
        this._editado = [];

        this._fotoLocal = '';
        this._fotoRemoto = '';

        this._observacoes = '';
    }

    public mongoObjectId(){
        const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16)).toLowerCase();
    };

    public get dados() {
        return {
            _id: this.id,
            versao: this.versao,
            numeroParcela: this.numeroParcela,
            anoMonitoramento: this.anoMonitoramento,
            gpsOuMapa: this._gpsOuMapa,
            latitude: this._latitude,
            longitude: this._longitude,
            parcelaPermanente: this.parcelaPermanente,
            coberturaVegetacao: this.coberturaVegetacao,
            densidadeEspecies: this.densidadeEspecies,
            especial: this._especial,
            editado: this.editado,
            status: this._status,
            fotoLocal: this._fotoLocal,
            fotoRemoto: this._fotoRemoto,
            observacoes: this._observacoes
        };
    };

    private novaCobertura() {
        const temp = [];
        for (let i = 0; i < 26; i++) {
            temp.push({
                'tipo': [],
            });
        }
        return temp;
    }

    private novaDensidade() {
        return [
            {
                'regenerante': '',
                'especie': ''
            }
        ];
    }

    //get and setters
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get versao() {
        return this._versao;
    }
    public set versao(value) {
        this._versao = value;
    }

    public get numeroParcela(): string {
        return this._numeroParcela;
    }
    public set numeroParcela(value: string) {
        this._numeroParcela = value;
    }

    public get anoMonitoramento(): string {
        return this._anoMonitoramento;
    }
    public set anoMonitoramento(value: string) {
        this._anoMonitoramento = value;
    }

    public get parcelaPermanente(): boolean {
        return this._parcelaPermanente;
    }
    public set parcelaPermanente(value: boolean) {
        this._parcelaPermanente = value;
    }

    public get coberturaVegetacao(): any {
        return this._coberturaVegetacao;
    }
    public set coberturaVegetacao(value: any) {
        this._coberturaVegetacao = value;
    }

    public get densidadeEspecies(): any {
        return this._densidadeEspecies;
    }
    public set densidadeEspecies(value: any) {
        this._densidadeEspecies = value;
    }

    public get especial(): any {
        return this._especial;
    }

    public get editado(): string[] {
        return this._editado;
    }
    public set editado(value: string[]) {
        this._editado = value;
    }

    public get observacoes(): string {
        return this._observacoes;
    }
    public set observacoes(value: string) {
        this._observacoes = value;
    }
}

