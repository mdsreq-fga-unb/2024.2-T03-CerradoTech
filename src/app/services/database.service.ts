/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-var */

import { Injectable } from '@angular/core';
// import { resolve } from 'dns';
import PouchDB from 'pouchdb';
import { AnonymousSubject, Subject } from 'rxjs/internal/Subject';
import { Form } from '@lib/form/Form.class';
import { MyCoords } from '@lib/User/Coordenadas.class';
import { FormType } from '@lib/form/Form.enum';
// import { rejects } from 'assert';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { environment } from '@environments/environment';
import { NetworkService, ConnectionStatus } from '@services/network.service';
import { Router } from '@angular/router';

import { Storage } from '@capacitor/storage';

const TOKEN_KEY = 'rc-token';
const USER_KEY = 'rc-user';
@Injectable({
  providedIn: 'root'
})


export class DatabaseService {

  public usuario: any;
  public syncAux = new Subject<any>();
  public catalogoDB: any;

  private usuarioDb: any;
  private imovelDb: any;
  private data: any;
  private formData: Form;
  myCoordsDB: any;

  constructor(private http: HttpClient, private msgService: MessageService, private networkService: NetworkService, private router: Router) {
    this.data = {
      usuario: [],
      forms: [],
    };

    // this.init();
  }

  init(username: string) {
    this.usuario = username;
    this.usuarioDb = new PouchDB(`radisCerrado-usuarios$${this.usuario}`);
    this.imovelDb = new PouchDB(`radisCerrado-imoveis$${this.usuario}`);
    this.catalogoDB = new PouchDB(`radisCerrado-catalogo$${this.usuario}`);
    this.myCoordsDB = new PouchDB(`radisCerrado-myCoords$${this.usuario}`);
  }

  private definirBanco(tipo: string, flagLocal: boolean) {
    let db: any;
    var self = this;
    switch (tipo) {
      case FormType.USER:
        if (flagLocal) { db = self.usuarioDb; }
        // else db = self.remote_usuario;
        break;

      default:
        if (flagLocal) { db = self.imovelDb; }
        break;
    }

    return db;
  }

  public saveNewCoord(data) {
    return new Promise((resolve, reject) => {
      if (data.name === '') { reject('Atenção! Houve um erro ao salvar a localização pois não foi informado seu nome'); }

      this.getCoords().then((resp) => {
        console.log('resposta: ', resp);
        const myCoords = new MyCoords(false, resp);
        myCoords.addNewCoord(data);
        this.myCoordsDB.put(myCoords.data).then((response: any) => {
          console.log(response);
          resolve('Localidade salva com sucesso');
        }).catch((err) => {
          console.log(err);
          reject('Atenção! Houve um erro ao salvar sua localização! Tente novamente mais tarde');
        });
      }).catch((error) => {
        console.log(error);
        if (error.status === 404 && error.name === 'not_found') {
          const myCoords = new MyCoords(true, {}, data);
          this.myCoordsDB.put(myCoords.data).then((response: any) => {
            console.log(response);
            resolve('Localidade salva com sucesso');
          }).catch((err) => {
            console.log(err);
            reject('Atenção! Houve um erro ao salvar sua localização! Tente novamente mais tarde');
          });
        }
      });
    });
  }

  public editCoord(newCoord, id) {
    return new Promise((resolve, reject) => {
      this.getCoords().then((resp) => {
        const myCoords = new MyCoords(false, resp);
        myCoords.editCoord(newCoord, id);
        this.myCoordsDB.put(myCoords.data).then((response: any) => {
          console.log(response);
          resolve('Localidade alterada com sucesso');
        }).catch((err) => {
          console.log(err);
          reject('Atenção! Houve um erro ao alterar sua localização! Tente novamente mais tarde');
        });
      }).catch((error) => {
        console.log(error);
        reject('Atenção! Não foi encontrada nenhuma localização salva');
      });
    });
  }

  public getCoords() {
    return new Promise((resolve, reject) => {

      this.myCoordsDB.get('my-coords').then((result) => {
        console.log(result);
        resolve(result);
      }).catch((error) => {

        console.log(error);
        reject(error);
      });

    });
  }

