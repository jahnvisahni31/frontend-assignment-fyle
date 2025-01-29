import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  template: `
    <div class="p-4">
      <canvas id="workoutChart"></canvas>
    </div>
  `
})
export class WorkoutChartComponent implements OnInit {
  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.getUsers().subscribe(users => {
      this.createChart(users);
    });
  }

  private createChart(users: any[]): void {
    const workoutData = this.aggregateWorkoutData(users);
    
    new Chart('workoutChart', {
      type: 'bar',
      data: {
        labels: Array.from(workoutData.keys()),
        datasets: [{
          label: 'Total Minutes by Workout Type',
          data: Array.from(workoutData.values()),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Minutes'
            }
          }
        }
      }
    });
  }

  private aggregateWorkoutData(users: any[]): Map<string, number> {
    const workoutData = new Map<string, number>();
    
    users.forEach(user => {
      user.workouts.forEach((workout: any) => {
        const current = workoutData.get(workout.type) || 0;
        workoutData.set(workout.type, current + workout.minutes);
      });
    });
    
    return workoutData;
  }
}