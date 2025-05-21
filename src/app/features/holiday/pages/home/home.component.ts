import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
})
export class HomeComponent {
  cantons = [
    { code: 'CH-ZH', name: 'Zurich' },
    { code: 'CH-GE', name: 'Geneva' },
    { code: 'CH-BE', name: 'Bern' },
    { code: 'CH-VD', name: 'Vaud' },
    { code: 'CH-TI', name: 'Ticino' },
  ];

  years = [2024, 2025, 2026];
  selectedCanton = 'CH-ZH';
  selectedYear = new Date().getFullYear();

  weekdays = [
    { label: 'Sunday', value: 0, checked: false },
    { label: 'Monday', value: 1, checked: true },
    { label: 'Tuesday', value: 2, checked: true },
    { label: 'Wednesday', value: 3, checked: true },
    { label: 'Thursday', value: 4, checked: true },
    { label: 'Friday', value: 5, checked: true },
    { label: 'Saturday', value: 6, checked: false },
  ];

  fetchHolidays() {
    console.log('Selected canton:', this.selectedCanton);
    console.log('Selected year:', this.selectedYear);
    console.log('Working days:', this.weekdays.filter(day => day.checked));
  }
}
