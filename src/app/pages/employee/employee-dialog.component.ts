import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user-service';
import { EmployeeEntityModel } from '../../models/Employee.model';
import { DepartmentDropDown } from '../../models/DepartmentDropDown';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-employee-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './employee-dialog.component.html',
  styleUrl: './employee-dialog.component.css'
})
export class EmployeeDialogComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  public dialogRef = inject(MatDialogRef<EmployeeDialogComponent>);

  departments: DepartmentDropDown[] = [];
  hidePassword = true;

  employeeForm: FormGroup = this.fb.group({
    employeeName: ['', Validators.required],
    deptId: [null, Validators.required],
    contactNo: ['', Validators.required],
    emailId: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    gender: [null, Validators.required],
    role: [null, Validators.required]
  });

  constructor() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.userService.getDepartments().pipe(
      catchError((error) => {
        console.error('Error loading departments:', error);
        return of([] as DepartmentDropDown[]);
      })
    ).subscribe({
      next: (departments) => {
        console.log('Departments loaded in dialog:', departments);
        this.departments = departments || [];
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;
      const employee: EmployeeEntityModel = {
        employeeName: formValue.employeeName,
        deptId: formValue.deptId,
        contactNo: formValue.contactNo,
        emailId: formValue.emailId,
        password: formValue.password,
        gender: formValue.gender,
        role: formValue.role,
        deptName: ''
      };
      this.dialogRef.close(employee);
    }
  }
}

