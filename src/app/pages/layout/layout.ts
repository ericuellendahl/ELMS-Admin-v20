import { Component, inject, HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';
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

declare var bootstrap: any;

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements OnInit {
  pageTitle: string = 'Dashboard';
  pageIcon: string = 'bi-speedometer2';
  user!: EmployeeEntityModel;
  
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  
  private offcanvas: any;
  private sidebarVisible = false;

  @ViewChild('offcanvasSidebar') offcanvasElement!: ElementRef;

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
      this.pageIcon = data['icon'];
    });
  }

  ngAfterViewInit() {
    // Inicializa o offcanvas do Bootstrap
    this.offcanvas = new bootstrap.Offcanvas(this.offcanvasElement.nativeElement);

    // Fecha o offcanvas quando um link é clicado (em telas móveis)
    const navLinks = document.querySelectorAll('.offcanvas .nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          this.offcanvas.hide();
        }
      });
    });
  }

  // Atualiza a visibilidade da sidebar baseado no tamanho da tela
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateSidebarVisibility();
  }

  private updateSidebarVisibility() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    if (window.innerWidth >= 768) {
      sidebar.classList.remove('d-none');
      this.sidebarVisible = true;
    } else if (!this.sidebarVisible) {
      sidebar.classList.add('d-none');
    }
  }

  // Alterna a visibilidade da sidebar em telas móveis
  toggleSidebar() {
    if (window.innerWidth < 768) {
      this.offcanvas.toggle();
    }
  }

  // Fecha a sidebar quando o mouse sai dela (em telas grandes)
  onMouseLeaveSidebar() {
    if (window.innerWidth >= 1200) {
      // Opcional: adicionar lógica para recolher a sidebar em telas grandes
    }
  }

  logOff() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  // Retorna o nome do usuário logado
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

  // Retorna o email do usuário logado
  getUserInitials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}
