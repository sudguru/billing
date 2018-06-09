import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    console.log(token, isExpired);
    if (token && !isExpired) {
      localStorage.setItem('isLoggedIn', '1');
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['']);
    return false;
  }
}
