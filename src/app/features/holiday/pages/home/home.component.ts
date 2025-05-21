import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { HolidayService } from '../../../../core/services/holiday.service';
import { Holiday } from '../../../../core/models/holiday.model';


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
   providers: [HolidayService]
})
export class HomeComponent {

constructor(private holidayService: HolidayService) {}

holidays: Holiday[] = [];

fetchHolidays() {
  this.holidayService.getHolidays(this.selectedCanton, this.selectedYear).subscribe({
    next: (response) => {
      const filtered = response.filter((holiday) => {
        const day = new Date(holiday.startDate).getDay();
        return this.weekdays.some((w) => w.value === day && w.checked);
      });

      this.holidays = filtered;
      console.log('Filtered holidays:', this.holidays);
    },
    error: (err) => {
      console.error('API error:', err);
    }
  });
}




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

}
