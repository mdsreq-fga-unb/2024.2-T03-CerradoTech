/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/naming-convention */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
export class PoligonoFormUF{
    constructor(private fb: FormBuilder ){}

    public chooseForm(uf: string){
        switch (uf) {
            case 'DF':
                return this.fb.group({
                    _id: [this.mongoObjectId()],
                    versao: ['1.0'],
                    nomeCod: ['', Validators.required],
                    dataEntrevista: ['', Validators.required],
                    formacaoVegetal: [{}, Validators.required],
                    fitofisionomia: [{}],
                    tipoArea: [{}],
                    classificacaoArea: [{}],
                    utilizacaoAnterior: [{}],
                    utilizacaoAnteriorOutro: [''],
                    coberturaAtual: [{}],
                    coberturaAtualOutro: [''],
                    suspensaoImediata: [{}],
                    necessarioCercar: [{}],
                    possivelCercar: [{}],
                    gpsOuMapa: [''],
                    desenhoOuCar: [''],
                    latitude: [0],
                    longitude: [0],
                    areaValor: [''],
                    areaPontos: [{}],
                    grade: [{}],
                    funcaoRecomposicao: this.fb.array([]),
                    funcaoRecomposicao_outro: [''],
                    quantidadeParticipantes: [0],
                    quantidadeParcelas: [0],
                    tipo: [0],
                    parcelas: [{}],
                    editado: [[]],
                  });
            default:
                console.log('Não foi Informado UF');
                break;
        }
    }

    public mongoObjectId(){
        const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16)).toLowerCase();
    };
}
