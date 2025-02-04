/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';
import { Storage } from '@capacitor/storage';

import { User } from '@lib/user/Usuario.class';

import { DatabaseService } from '@services/database.service';
import { MessageService } from './message.service';


import { environment } from '@environments/environment';
import { Router } from '@angular/router';

const TOKEN_KEY = 'rc-token';
const USER_KEY = 'rc-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  user: User;
  constructor(
    private http: HttpClient,
    private databaseService: DatabaseService,
    private msgService: MessageService,
    private router: Router
  ) {
    this.loadToken();
  }

  private async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    const user = await Storage.get({ key: USER_KEY });
    if (user && user.value) {
      this.user = new User(JSON.parse(user.value), token.value);
      this.databaseService.init(this.user.usuario);
    } else {
      this.isAuthenticated.next(false);
    }
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  public login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/authenticate`, credentials).pipe(
      // map((data: any) => data.token),
      // switchMap(token => {
      //   return from(Storage.set({key: TOKEN_KEY, value: token}));
      // }),
      map((data: any) => {
        console.log(data);
        this.user = new User(data.user, data.token);
        this.databaseService.init(this.user.usuario);
        return from(Storage.set({ key: TOKEN_KEY, value: data.token }).then(() => {
          Storage.set({ key: USER_KEY, value: JSON.stringify(data.user) });
        }));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    );
  }

  public signup(register: { nome; dataNascimento; cpf; email; telefone; password }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user`, register).pipe(
      map((data: any) => {
        console.log(data);
        this.user = new User(data.user, data.token);
        this.databaseService.init(this.user.usuario);
        return from(Storage.set({ key: TOKEN_KEY, value: data.token }).then(() => {
          Storage.set({ key: USER_KEY, value: JSON.stringify(data.user) });
        }));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    );
  }

  public changeUser(userId: string, data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/user/${userId}`, data).pipe(
      tap(_ => console.log('fetched user')),
      catchError(this.handleError<any>('changeUser', []))
    );
  }

  public changePassword(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user/changePassword`, data).pipe(
      tap(_ => console.log('change password')),
      catchError(this.handleError<any>('changePassword', []))
    );
  }

  public forgotPassword(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user/forgotPassword`, data).pipe(
      tap(_ => console.log('forgot password')),
      catchError(this.handleError<any>('forgotPassword', []))
    );
  }

  public resetPassword(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user/resetPassword`, data).pipe(
      tap(_ => console.log('reset password')),
      catchError(this.handleError<any>('resetPassword', []))
    );
  }

  public logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({ key: TOKEN_KEY }).then(() => {
      Storage.remove({ key: USER_KEY });
    });
  }

  public updateUserData(newData: any) {
    this.user.nome = newData.nome;
    this.user.dataNascimento = newData.dataNascimento;
    this.user.telefone = newData.telefone;
    this.user.org = newData.org;
    this.user.uf = newData.uf;
    Storage.set({ key: USER_KEY, value: JSON.stringify(this.user.dados()) });
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
