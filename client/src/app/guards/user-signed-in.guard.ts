import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UserSignedInGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationsService,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    /* tslint:disable */
    return this.authService.checkToken().map((res) => {
      if (res.result == 'Success') return true; // Can access the route
    }).first()//catch the first Observable
    .catch((e) => {
      this.router.navigateByUrl('/');
      this.notificationService.warn('Acesso Negado', 'Faça o loggin para continuar');
      return new Observable(ob => ob.next(false));
    });
    /* tslint:enable */
  }
}
