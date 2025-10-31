import { Loading } from './services/loaders/loading';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  Router,
  RouterOutlet,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
} from '@angular/router';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private loading = inject(Loading);

  protected readonly title = signal('elmsAdmin');
  router: Router = inject(Router);

  isLoading: boolean = false;

  ngOnInit(): void {
     this.loading.isloading$().subscribe((isloading: boolean) => {
      this.isLoading = isloading;
     });

    //   this.router.events.subscribe((routerEvent: Event) => {
    //     if (routerEvent instanceof NavigationStart) {
    //       this.Loading.setUpdating(true);
    //     }
    //     if (
    //       routerEvent instanceof NavigationEnd ||
    //       routerEvent instanceof NavigationError ||
    //       routerEvent instanceof NavigationCancel
    //     ) {
    //       // timer(1000).subscribe(() => {
    //       //   this.isLoading = false;
    //       // });
    //       this.Loading.setUpdating(false);
    //     }
    //   });
    // }
  }
}
