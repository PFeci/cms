import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Role} from '../../../../src/enums/role';

@Injectable()
export class AuthGuardService implements CanActivateChild{

  constructor(private authService: AuthService, private router: Router) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    if (this.authService.getUser() && this.authService.getUser().role === Role.ADMIN) {
      return true;
    }
    this.router.navigate(['/home/event']);
    return false;
  }

}
