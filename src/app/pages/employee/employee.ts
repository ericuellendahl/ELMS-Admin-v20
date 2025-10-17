import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user-service';
import { EmployeeEntityModel } from '../../models/Employee.model';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { DepartmentDropDown } from '../../models/DepartmentDropDown';
import { ApiResponse } from '../../models/ApiResponse';



@Component({
  selector: 'app-employee',
  imports: [CommonModule, FormsModule, AsyncPipe],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
  standalone: true,
})
export class Employee implements OnInit {
  userservice = inject(UserService);
  userEmployees: EmployeeEntityModel[] = [];
  isModalOpen: boolean = false;
  newEmployee: EmployeeEntityModel = {
    employeeId: 0,
    employeeName: '',
    deptId: 0,
    deptName: '',
    contactNo: 0,
    emailId: '',
    role: ''
  };

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
    this.userservice.getAllEmployee().subscribe({
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
    this.userEmployees.push(this.newEmployee);
    this.closeModal();
  }

  resetNewEmployee() {
    this.newEmployee = {
      employeeId: 0,
      employeeName: '',
      deptId: 0,
      deptName: '',
      contactNo: 0,
      emailId: '',
      role: ''
    };
  }
}
