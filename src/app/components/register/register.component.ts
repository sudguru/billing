import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user = {} as User;
  validating = false;
  constructor(private router: Router, private auth: AuthService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    localStorage.setItem('pagetitle', 'Register');
    localStorage.setItem('pagesubtitle', '');
  }

  async register() {
    this.validating = true;
    const result = await this.auth.register(this.user.email, this.user.password, this.user.name);
    if (!result.error) {
      this.snackBar.open(`User Successfully Created.`, 'Close', {
        duration: 3000
      });
      this.validating = false;
    } else {
      this.validating = false;
      this.snackBar.open(result.error, 'Close', {
        duration: 3000
      });
    }
  }
  gotoLogin() {
    this.router.navigateByUrl('/');
  }

}
