import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Loading {
  private loading$ = new BehaviorSubject<boolean>(false);

  isloading$() {
    return this.loading$.asObservable();
  }

  setUpdating(isloading: boolean) {
    this.loading$.next(isloading);
  }
}
