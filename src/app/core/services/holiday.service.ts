import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Holiday } from '../models/holiday.model';
import { Subdivision } from '../models/subdivision.model';



@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  private readonly API_URL = 'https://openholidaysapi.org';

  constructor(private http: HttpClient) {}

  getHolidays(cantonCode: string, year: number): Observable<any[]> {
    const from = `${year}-01-01`;
    const to = `${year}-12-31`;

    const url = `${this.API_URL}/PublicHolidays?countryIsoCode=CH&languageIsoCode=DE&validFrom=${from}&validTo=${to}&subdivisionCode=${cantonCode}`;

    return this.http.get<Holiday[]>(url);
  }

  getSubdivisions(countryCode: string): Observable<Subdivision[]> {
  const url = `${this.API_URL}/Subdivisions?countryIsoCode=${countryCode}`;
  return this.http.get<Subdivision[]>(url);
}
}
