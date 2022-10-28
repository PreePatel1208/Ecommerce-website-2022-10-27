import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { JWTDecodeService } from 'src/app/jwt-decode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('kmc@yopmail.com'),
    password: new FormControl('Admin@123'),
  });
  constructor(private auth: AuthService,
    private router: Router,
    private jwt: JWTDecodeService) { }

  ngOnInit(): void {
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        (result: any) => {
          this.jwt.setToken(result.tokens.accessToken)
          if (result.user.role == "user")
            this.router.navigate(['/user-product-list']);
          else
            this.router.navigate(['/product']);
        },
      );
    }
  }

}
