import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EmployeeResponse } from '../models/EmployeeResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpClient = inject(HttpClient);

  onLogin(user: any) {
    return this.httpClient.post(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/Login',
      user
    );
  }

  getAllEmployee(): Observable<EmployeeResponse> {
    return this.httpClient.get<EmployeeResponse>(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetEmployees'
    );
  }

  getDepartments() {
    return this.httpClient
      .get('https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetDepartments')
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }
}
