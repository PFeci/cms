import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Role} from '../../../../src/enums/role';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate{


  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.getUser() && this.authService.getUser().role === Role.ADMIN) {
      return true;
    }
    this.router.navigate(['/home/event']);
    return false;
  }

}
