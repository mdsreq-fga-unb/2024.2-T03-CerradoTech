/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '@services/database.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogoEspeciesService {
  listaEspecies: any[];

  constructor(private database: DatabaseService) { }

  public async getLista() {
    this.listaEspecies = [];
    return new Promise<any>((resolve, reject) => {
      this.database.catalogoDB.allDocs({
        include_docs: true,
        attachments: false
      }).then((result: any) => {

        result.rows.map((row) => {
          this.listaEspecies.push(row.doc);
        });
        this.listaEspecies = this.listaEspecies.sort((a: any, b: any) => a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0);
        resolve(this.listaEspecies);
      }).catch((err: any) => {
        console.log(err.message);
        reject(err);
      });
    });
  }

  public async salvar(especie: { _id: string; _rev: string; nome: string }) {
    if (especie._id === '') {especie._id = uuidv4();}

    return new Promise<void>((resolve, reject) => {
      especie.nome = especie.nome.trim();
      if(especie.nome.length === 0) {
        reject('Informe o nome da espécie.');
        return;
      }
      this.getLista().then((listaEspecies: any) =>{
        if (listaEspecies.filter(e => e.nome === especie.nome).length > 0) {
         reject('Espécie já existe no catálogo.');
         return;
        }

        this.database.catalogoDB.put(especie).then(
          (resp: any) => {
            resolve(resp);
          }).catch((err) => {
            console.log(err.message);
            reject(err.message);
          });
      });
    });
  }

  public async excluir(especie: { _id: string; _rev: string; nome: string }) {
    return new Promise<void>((resolve, reject) => {
      this.database.catalogoDB.remove(especie).then(
        (resp: any) => {
          resolve(resp);
        }).catch((err) => {
          console.log(err.message);
          reject(err);
        });
    });
  }
}
