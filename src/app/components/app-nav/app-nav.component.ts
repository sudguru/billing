import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, window } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent {

  isLoggedIn = 1;

  breadcumTitle = '';
  breadcumSubTitle = '';
  pages = [
    { link: '/dashboard', toolTipText: 'Dashboard', icon: 'dashboard' },
    { link: '/students', toolTipText: 'Students', icon: 'supervised_user_circle' },
    { link: '/billing', toolTipText: 'Billing', icon: 'list_alt' },
    { link: '/receipt', toolTipText: 'Receipts', icon: 'receipts' },
    { link: '/users', toolTipText: 'User & Permissions', icon: 'person_add' },
    { link: '/settings', toolTipText: 'Settings', icon: 'settings_applications' },
    { link: '/help', toolTipText: 'Help', icon: 'help' }
  ];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private auth: AuthService
  ) {
    setInterval(() => {
      this.isLoggedIn = parseInt(localStorage.getItem('isLoggedIn'), 2);
      this.breadcumTitle = localStorage.getItem('pagetitle');
      this.breadcumSubTitle = localStorage.getItem('pagesubtitle');
    }, 1000);
  }


  logout() {
    localStorage.setItem('isLoggedIn', '0');
    this.isLoggedIn = 0;
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