  public deleteCoord(id) {
    return new Promise((resolve, reject) => {
      this.getCoords().then((resp) => {
        const myCoords = new MyCoords(false, resp);
        myCoords.removeCoord(id);
        this.myCoordsDB.put(myCoords.data).then((response: any) => {
          console.log(response);
          resolve('Localidade removida com sucesso');
        }).catch((err) => {
          console.log(err);
          reject('Atenção! Houve um erro ao remover sua localização! Tente novamente mais tarde');
        });
      }).catch((error) => {
        console.log(error);
        reject('Atenção! Não foi encontrada nenhuma localização salva');
      });
    });
  }

  public salvarFormulario(type: string, form: any, newForm?: boolean, imovelId?: string, isUpload?: boolean, isSync?: boolean, changeDate?: { change: boolean; date: string }) {
    var self = this;
    const db = self.definirBanco(type, true);

    return new Promise((resolve, reject) => {
      try {
        if (!newForm && imovelId === undefined) { reject('ID do imóvel não informado'); }

        if (isSync) {
          this.imovelDb.put(form, { force: true }).then((response: any) => {
            console.log(response);
            if (response.ok) {
              form._rev = response.rev;
              resolve(form);
            } else {
              reject('Um erro inesperado aconteceu, por favor reinicie o aplicativo e tente novamente.');
            }

          }).catch((error) => {
            console.log(error);
            reject('Um erro inesperado aconteceu, por favor reinicie o aplicativo e tente novamente.');
          });
        } else if (isUpload) {
          form.statusEnvio = { id: 1, nome: 'ENVIADO' };
          form.enviado.push(new Date().toISOString());
          this.imovelDb.put(form).then((response: any) => {
            console.log(response);
            if (response.ok) {
              form._rev = response.rev;
              resolve(form);
            } else {
              reject('Um erro inesperado aconteceu, por favor reinicie o aplicativo e tente novamente.');
            }

          }).catch((error) => {
            console.log(error);
            reject('Um erro inesperado aconteceu, por favor reinicie o aplicativo e tente novamente.');
          });
        } else if (type === FormType.IMOVEL && newForm) {
          this.formData = new Form(this.usuario, form);
          db.put(this.formData.form).then((response: any) => {
            console.log(response);
            resolve('Salvo com sucesso');
          }).catch((error) => {
            console.log(error);
            reject('Um erro inesperado aconteceu, por favor reinicie o aplicativo e tente novamente.');
          });
        } else {
          self.getImovelById(imovelId).then((resp: Form) => {
            if (type === FormType.IMOVEL) {
              resp.editImovel(form);
              resp.setEditado(this.usuario + '_' + new Date().toISOString());
            } else if (type === FormType.POLIGONO) {
              resp.setPoligono(form);
            } else if (type === FormType.SOCIOPRODUTIVO) {
              resp.setSocioprodutivo(form);
            }
            if (resp.statusEnvio.id === 1 || resp.statusEnvio.id === 3) { resp.statusEnvio = { id: 2, nome: 'EXISTEM ALTERAÇÕES NÃO ENVIADAS' }; }
            console.log(resp);
            db.put(resp.form).then((response: any) => {
              console.log(response);
              resolve('Salvo com sucesso');
            }).catch((error) => {
              console.log(error);
              reject('Um erro inesperado aconteceu, por favor reinicie o aplicativo e tente novamente.');
            });
          }).catch((error) => {
            console.log(error);
            reject('Um erro inesperado aconteceu, por favor reinicie o aplicativo e tente novamente.');
          });
        }
      } catch (error) {
        reject('Um erro inesperado aconteceu, por favor reinicie o aplicativo e tente novamente.');
      }

    });
  }

  public alterarStatus(form: any, status: any) {
    return new Promise((resolve, reject) => {
      form.statusEnvio = status;
      this.imovelDb.put(form).then((response: any) => {
        console.log(response);
        if (response.ok) {
          form._rev = response.rev;
          resolve(form);
        } else {
          reject('Um erro inesperado aconteceu, por favor reinicie o aplicativo e tente novamente.');
        }
      });
    });

  }

  public salvarMonitoramento(idImovel: string, idPoligono: string, parcelas: any) {
    return new Promise<void>((resolve, reject) => {
      this.getImovelById(idImovel).then(async (imovel: Form) => {
        await imovel.novoMonitoramento(idPoligono, parcelas);
        this.imovelDb.put(imovel.form).then((response: any) => {
          console.log(response);
          if (response.ok) {
            imovel.form._rev = response.rev;
            resolve(imovel.form);
          } else {
            reject('Um erro inesperado aconteceu, por favor reinicie o aplicativo e tente novamente.');
          }

        });
      });
    });
  }

