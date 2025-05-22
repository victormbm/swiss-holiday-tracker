import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { HolidayService } from '../../../../core/services/holiday.service';
import { Holiday } from '../../../../core/models/holiday.model';
import { Subdivision } from '../../../../core/models/subdivision.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import html2canvas from 'html2canvas';



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
    MatSnackBarModule
  ],
   providers: [HolidayService]
})
export class HomeComponent {

constructor(private holidayService: HolidayService,private snackBar: MatSnackBar) {}

cantons: { code: string; name: string }[] = [];


  ngOnInit(): void {
    this.generateCalendar(this.selectedYear);this.generateCalendar(this.selectedYear);
    this.holidayService.getSubdivisions('CH').subscribe({
      next: (data) => {
        this.subdivisions = data;
      },
      error: (err) => {
        console.error('Error loading subdivisions:', err);
      },
    });
  }

  holidays: Holiday[] = [];
  currentYear = new Date().getFullYear();

  years = [this.currentYear - 1, this.currentYear, this.currentYear + 1];
  subdivisions: Subdivision[] = [];
  selectedCanton: string = '';
  selectedYear = this.currentYear
  alreadySearched = false;
  calendarMonths: {
  name: string;
  days: { date: number; fullDate: string }[];
  }[] = [];



  weekdays = [
    { label: 'Sunday', value: 0, checked: false },
    { label: 'Monday', value: 1, checked: false },
    { label: 'Tuesday', value: 2, checked: false },
    { label: 'Wednesday', value: 3, checked: false },
    { label: 'Thursday', value: 4, checked: false },
    { label: 'Friday', value: 5, checked: false },
    { label: 'Saturday', value: 6, checked: false },
  ];

  generateCalendar(year: number) {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  this.calendarMonths = monthNames.map((name, i) => {
    const daysInMonth = new Date(year, i + 1, 0).getDate();
    return {
      name,
      days: Array.from({ length: daysInMonth }, (_, d) => {
        const fullDate = `${year}-${String(i + 1).padStart(2, '0')}-${String(d + 1).padStart(2, '0')}`;
        return { date: d + 1, fullDate };
      })
    };
  });
}

isHolidayDate(date: string): boolean {
  return this.holidays.some(h => {
    const holidayDate = h.startDate?.split('T')[0];
    return holidayDate === date;
  });
}

downloadCalendarAsImage() {
  const el = document.getElementById('calendar-image');
  if (!el) return;

  html2canvas(el).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `calendar-${this.selectedCanton}-${this.selectedYear}.png`;
    link.click();
  });
}


fetchHolidays() {
  this.holidayService.getHolidays(this.selectedCanton, this.selectedYear).subscribe({
    next: (response) => {
      const filtered = response.filter((holiday) => {
        const day = new Date(holiday.startDate).getDay();
        return this.weekdays.some((w) => w.value === day && w.checked);
      });

      this.holidays = filtered;
      this.alreadySearched = true;

      this.generateCalendar(this.selectedYear);


      if (filtered.length === 0) {
        this.snackBar.open('No holidays fall on your selected workdays.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top'
        });
}


    },
    error: (err) => {
      console.error('API error:', err);
    }
  });
}


selectAllDays() {
  this.weekdays.forEach(day => day.checked = true);
}

clearAllDays() {
  this.weekdays.forEach(day => day.checked = false);
}


}
