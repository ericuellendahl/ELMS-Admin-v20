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
    data: { title: 'Login', icon: 'bi-box-arrow-in-right' },
  },
  {
    path: '',
    canActivate: [guardGuard],
    component: Layout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: Dashboard,
        data: { title: 'Dashboard', icon: 'bi-speedometer2' },
      },
      {
        path: 'employee',
        component: Employee,
        data: { title: 'Employees', icon: 'bi-people' },
      },
      {
        path: 'employee/employeedetais/:id',
        component: EmployeeDetais,
        data: { title: 'Employee Details', icon: 'bi-person-vcard' },
      },
      {
        path: 'leave',
        component: Leave,
        data: { title: 'Leave Management', icon: 'bi-calendar-check' },
      },
      {
        path: '**',
        component: NotFound,
        data: { title: 'Not Found', icon: 'bi-exclamation-triangle' },
      },
    ],
  },
];
