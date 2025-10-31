import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-checkout',
  imports: [
    CommonModule,
    CurrencyPipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './check-out.html',
  styleUrl: './check-out.css'
})
export class CheckOut implements OnInit {

  router: Router = inject(Router);
  productModel : any;

  ngOnInit(): void {
      this.productModel = history.state;
  }

  addOff(price: number): number {
    if(price > 1000.00){
      return price * 0.1;
    }
    return 0.00;
  }

}
