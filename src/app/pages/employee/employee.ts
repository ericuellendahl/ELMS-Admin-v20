import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user-service';
import { EmployeeEntityModel } from '../../models/Employee.model';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Unsubscribable } from 'rxjs';
import { DepartmentDropDown } from '../../models/DepartmentDropDown';
import { ApiResponse } from '../../models/ApiResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, FormsModule, AsyncPipe],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
  standalone: true,
})
export class Employee implements OnInit, OnDestroy {
  userservice = inject(UserService);
  userEmployees: EmployeeEntityModel[] = [];
  isModalOpen: boolean = false;
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

  @ViewChild('createEmployeeModal') createEmployeeModal!: ElementRef;

  departamentsDropdown$!: Observable<DepartmentDropDown[]>;

  ngOnInit(): void {
    this.getEmployees();
    this.loadDepartments();
  }

  loadDepartments() {
    this.departamentsDropdown$ = this.userservice.getDepartments();
  }

  getEmployees() {
    this.unsubscribe = this.userservice.getAllEmployee().subscribe({
      next: (result: ApiResponse<EmployeeEntityModel[]>) => {
        console.log(result);
        this.userEmployees = result.data;
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      },
    });
  }

  openNewUser() {
    this.createEmployeeModal.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.createEmployeeModal.nativeElement.style.display = 'none';
    this.resetNewEmployee();
  }

  saveEmployee() {
    console.log('Saving employee:', this.newEmployee);

    this.userservice.postEmployee(this.newEmployee).subscribe({
      next: (result) => {
        console.log(result);
        this.userEmployees.unshift(this.newEmployee);
        alert('Employee created successfully!');
        this.closeModal();
      },
      error: (error) => {
        console.error('Error saving employee:', error);
      },
    });
  }
  remove(employeeId?: number){
    this.userservice.deleteEmployee(employeeId).subscribe({
      next: (result) => {
        console.log(result);
        this.userEmployees = this.userEmployees.filter((employee) => employee.employeeId !== employeeId);
        alert(result.message);
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
      },
    });
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
