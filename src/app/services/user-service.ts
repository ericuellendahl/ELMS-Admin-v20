import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpClient = inject(HttpClient);


  onLogin(user: any){
    return this.httpClient.post('https://freeapi.miniprojectideas.com/api/EmployeeLeave/Login', user);
  }


}
