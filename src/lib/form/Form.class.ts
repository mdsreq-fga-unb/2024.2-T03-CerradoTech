/* eslint-disable max-len */
/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { FormType } from '@lib/form/Form.enum';
import { v4 as uuidv4 } from 'uuid';
import { v1 as uuidv1 } from 'uuid';

export class Form {

    private _id: string;
    private _rev: string;
    private _versao: number;
    private _tipoImovel: { id: number; tipo: string };
    private _uf: string;
    private _municipio: { codigo: string; nome: string };
    private _municipioOutro: string;
    private _assentamento: string;
    private _assentamentoOutro: string;
    private _nomeTerritorio: string;
    private _numeroLote: number;
    private _area: string;
    private _moduloFiscal: number;
    private _gpsOuMapa: string;
    private _latitude: number;
    private _longitude: number;

    private _entrevistas: any;
    private _poligonos: any;

    private _criado: string;
    private _editado: string[];
    private _enviado: string[];
    private _statusEnvio: { id: number; nome: string };

    //--------------------------------------



    /// ---------------------------------------------------

    // Constructors and Destructors.
    constructor(usuario: string, obj?: any){
        this._id = obj?._id || this.mongoObjectId();
        this._rev = obj?._rev || '';
        this._versao = obj?.versao || '';
        this._tipoImovel = obj?.tipoImovel || '';
        this._uf = obj?.uf || '';
        this._municipio = obj?.municipio || '';
        this._municipioOutro = obj?.municipioOutro || '';
        this._assentamento = obj?.assentamento || '';
        this._assentamentoOutro = obj?.assentamentoOutro || '';
        this._nomeTerritorio = obj?.nomeTerritorio || '';
        this._numeroLote = obj?.numeroLote || '';
        this._area = obj?.area || '';
        this._moduloFiscal = obj?.moduloFiscal || '';
        this._gpsOuMapa = obj?.gpsOuMapa || '';
        this._latitude = obj?.latitude || '';
        this._longitude = obj?.longitude || '';
        this._entrevistas = obj?.entrevistas || {};
        this._poligonos = obj?.poligonos || {};

        this._criado = `${usuario}`;
        this._editado = obj?.editado || [];
        this._enviado = obj?.enviado || [];
        this._statusEnvio = obj?.statusEnvio || {id:0, nome:'NÃO ENVIADO'};
    }

