import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { headerDict } from 'src/app/Shared/utils';
interface HeaderDict {
  token: string;
  contentType?: string;
}

const headerDict = (arg: HeaderDict = { token: '', contentType: 'application/json' }) => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ...(arg.contentType && { 'Content-Type': arg.contentType }),
  accept: "application/json",
  "Accept-Language": "en_MX",
  "Content-Type": "multipart/form-data"
});

// const requestOptions = {
//   headers: new HttpHeaders(headerDict()),
// };
const 
requestOptions = {
  headers: new HttpHeaders({
    accept: "application/json",
  "Accept-Language": "en_MX",
  "Content-Type": "multipart/form-data"
  
  }),
};
const url = "http://localhost:9500/api/auth/register"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  register(data :any) {
   
      return this.http.post(url, data, {
        headers: new HttpHeaders({
          "accept":"application/json"
        })
      });

  }
  login({ email, password }: any): Observable<any> {
    return this.http.post("http://localhost:9500/api/auth/login",{ email,password }, {
      headers: new HttpHeaders({
        "accept":"application/json",
        "Content-Type":"application/json"
      })
    });
  
  }
}
