import { CommonModule } from '@angular/common';
import { EmployeeEntityModel } from './../../models/Employee.model';
import { ApiResponse } from './../../models/ApiResponse';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user-service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-employee-detais',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './employee-detais.html',
  styleUrl: './employee-detais.css',
  standalone: true,
})
export class EmployeeDetais implements OnInit {
  activeRouter: ActivatedRoute = inject(ActivatedRoute);
  selectEmployee: EmployeeEntityModel | null = null;
  employeeService = inject(UserService);
  router = inject(Router);

  ngOnInit(): void {
    const id = this.activeRouter.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(Number(id)).subscribe({
        next: (result: ApiResponse<EmployeeEntityModel>) => {
          console.log(result.data);
          this.selectEmployee = result.data;
        },
        error: (error) => {
          console.error('Error fetching employee details:', error);
        },
      });
    }
  }
  goBack(): void {
    this.router.navigate(['/employee']);
  }
}
