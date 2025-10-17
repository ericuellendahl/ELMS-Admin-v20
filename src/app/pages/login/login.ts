import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  employee: User = new User();
  employeeService = inject(UserService);
  router = inject(Router);

  onLogin() {
    this.employeeService.onLogin(this.employee).subscribe({
      next: (response: any) => {
        if (response.result) {
          alert('Login successful');
          localStorage.setItem('token', JSON.stringify(response.data));
          this.router.navigateByUrl('/dashboard');
        } else {
          alert(response.message);
        }
      },
      error: (error) => {
        console.error('Login failed', error);
      },
    });
  }
}
