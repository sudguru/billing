import { AuthService } from './../../services/auth.service';
import { LoginAccount } from './../../models/account.model';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  account = {} as LoginAccount;
  validating = false;
  constructor(
    private auth: AuthService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.setItem('pagetitle', 'Login');
    localStorage.setItem('pagesubtitle', '');
  }

  forgotPassword() {

  }

  async login() {

    this.validating = true;
    const result = await this.auth.login(this.account.email, this.account.password);
    if (!result.error) {
      const currentUser = result.user as User;
      this.snackBar.open(`Welcom ${currentUser.name}`, 'Close' , {
        duration: 3000
      });
      this.router.navigate(['/dashboard']);
    } else {
      this.snackBar.open(result.error, 'Close', {
        duration: 3000
      });
    }
    this.validating = false;
  }

}
