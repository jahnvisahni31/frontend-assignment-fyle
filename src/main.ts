import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutFormComponent } from './app/components/workout-form/workout-form.component';
import { WorkoutListComponent } from './app/components/workout-list/workout-list.component';
import { WorkoutChartComponent } from './app/components/workout-chart/workout-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, WorkoutFormComponent, WorkoutListComponent, WorkoutChartComponent],
  template: `
    <div class="min-h-screen bg-gray-100 p-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">Health Challenge Tracker</h1>
        
        <div class="grid gap-8">
          <app-workout-form></app-workout-form>
          <app-workout-list></app-workout-list>
          <app-workout-chart></app-workout-chart>
        </div>
      </div>
    </div>
  `
})
export class App {}

bootstrapApplication(App, {
  providers: []
}).catch(err => console.error(err));