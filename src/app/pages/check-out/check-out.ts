import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule],
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
