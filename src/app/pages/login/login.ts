import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/User.model';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login-service';
import { Loading } from '../../services/loaders/loading';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  employee: User = new User();
  private loading = inject(Loading);
  loginService = inject(LoginService);
  router = inject(Router);

  onLogin() {
    this.loading.setUpdating(true);
    this.loginService.onLogin(this.employee).subscribe({
      next: (response: any) => {
        if (response.result) {
          localStorage.setItem('token', JSON.stringify(response.data));
          this.router.navigateByUrl('/dashboard');
          this.loading.setUpdating(false);
        } else {
          alert(response.message);
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        this.loading.setUpdating(false);
      },
    });
  }
}
