import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { EmployeeEntityModel } from '../models/Employee.model';
import { UserService } from '../services/user/user-service';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({ providedIn: 'root' })
export class EmployeeFacade {
  private readonly userService = inject(UserService);

  private readonly employeesSubject = new BehaviorSubject<EmployeeEntityModel[] | null>(null);
  readonly employees$: Observable<EmployeeEntityModel[] | null> = this.employeesSubject.asObservable();

  loadEmployees(): Observable<EmployeeEntityModel[]> {
    return this.userService.getAllEmployee().pipe(
      map((res: ApiResponse<EmployeeEntityModel[]>) => res.data || []),
      tap((employees) => this.employeesSubject.next(employees))
    );
  }

  createEmployee(employee: EmployeeEntityModel): Observable<ApiResponse<any>> {
    return this.userService.postEmployee(employee).pipe(
      tap(() => {
        // Após criar, recarrega a lista (cache no serviço é invalidado lá)
        this.loadEmployees().subscribe();
      })
    );
  }

  deleteEmployee(employeeId?: number): Observable<ApiResponse<any>> {
    return this.userService.deleteEmployee(employeeId).pipe(
      tap(() => {
        // Após deletar, recarrega a lista (cache no serviço é invalidado lá)
        this.loadEmployees().subscribe();
      })
    );
  }

  getEmployeeById(id: number) {
    return this.userService.getEmployeeById(id);
  }
}


