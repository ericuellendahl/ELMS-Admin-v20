import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, of, tap, finalize, shareReplay } from 'rxjs';
import { ApiResponse } from '../../models/ApiResponse';
import { EmployeeEntityModel } from '../../models/Employee.model';
import { DepartmentDropDown } from '../../models/DepartmentDropDown';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private static readonly EMPLOYEES_TTL_MS = 5 * 60 * 1000; // 5 minutes

  // In-memory cache for employees list
  private employeesCache?: ApiResponse<EmployeeEntityModel[]>;
  private employeesCacheAt = 0;
  private employeesRequest$?: Observable<ApiResponse<EmployeeEntityModel[]>>;

  private readonly endpoints = {
    employees: '/GetAllUsers',
    departments: '/GetDepartments',
    employeeById: '/GetEmployeeById',
    employeeCreate: '/CreateEmployee',
    employeeDelete: '/DeleteEmployee',
  } as const;

  postEmployee(employee: EmployeeEntityModel): Observable<ApiResponse<any>> {
    return this.http
      .post<ApiResponse<any>>(this.endpoints.employeeCreate, employee)
      .pipe(
        tap(() => this.invalidateEmployeesCache()),
        catchError(this.handleError)
      );
  }
  deleteEmployee(employeeId?: number): Observable<ApiResponse<any>> {
    return this.http
      .delete<ApiResponse<any>>(`${this.endpoints.employeeDelete}?id=${employeeId}`)
      .pipe(
        tap(() => this.invalidateEmployeesCache()),
        catchError(this.handleError)
      );
  }

  getAllEmployee(): Observable<ApiResponse<EmployeeEntityModel[]>> {
    // Serve from cache if within TTL
    const now = Date.now();
    if (this.employeesCache && now - this.employeesCacheAt < UserService.EMPLOYEES_TTL_MS) {
      return of(this.employeesCache);
    }

    // If a request is already in-flight, share it
    if (this.employeesRequest$) {
      return this.employeesRequest$;
    }

    this.employeesRequest$ = this.http
      .get<ApiResponse<EmployeeEntityModel[]>>(this.endpoints.employees)
      .pipe(
        tap((response) => {
          this.employeesCache = response;
          this.employeesCacheAt = Date.now();
        }),
        shareReplay(1),
        finalize(() => {
          // Clear the in-flight reference after completion
          this.employeesRequest$ = undefined;
        }),
        catchError(this.handleError)
      );

    return this.employeesRequest$;
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

  private invalidateEmployeesCache(): void {
    this.employeesCache = undefined;
    this.employeesCacheAt = 0;
  }
}
