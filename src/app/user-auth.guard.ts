import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
import { JWTDecodeService } from './jwt-decode.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private router: Router,  
    private auth: AuthService,  
    private Jwt: JWTDecodeService,  
    ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.Jwt.isLoggedIn()) {
        this.router.navigate(['/login']);
      }
      return this.Jwt.isLoggedIn();
  }
  
}
