import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { EmployeeEntityModel } from '../models/Employee.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
   private readonly http = inject(HttpClient);

  private readonly endpoints = {
    login: '/Login',
    employees: '/GetEmployees',
    departments: '/GetDepartments',
  } as const;

  onLogin(credentials: any): Observable<any> {
    return this.http
      .post(this.endpoints.login, credentials)
      .pipe(catchError(this.handleError));
  }

  getAllEmployee(): Observable<ApiResponse<EmployeeEntityModel[]>> {
    return this.http
      .get<ApiResponse<EmployeeEntityModel[]>>(this.endpoints.employees)
      .pipe(catchError(this.handleError));
  }

  getDepartments(): Observable<EmployeeEntityModel[]> {
    return this.http
      .get<ApiResponse<EmployeeEntityModel[]>>(this.endpoints.departments)
      .pipe(
        map((res) => res.data),
        catchError(this.handleError)
      );
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
