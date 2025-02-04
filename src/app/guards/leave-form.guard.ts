/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface isDeactivatable {
  canPageLeave: (
    nextUrl?: string
  ) => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LeaveFormGuard implements CanDeactivate<isDeactivatable> {
  canDeactivate(
    component: isDeactivatable,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean  {
    return component.canPageLeave(nextState.url);
  }

}

/**
 * Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean |UrlTree
 */
