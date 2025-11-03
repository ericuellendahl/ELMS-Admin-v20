import { Component, inject, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/user/user-service';
import { EmployeeEntityModel } from '../../models/Employee.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiResponse } from '../../models/ApiResponse';
import { Router } from '@angular/router';
import { Loading } from '../../services/loaders/loading';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from './employee-dialog.component';

@Component({
  selector: 'app-employee',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule
  ],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
  standalone: true,
})
export class Employee implements OnInit, OnDestroy, AfterViewInit {
  userservice = inject(UserService);
  private loading = inject(Loading);
  private dialog = inject(MatDialog);

  userEmployees: EmployeeEntityModel[] = [];
  isModalOpen: boolean = false;
  searchTerm: string = '';

  displayedColumns: string[] = ['id', 'employeeId', 'name', 'email', 'role', 'actions'];
  dataSource: MatTableDataSource<EmployeeEntityModel> = new MatTableDataSource<EmployeeEntityModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  router: Router = inject(Router);
  unsubscribe: any;

  ngOnInit(): void {
    // Configure custom filter to search by name, email and role
    this.dataSource.filterPredicate = (data: EmployeeEntityModel, filter: string): boolean => {
      const normalized = filter.trim().toLowerCase();
      return (
        (data.employeeName || '').toLowerCase().includes(normalized) ||
        (data.emailId || '').toLowerCase().includes(normalized) ||
        (data.role || '').toLowerCase().includes(normalized)
      );
    };
    this.getEmployees();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getEmployees() {
    this.loading.setUpdating(true);
    this.unsubscribe = this.userservice.getAllEmployee().subscribe({
      next: (result: ApiResponse<EmployeeEntityModel[]>) => {
        this.userEmployees = result.data;
        this.dataSource.data = result.data;
        this.loading.setUpdating(false);
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
        this.loading.setUpdating(false);
      },
    });
  }

  openNewUser() {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveEmployee(result);
      }
    });
  }

  saveEmployee(employee: EmployeeEntityModel) {
    this.userservice.postEmployee(employee).subscribe({
      next: (result) => {
        this.userEmployees.unshift(employee);
        this.dataSource.data = [...this.userEmployees];
        alert('Employee created successfully!');
        this.getEmployees(); // Recarrega a lista
      },
      error: (error) => {
        console.error('Error saving employee:', error);
        alert('Error creating employee. Please try again.');
      },
    });
  }

  remove(employeeId?: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.userservice.deleteEmployee(employeeId).subscribe({
        next: (result) => {
          this.userEmployees = this.userEmployees.filter((employee) => employee.employeeId !== employeeId);
          this.dataSource.data = [...this.userEmployees];
          alert(result.message);
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
        },
      });
    }
  }

  search() {
    const value = (this.searchTerm || '').trim().toLowerCase();
    this.dataSource.filter = value;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  edit(id?: number) {
    this.router.navigate(['/employee/employeedetais', id]);
  }

  ngOnDestroy(): void {
    this.unsubscribe?.unsubscribe();
  }
}
