import { Injectable } from '@angular/core';
import  jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class JWTDecodeService {

 
  jwtToken: string | any;
  decodedToken: { [key: string]: string; } | any;

  constructor(private router: Router) {
    this.jwtToken= sessionStorage.getItem('jwt-token')
  }

  setToken(token: string) {
    if (token) {
      sessionStorage.setItem('jwt-token',token);
      console.log( this.jwtToken);
      this.jwtToken= sessionStorage.getItem('jwt-token')
    }
  }
  getToken() {
    if (sessionStorage.getItem('jwt-token')) {
      if(this.isTokenExpired()){
        return   sessionStorage.getItem('jwt-token');
      }else{
        this.router.navigate(['/login']);
      }
      return
    }else{
      this.router.navigate(['/login']);
      return
    }
    
  }


  decodeToken() {
    this.jwtToken= sessionStorage.getItem('jwt-token')
    if (this.jwtToken) {
    this.decodedToken = jwtDecode(this.jwtToken);
   
    }
  }

  getDecodeToken() {
    this.jwtToken= sessionStorage.getItem('jwt-token')
    return jwtDecode(this.jwtToken);
  }

  getUser() {
    this.decodeToken();
    this.jwtToken= sessionStorage.getItem('jwt-token')
    return this.decodedToken ? this.decodedToken['displayname'] : null;
  }

  getEmailId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['email'] : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['exp'] : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: any = this.getExpiryTime();
    console.log(expiryTime);
    
    if (expiryTime) {
      return true
    } else {
      return false;
    }
  }
}
