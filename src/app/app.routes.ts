import { NotFound } from './pages/not-found/not-found';
import { guardGuard } from './guards/guard-guard';
import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Employee } from './pages/employee/employee';
import { Leave } from './pages/leave/leave';
import { Layout } from './pages/layout/layout';
import { EmployeeDetais } from './pages/employee-detais/employee-detais';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    canActivate: [guardGuard],
    component: Layout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'employee',
        component: Employee,
      },
      {
        path: 'employee/employeedetais/:id',
        component: EmployeeDetais,
      },
      {
        path: 'leave',
        component: Leave,
      },
      {
        path: '**',
        component: NotFound,
      },
    ],
  },
];
