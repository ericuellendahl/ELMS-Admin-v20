import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user/user-service';
import { EmployeeEntityModel } from '../../models/Employee.model';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Unsubscribable } from 'rxjs';
import { DepartmentDropDown } from '../../models/DepartmentDropDown';
import { ApiResponse } from '../../models/ApiResponse';
import { Router } from '@angular/router';
import { Loading } from '../../services/loaders/loading';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  imports: [
    CommonModule,
    FormsModule,
    AsyncPipe,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
  standalone: true,
})
export class Employee implements OnInit, OnDestroy {
  userservice = inject(UserService);
  private loading = inject(Loading);
  dialog = inject(MatDialog);

  userEmployees: EmployeeEntityModel[] = [];
  isModalOpen: boolean = false;
  searchTerm: string = '';
  
  displayedColumns: string[] = ['id', 'employeeId', 'name', 'email', 'role', 'actions'];
  dataSource: EmployeeEntityModel[] = [];

  newEmployee: EmployeeEntityModel = {
    employeeName: '',
    deptId: 0,
    deptName: '',
    contactNo: '',
    emailId: '',
    role: '',
    password: '',
    gender: '',
  };

  router: Router = inject(Router);
  unsubscribe: any;

  @ViewChild('createEmployeeDialog') createEmployeeDialog!: ElementRef<HTMLDialogElement>;

  departamentsDropdown$!: Observable<DepartmentDropDown[]>;

  ngOnInit(): void {
    this.getEmployees();
    this.loadDepartments();
  }

  loadDepartments() {
    this.departamentsDropdown$ = this.userservice.getDepartments();
  }

  getEmployees() {
    this.loading.setUpdating(true);
    this.unsubscribe = this.userservice.getAllEmployee().subscribe({
      next: (result: ApiResponse<EmployeeEntityModel[]>) => {
        this.userEmployees = result.data;
        this.dataSource = result.data;
        this.loading.setUpdating(false);
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
        this.loading.setUpdating(false);
      },
    });
  }

  openNewUser() {
    if (this.createEmployeeDialog?.nativeElement) {
      this.createEmployeeDialog.nativeElement.showModal();
    }
  }

  closeModal() {
    if (this.createEmployeeDialog?.nativeElement) {
      this.createEmployeeDialog.nativeElement.close();
    }
    this.resetNewEmployee();
  }

  saveEmployee() {
    this.userservice.postEmployee(this.newEmployee).subscribe({
      next: (result) => {
        this.userEmployees.unshift(this.newEmployee);
        this.dataSource = [...this.userEmployees];
        alert('Employee created successfully!');
        this.closeModal();
      },
      error: (error) => {
        console.error('Error saving employee:', error);
      },
    });
  }

  remove(employeeId?: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.userservice.deleteEmployee(employeeId).subscribe({
        next: (result) => {
          this.userEmployees = this.userEmployees.filter((employee) => employee.employeeId !== employeeId);
          this.dataSource = [...this.userEmployees];
          alert(result.message);
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
        },
      });
    }
  }

  search() {
    if (!this.searchTerm) {
      this.getEmployees();
      return;
    }

    const filtered = this.userEmployees.filter(employee =>
      employee.employeeName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      employee.emailId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.dataSource = filtered;
  }

  resetNewEmployee() {
    this.newEmployee = {
      employeeId: 0,
      employeeName: '',
      deptId: 0,
      deptName: '',
      contactNo: '',
      emailId: '',
      role: '',
      password: '',
      gender: '',
    };
  }

  edit(id?: number) {
    this.router.navigate(['/employee/employeedetais', id]);
  }

  ngOnDestroy(): void {
    this.unsubscribe?.unsubscribe();
  }
}
