import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="workoutForm" (ngSubmit)="onSubmit()" class="bg-white p-6 rounded-lg shadow-md">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name:</label>
        <input
          type="text"
          id="name"
          formControlName="name"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          [class.border-red-500]="workoutForm.get('name')?.invalid && workoutForm.get('name')?.touched"
        >
        <div *ngIf="workoutForm.get('name')?.invalid && workoutForm.get('name')?.touched" class="text-red-500 text-sm mt-1">
          Name is required
        </div>
      </div>

      <div class="mb-4">
        <label for="type" class="block text-gray-700 text-sm font-bold mb-2">Workout Type:</label>
        <select
          id="type"
          formControlName="type"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a type</option>
          <option value="Running">Running</option>
          <option value="Cycling">Cycling</option>
          <option value="Swimming">Swimming</option>
          <option value="Yoga">Yoga</option>
        </select>
        <div *ngIf="workoutForm.get('type')?.invalid && workoutForm.get('type')?.touched" class="text-red-500 text-sm mt-1">
          Workout type is required
        </div>
      </div>

      <div class="mb-4">
        <label for="minutes" class="block text-gray-700 text-sm font-bold mb-2">Minutes:</label>
        <input
          type="number"
          id="minutes"
          formControlName="minutes"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          [class.border-red-500]="workoutForm.get('minutes')?.invalid && workoutForm.get('minutes')?.touched"
        >
        <div *ngIf="workoutForm.get('minutes')?.invalid && workoutForm.get('minutes')?.touched" class="text-red-500 text-sm mt-1">
          Minutes must be greater than 0
        </div>
      </div>

      <button
        type="submit"
        [disabled]="workoutForm.invalid"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
      >
        Add Workout
      </button>
    </form>
  `
})
export class WorkoutFormComponent {
  workoutForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService
  ) {
    this.workoutForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      minutes: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.workoutForm.valid) {
      const { name, type, minutes } = this.workoutForm.value;
      this.workoutService.addWorkout(name, type, minutes);
      this.workoutForm.reset();
    }
  }
}