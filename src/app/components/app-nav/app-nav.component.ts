import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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
export class AppNavComponent implements OnInit {
  @ViewChild('drawer') private drawer;
  isLoggedIn = 0;
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
      this.breadcumTitle = localStorage.getItem('pagetitle');
      this.breadcumSubTitle = localStorage.getItem('pagesubtitle');
      const t = localStorage.getItem('isLoggedIn');
      if (t) {
        this.isLoggedIn = parseInt(t, 2);
      } else {
        this.isLoggedIn = 0;
      }
      if (this.isLoggedIn === 0) {
        this.drawer.close();
      }
    }, 1000);
  }

  ngOnInit(): void {
    console.log('init');
  }

  async goToPage(page) {
    this.router.navigate(['/' + page]);
    await this.isHandset$.subscribe(data => {
      if (data) {
        this.drawer.close();
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
