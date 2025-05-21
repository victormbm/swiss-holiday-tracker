import { Routes } from '@angular/router';
import { HomeComponent } from './features/holiday/pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'holidays', pathMatch: 'full' },
  { path: 'holidays', component: HomeComponent },
];