  public async excluirMonitoramento(idImovel: string, idPoligono, ano: any) {
    return new Promise<any>((resolve, reject) => {
      this.getImovelById(idImovel).then(async (imovel: Form) => {

        imovel.excluirMonitoramento(idPoligono, ano);

        if (imovel.statusEnvio.id === 1 || imovel.statusEnvio.id === 3) { imovel.statusEnvio = { id: 2, nome: 'EXISTEM ALTERAÇÕES NÃO ENVIADAS' }; }
        this.imovelDb.put(imovel.form).then(
          (resp: any) => {
            resolve(resp);
          }).catch((err) => {
            console.log(err.message);
            reject(err);
          });
      });
    });
  }

  public salvarParcela(idImovel: string, idPoligono: string, parcela: any) {
    return new Promise<string>((resolve, reject) => {
      this.getImovelById(idImovel).then(async (imovel: Form) => {
        await imovel.alterarParcela(idPoligono, parcela);
        this.imovelDb.put(imovel.form).then((response: any) => {
          console.log(response);
          if (response.ok) {
            imovel.form._rev = response.rev;
            resolve('Parcela salva com sucesso!');
          } else {
            reject('Um erro inesperado aconteceu, por favor reinicie o aplicativo e tente novamente.');
          }
        });
      });
    });
  }

  public excluirParcela(idImovel: string, idPoligono: string, idParcela: string) {
    return new Promise<string>((resolve, reject) => {
      this.getImovelById(idImovel).then(async (imovel: Form) => {
        await imovel.deletarParcela(idPoligono, idParcela);
        this.imovelDb.put(imovel.form).then((response: any) => {
          console.log(response);
          if (response.ok) {
            imovel.form._rev = response.rev;
            resolve('Parcela excluída com sucesso!');
          } else {
            reject('Um erro inesperado aconteceu, por favor reinicie o aplicativo e tente novamente.');
          }
        });
      });
    });
  }

