import { Component, inject, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  ActivatedRoute,
  NavigationEnd
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeEntityModel } from '../../models/Employee.model';
import { filter, map } from 'rxjs/operators';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { BreakpointObserver } from '@angular/cdk/layout';

// Icon mapping from Bootstrap Icons to Material Icons
const iconMap: { [key: string]: string } = {
  'bi-speedometer2': 'dashboard',
  'bi-people': 'people',
  'bi-calendar-check': 'calendar_today',
  'bi-shield-lock': 'security',
  'bi-box-arrow-in-right': 'login',
  'bi-person-vcard': 'badge'
};

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatBadgeModule
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements OnInit, AfterViewInit {
  pageTitle: string = 'Dashboard';
  pageIcon: string = 'dashboard';
  user!: EmployeeEntityModel;

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  breakpointObserver = inject(BreakpointObserver);

  @ViewChild('sidenav') sidenav!: MatSidenav;

  ngOnInit(): void {
    const userLocal = localStorage.getItem('token');
    if (userLocal) this.user = JSON.parse(userLocal);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      map(route => route.snapshot.data)
    ).subscribe(data => {
      this.pageTitle = data['title'];
      const bootstrapIcon = data['icon'];
      // Convert Bootstrap icon to Material icon
      this.pageIcon = iconMap[bootstrapIcon] || bootstrapIcon || 'dashboard';
    });
  }

  ngAfterViewInit(): void {
    // Handle responsive sidenav - needs to be in AfterViewInit to access ViewChild
    this.breakpointObserver.observe(['(max-width: 960px)']).subscribe(result => {
      if (this.sidenav) {
        if (result.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      }
    });
  }

  closeSidebarOnMobile() {
    if (this.breakpointObserver.isMatched('(max-width: 960px)')) {
      this.sidenav.close();
    }
  }

  logOff() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  get userName(): string {
    const userLocal = localStorage.getItem('token');
    if (userLocal) {
      this.user = JSON.parse(userLocal);
      return this.user.employeeName;
    }
    return '';
  }

  get role(): string {
    const userLocal = localStorage.getItem('token');
    if (userLocal) {
      this.user = JSON.parse(userLocal);
      return this.user.role;
    }
    return '';
  }

  getPageIcon(): string {
    return this.pageIcon;
  }
}