    public mongoObjectId(){
        const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16)).toLowerCase();
    };

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get rev(): string {
        return this._rev;
    }
    public set rev(value: string) {
        this._rev = value;
    }

    public get statusEnvio(){
        return this._statusEnvio;
    }

    public set statusEnvio(value: {id: number; nome: string}) {
        this._statusEnvio = value;
    }

    public get editado(): any{
        return this._editado;
    }

    public setEditado(value: any) {
        this._editado.push(value);
    }

    public get enviado(): any{
        return this._enviado;
    }

    public set enviado(value: any) {
        this._enviado.push(value);
    }

    public set imovel(formImovel: any){
        this._versao = formImovel.versao;
        this._tipoImovel = formImovel.tipoImovel;
        this._uf = formImovel.uf;
        this._municipio = formImovel.municipio;
        this._municipioOutro = formImovel.municipioOutro;
        this._assentamento = formImovel.assentamento;
        this._assentamentoOutro = formImovel.assentamentoOutro;
        this._numeroLote = formImovel.numeroLote;
        this._nomeTerritorio = formImovel.nomeTerritorio;
        this._area = formImovel.area;
        this._moduloFiscal = formImovel.moduloFiscal;
        this._gpsOuMapa = formImovel.gpsOuMapa;
        this._latitude = formImovel.latitude;
        this._longitude = formImovel.longitude;
        this._entrevistas = formImovel.entrevistas;
        this._poligonos = formImovel.poligonos;
    }

    public editImovel(formImovel: any){
        this._versao = formImovel.versao;
        this._tipoImovel = formImovel.tipoImovel;
        this._uf = formImovel.uf;
        this._municipio = formImovel.municipio;
        this._municipioOutro = formImovel.municipioOutro;
        this._assentamento = formImovel.assentamento;
        this._assentamentoOutro = formImovel.assentamentoOutro;
        this._numeroLote = formImovel.numeroLote;
        this._nomeTerritorio = formImovel.nomeTerritorio;
        this._area = formImovel.area;
        this._moduloFiscal = formImovel.moduloFiscal;
        this._gpsOuMapa = formImovel.gpsOuMapa;
        this._latitude = formImovel.latitude;
        this._longitude = formImovel.longitude;
    }

    public formFieldsByType(type: string){
        if(type === FormType.IMOVEL){ return ['_id', '_rev', 'imovel', 'diario', 'mensal', 'anual', 'enviado', 'criado', 'statusEnvio']; }
    }

    public get form(): any {
        return {
            _id: this._id,
            _rev: this._rev,
            versao: this._versao,
            tipoImovel: this._tipoImovel,
            uf: this._uf,
            municipio: this._municipio,
            municipioOutro: this._municipioOutro,
            assentamento: this._assentamento,
            assentamentoOutro: this._assentamentoOutro,
            numeroLote: this._numeroLote,
            nomeTerritorio: this._nomeTerritorio,
            area: this._area,
            moduloFiscal: this._moduloFiscal,
            gpsOuMapa: this._gpsOuMapa,
            latitude: this._latitude,
            longitude: this._longitude,
            entrevistas: this._entrevistas,
            poligonos: this._poligonos,
            enviado: this._enviado,
            criado: this._criado,
            editado: this._editado,
            statusEnvio: this._statusEnvio
        };
    }

    public get entrevistas(){
        return this._entrevistas;
    }

    public getSocioprodutivo(id: string){
        return this._entrevistas[id];
    }

    public setSocioprodutivo(data: any){
        this._entrevistas[data._id] = data;
    }

    public removeSocioprodutivo(id: string){
        delete this._entrevistas[id];
    }

    public setPoligono(data: any){
        const parcelas = this._poligonos.hasOwnProperty(data._id) ? this._poligonos[data._id].parcelas : {};
        this._poligonos[data._id] = data;
        this._poligonos[data._id].parcelas = parcelas;
    }

    public getPoligono(id: string){
        return this._poligonos[id];
    }

    public removePoligono(id: string){
        delete this._poligonos[id];
    }

    public get poligonos(){
        return this._poligonos;
    }

    public async novoMonitoramento(idPoligono: string, parcelas: any){
        for(const parcela of parcelas){
            this._poligonos[idPoligono].parcelas[parcela._id] = parcela;
        }
        if (this.statusEnvio.id === 1 || this.statusEnvio.id === 3) { this.statusEnvio = { id: 2, nome: 'EXISTEM ALTERAÇÕES NÃO ENVIADAS' }; }
    }

    public async excluirMonitoramento(idPoligono: string, ano: string){
        const parcelas = Object.values(this.poligonos[idPoligono].parcelas);
        let parcelas_ano = parcelas.filter(
            (parcela: any) => parcela.anoMonitoramento === ano
        );
        parcelas_ano = parcelas_ano.map((parcela: any) => parcela._id);
        parcelas_ano.forEach((idParcela: string) => {
            delete this.poligonos[idPoligono].parcelas[idParcela];
        });
        if (this.statusEnvio.id === 1 || this.statusEnvio.id === 3 ) { this.statusEnvio = { id: 2, nome: 'EXISTEM ALTERAÇÕES NÃO ENVIADAS' }; }
    }

    public async alterarParcela(idPoligono, parcela){
        this._poligonos[idPoligono].parcelas[parcela._id] = parcela;
        if (this.statusEnvio.id === 1  || this.statusEnvio.id === 3) { this.statusEnvio = { id: 2, nome: 'EXISTEM ALTERAÇÕES NÃO ENVIADAS' }; }
    }

    public async deletarParcela(idPoligono, idParcela){
        delete this._poligonos[idPoligono].parcelas[idParcela];
        if (this.statusEnvio.id === 1  || this.statusEnvio.id === 3) { this.statusEnvio = { id: 2, nome: 'EXISTEM ALTERAÇÕES NÃO ENVIADAS' }; }
    }
}
