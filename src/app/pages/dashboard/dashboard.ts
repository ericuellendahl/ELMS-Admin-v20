import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatListModule,
    MatTableModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  currentDate: Date = new Date();
  
  displayedColumns: string[] = ['user', 'action', 'details', 'time', 'status'];
  
  activities = [
    {
      name: 'João Silva',
      role: 'RH',
      avatar: 'https://ui-avatars.com/api/?name=Joao+Silva&background=4361ee&color=fff&rounded=true',
      action: 'Solicitação de Férias',
      details: '15/07/2025 - 30/07/2025',
      time: 'Hoje, 09:42',
      status: 'Pendente',
      statusClass: 'warning'
    },
    {
      name: 'Maria Oliveira',
      role: 'TI',
      avatar: 'https://ui-avatars.com/api/?name=Maria+Oliveira&background=20c997&color=fff&rounded=true',
      action: 'Atualização de Dados',
      details: 'Informações Pessoais',
      time: 'Ontem, 16:30',
      status: 'Concluído',
      statusClass: 'success'
    },
    {
      name: 'Carlos Souza',
      role: 'Vendas',
      avatar: 'https://ui-avatars.com/api/?name=Carlos+Souza&background=fd7e14&color=fff&rounded=true',
      action: 'Novo Funcionário',
      details: 'Ana Beatriz (Estagiária)',
      time: 'Ontem, 14:15',
      status: 'Concluído',
      statusClass: 'success'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Inicialização do componente
  }
}
