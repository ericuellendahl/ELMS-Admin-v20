import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/User.model';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  employee: User = new User();
  loginService = inject(LoginService);
  router = inject(Router);

  onLogin() {
    this.loginService.onLogin(this.employee).subscribe({
      next: (response: any) => {
        if (response.result) {
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