  getTodosFormularios(tipo: string, include_docs?: boolean, attachments?: boolean) {
    var self = this;
    const db = self.definirBanco(tipo, true);
    return new Promise(resolve => {

      db.allDocs({

        include_docs: include_docs || true,
        attachments: attachments || false

      }).then((result) => {
        let obj;

        if (tipo === FormType.USER) { obj = FormType.USER; }
        else { obj = FormType.IMOVEL; }

        self.data[obj] = [];

        const docs = result.rows.map((row) => {
          self.data[obj].push(row.doc);
        });

        if (tipo === FormType.USER) { resolve(self.data[FormType.USER]); }
        else if (tipo === FormType.IMOVEL) {
          resolve(self.data[FormType.IMOVEL]);
        }
        db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
          self.handleChange(change, tipo);
        });

      }).catch((error) => {

        console.log(error);

      });

    });

  }

  getById(tipo: string, id: string) {
    // let db: any;
    var self = this;

    const db = self.definirBanco(tipo, true);
    return new Promise((resolve, reject) => {
      db.get(id).then((result => {
        resolve(result);
      })).catch((error) => {

        console.log(error);
        reject(error);
      });
    });
  }

  getImovelById(id: string) {
    var self = this;
    return new Promise((resolve, reject) => {
      this.imovelDb.get(id).then((result => {
        const imovel = new Form(result.criado, result);
        resolve(imovel);
      })).catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  getPoligonoById(imovelId: string, poligonoId: string) {
    var self = this;
    return new Promise((resolve, reject) => {
      this.imovelDb.get(imovelId).then((result => {
        const imovel = new Form(result.criado, result);
        resolve({ data: imovel.getPoligono(poligonoId), statusEnvio: imovel.statusEnvio });
      })).catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  public uploadNewImovel(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/imovel`, data).pipe(
      tap((msg: any) => console.log(`added imovel w/ id=${msg.id}`)),
      catchError(this.handleError<any>('uploadForm'))
    );
  }

  public uploadEditedForm(data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/imovel/${data._id}`, data).pipe(
      tap((msg: any) => console.log(`edited imovel w/ id=${msg.id}`)),
      catchError(this.handleError<any>('uploadEditForm'))
    );
  }

  public deleteRemoteForm(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/imovel/${id}`).pipe(
      tap((msg: any) => console.log(`remove imovel w/ id=${msg.id}`)),
      catchError(this.handleError<any>('removeRemote'))
    );
  }

  public getRemoteAllImoveis(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/imoveis`).pipe(
      tap(_ => console.log('fetched heroes')),
      catchError(this.handleError<any>('getHeroes', []))
    );
  }

  public getRemoteImoveisByUsername(usuario: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/imoveis/user/${usuario}`).pipe(
      tap(_ => console.log('remote imoveis by cpf')),
      catchError(this.handleError<any>('imoveisCPF', []))
    );
  }

  public deleteRemoteSocioprodutivo(idImovel: string, idSocioprodutivo: string, statusEnvio: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/socioprodutivo/${idImovel}/${idSocioprodutivo}`, { statusEnvio }).pipe(
      tap((msg: any) => console.log(`remove socioprodutivo w/ id=${msg.id}`)),
      catchError(this.handleError<any>('removeRemote'))
    );
  }

  public deleteRemotePoligono(idImovel: string, idPoligono: string, statusEnvio: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/poligono/${idImovel}/${idPoligono}`, { statusEnvio }).pipe(
      tap((msg: any) => console.log(`remove poligono w/ id=${msg.id}`)),
      catchError(this.handleError<any>('removeRemote'))
    );
  }

  public deleteRemoteParcela(idImovel: string, idPoligono: string, idParcela: string, statusEnvio: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/parcela/${idImovel}/${idPoligono}/${idParcela}`, { statusEnvio }).pipe(
      tap((msg: any) => console.log(`remove parcela w/ id=${msg.id}`)),
      catchError(this.handleError<any>('removeRemote'))
    );
  }

  public deleteRemoteMonitoramento(idImovel: string, idPoligono: string, anoMonitoramento: any, statusEnvio: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/monitoramento/${idImovel}/${idPoligono}/${anoMonitoramento}`, { statusEnvio }).pipe(
      tap((msg: any) => console.log(`remove monitoramento w/ id=${msg.id}`)),
      catchError(this.handleError<any>('removeRemote'))
    );
  }

  public syncImoveis(usuario: string) {
    var self = this;
    var count = 0;
    var errorSync = false;
    if (self.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline) {
      self.setSyncAux(false);
      self.msgService.messageAlert('Você precisa ter uma conexão com a internet para realizar esta operação.');
      return;
    }
    self.getRemoteImoveisByUsername(usuario)
      .subscribe((resp: any) => {
        this.msgService.showLoading();
        const arrayImoveis = resp;
        if (resp.length === 0) {
          self.setSyncAux(true);
          this.msgService.messageAlert('Não foi encontrado nenhum imóvel cadastrado a partir do seu nome de usuário nas nossas bases de dados.');
          return;
        }

        for (const imovel of arrayImoveis) {
          self.getById(FormType.IMOVEL, imovel._id).then((data: any) => {
            if (+data._rev.split('-')[0] < +imovel._rev.split('-')[0]) {
              //Versão remota mais atualizada que local;
              const updateImovel = new Form(imovel.criado, imovel);
              self.salvarFormulario(FormType.IMOVEL, updateImovel.form, false, updateImovel.id, false, true).then((resp: string) => {
                console.log(resp);
                count++;
                if (count >= arrayImoveis.length) {
                  self.setSyncAux(errorSync);
                }
                // self.msgService.messageAlert(resp);
              }).catch((error) => {
                console.log(error);
                // self.msgService.messageAlert("Um erro inesperado aconteceu, por favor tente novamente mais tarde");
                count++;
                errorSync = true;
                if (count >= arrayImoveis.length) {
                  self.setSyncAux(errorSync);
                }
              });
            } else if (data._rev.split('-')[0] > imovel._rev.split('-')[0]) {
              //Versão remota mais antiga que local;
              count++;
              if (count >= arrayImoveis.length) {
                self.setSyncAux(errorSync);
              }
              console.log('Versão remota mais antiga que local');
            } else {
              count++;
              if (count >= arrayImoveis.length) {
                self.setSyncAux(errorSync);
              }
              console.log('Outro caso');
            }
          }).catch((error) => {
            if (error.reason === 'missing') {
              const updateImovel = new Form(imovel.criado, imovel);
              self.salvarFormulario(FormType.IMOVEL, updateImovel.form, false, updateImovel.id, false, true).then((resp: string) => {
                console.log(resp);
                count++;
                if (count >= arrayImoveis.length) {
                  self.setSyncAux(errorSync);
                }
              }).catch((error) => {
                count++;
                errorSync = true;
                if (count >= arrayImoveis.length) {
                  self.setSyncAux(errorSync);
                }
              });
            } else {
              count++;
              errorSync = true;
              if (count >= arrayImoveis.length) {
                self.setSyncAux(errorSync);
              }
            }
          });
        }
      });
  }

  public devDestroyLocal() {
    this.imovelDb.destroy().then(() => {
      console.log('Local destruído');
    });
  }

  private setSyncAux(errorSync: boolean) {
    this.syncAux.next(errorSync);
  }

  private handleChange(change: any, tipo: string) {

    let changedDoc = null;
    let changedIndex = null;

    this.data[tipo].forEach((doc, index) => {

      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }

    });

    //A document was deleted
    if (change.deleted) {
      this.data[tipo].splice(changedIndex, 1);
    }
    else {

      //A document was updated
      if (changedDoc) {
        this.data[tipo][changedIndex] = change.doc;
      }

      //A document was added
      else {
        this.data[tipo].push(change.doc);
      }

    }

  }

  public deleteImovel(id: any) {
    // self.dialogo.showLoading();
    return new Promise((resolve, reject) => {
      this.imovelDb.get(id).then((form => {
        this.imovelDb.remove(form).then((res) => {
          console.log(res);
          resolve(res);
        }).catch((err) => {
          console.log(err);
          reject();
        });
      }));
    });
  }

  public deleteSocioprodutivo(idImovel: string, idSocioprodutivo: string) {
    // self.dialogo.showLoading();
    return new Promise((resolve, reject) => {
      this.getImovelById(idImovel).then((resp: Form) => {
        resp.removeSocioprodutivo(idSocioprodutivo);
        // resp.imovel.editado.push(this.usuario + '_' + new Date().toISOString());
        if (resp.statusEnvio.id === 3) { resp.statusEnvio = { id: 2, nome: 'EXISTEM ALTERAÇÕES NÃO ENVIADAS' }; }
        this.imovelDb.put(resp.form).then((response: any) => {
          resolve('Questionário socioprodutivo excluído com sucesso');
        });
      });
    });
  }

  public deletePoligono(idImovel: string, idPoligono: string) {
    // self.dialogo.showLoading();
    return new Promise((resolve, reject) => {
      this.getImovelById(idImovel).then((resp: Form) => {
        resp.removePoligono(idPoligono);
        // resp.imovel.editado.push(this.usuario + '_' + new Date().toISOString());
        if (resp.statusEnvio.id === 3) { resp.statusEnvio = { id: 2, nome: 'EXISTEM ALTERAÇÕES NÃO ENVIADAS' }; }
        this.imovelDb.put(resp.form).then((response: any) => {
          resolve('Polígono excluído com sucesso');
        });
      });
    });
  }

  public testConection() {
    // return new Promise((resolve, reject) => {
    //   if (this.serverConf.verficarInternet()) {
    //     this.serverConf.verificarAcessoServidor().then(() => {
    //       resolve()
    //     }).catch(() => {
    //       reject("Sua rede não tem acesso aos nossos servidores, por favor troque sua conexão, como por exemplo sua rede de dados móveis ou uma rede que não seja bloqueada, e reinicie o aplicativo.");
    //     });
    //   }
    //   else {
    //     reject("Internet indisponível. Para realizar esta operação você precisa estar conectado à internet. Por favor, tente novamente.");
    //   }
    // })
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      if (error?.status === 401 && error?.statusText === 'Unauthorized') {
        this.msgService.messageAlert('Sua sessão expirou! Por favor faça o login novamente.');
        Storage.remove({ key: TOKEN_KEY }).then(() => {
          Storage.remove({ key: USER_KEY });
        });
        this.router.navigateByUrl('/login', { replaceUrl: true });
      } else if (error?.error?.msg?.code === 11000) {
        this.msgService.messageAlert('Este imóvel já existe em nossas bases de dados!');
      } else if (operation === 'uploadForm') {
        this.msgService.messageAlert('Houve um erro ao enviar os dados para nossos servidores, por favor, tente novamente mais tarde.');
      } else {
        this.msgService.messageAlert('Houve um erro ao se comunicar com nossos servidores, por favor tente mais tarde e se persistir contate a administração do projeto');
      }
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
