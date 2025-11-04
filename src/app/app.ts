import { Loading } from './services/loaders/loading';
import { Component, inject, OnInit, AfterViewInit, ViewChild, signal, OnDestroy } from '@angular/core';
import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subject, takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { EmployeeEntityModel } from './models/Employee.model';

// Constants
const LOGIN_ROUTE = '/login';
const MOBILE_BREAKPOINT = '(max-width: 960px)';
const TOKEN_KEY = 'token';
const DEFAULT_PAGE_TITLE = 'Dashboard';
const DEFAULT_ICON = 'dashboard';

// Icon mapping from Bootstrap Icons to Material Icons
const ICON_MAP: Record<string, string> = {
  'bi-speedometer2': 'dashboard',
  'bi-people': 'people',
  'bi-calendar-check': 'calendar_today',
  'bi-shield-lock': 'security',
  'bi-box-arrow-in-right': 'login',
  'bi-person-vcard': 'badge'
};

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatBadgeModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  // Services
  private readonly loading = inject(Loading);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly destroy$ = new Subject<void>();

  // State
  protected readonly title = signal('elmsAdmin');
  isLoading = false;
  pageTitle = DEFAULT_PAGE_TITLE;
  pageIcon = DEFAULT_ICON;
  isLoginPage = false;
  user: EmployeeEntityModel | null = null;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  ngOnInit(): void {
    this.initializeLoading();
    this.loadUserFromStorage();
    this.checkCurrentRoute();
    this.subscribeToRouterEvents();
  }

  private initializeLoading(): void {
    this.loading.isloading$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading: boolean) => {
        this.isLoading = isLoading;
      });
  }

  private loadUserFromStorage(): void {
    const userLocal = localStorage.getItem(TOKEN_KEY);
    if (userLocal) {
      try {
        this.user = JSON.parse(userLocal);
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        this.user = null;
      }
    }
  }

  private subscribeToRouterEvents(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.checkCurrentRoute();
        this.updatePageMetadata();
      });
  }

  private checkCurrentRoute(): void {
    this.isLoginPage = this.router.url === LOGIN_ROUTE || this.router.url.startsWith(LOGIN_ROUTE);
  }

  private updatePageMetadata(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    if (route.outlet === 'primary' && route.snapshot.data) {
      const routeData = route.snapshot.data;
      this.pageTitle = routeData['title'] || DEFAULT_PAGE_TITLE;
      const bootstrapIcon = routeData['icon'];
      this.pageIcon = ICON_MAP[bootstrapIcon] || bootstrapIcon || DEFAULT_ICON;
    }
  }

  ngAfterViewInit(): void {
    if (!this.isLoginPage) {
      this.initializeResponsiveSidenav();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeResponsiveSidenav(): void {
    this.breakpointObserver
      .observe([MOBILE_BREAKPOINT])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (!this.sidenav) return;

        if (result.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  closeSidebarOnMobile(): void {
    if (this.breakpointObserver.isMatched(MOBILE_BREAKPOINT) && this.sidenav) {
      this.sidenav.close();
    }
  }

  logOff(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.user = null;
    this.router.navigateByUrl(LOGIN_ROUTE);
  }

  get userName(): string {
    if (!this.user) {
      this.loadUserFromStorage();
    }
    return this.user?.employeeName || '';
  }

  get role(): string {
    if (!this.user) {
      this.loadUserFromStorage();
    }
    return this.user?.role || '';
  }

  getPageIcon(): string {
    return this.pageIcon;
  }
}
