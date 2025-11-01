import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, of } from 'rxjs';
import { ApiResponse } from '../../models/ApiResponse';
import { EmployeeEntityModel } from '../../models/Employee.model';
import { DepartmentDropDown } from '../../models/DepartmentDropDown';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly endpoints = {
    employees: '/GetEmployees',
    departments: '/GetDepartments',
    employeeById: '/GetEmployeeById',
    employeeCreate: '/CreateEmployee',
    employeeDelete: '/DeleteEmployee',
  } as const;

  postEmployee(employee: EmployeeEntityModel): Observable<ApiResponse<any>> {
    return this.http
      .post<ApiResponse<any>>(this.endpoints.employeeCreate, employee)
      .pipe(catchError(this.handleError));
  }
  deleteEmployee(employeeId?: number): Observable<ApiResponse<any>> {
    return this.http
      .delete<ApiResponse<any>>(`${this.endpoints.employeeDelete}?id=${employeeId}`)
      .pipe(catchError(this.handleError));
  }

  getAllEmployee(): Observable<ApiResponse<EmployeeEntityModel[]>> {
    return this.http
      .get<ApiResponse<EmployeeEntityModel[]>>(this.endpoints.employees)
      .pipe(catchError(this.handleError));
  }

  getDepartments(): Observable<DepartmentDropDown[]> {
    return this.http.get<ApiResponse<DepartmentDropDown[]>>(this.endpoints.departments).pipe(
      map((res) => {
        return res?.data || [];
      }),
      catchError((error) => {
        return of([] as DepartmentDropDown[]);
      })
    );
  }

  getEmployeeById(id: number): Observable<ApiResponse<EmployeeEntityModel>> {
    return this.http
      .get<ApiResponse<EmployeeEntityModel>>(`${this.endpoints.employeeById}?id=${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Código: ${error.status}\nMensagem: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
