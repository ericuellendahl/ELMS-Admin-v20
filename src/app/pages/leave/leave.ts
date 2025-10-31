import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-leave',
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatChipsModule
  ],
  templateUrl: './leave.html',
  styleUrl: './leave.css'
})
export class Leave {
  displayedColumns: string[] = ['employee', 'leaveDate', 'reason', 'status', 'actions'];
  
  dataSource = [
    { employee: 'John Doe', leaveDate: '2024-10-25', reason: 'Family event', status: 'Pending', statusClass: 'warning' },
    { employee: 'Jane Smith', leaveDate: '2024-10-28', reason: 'Medical appointment', status: 'Approved', statusClass: 'success' },
    { employee: 'Peter Jones', leaveDate: '2024-11-01', reason: 'Personal reason', status: 'Rejected', statusClass: 'danger' }
  ];

  approve(item: any) {
    console.log('Approve', item);
  }

  reject(item: any) {
    console.log('Reject', item);
  }

  viewDetails(item: any) {
    console.log('View Details', item);
  }
}
