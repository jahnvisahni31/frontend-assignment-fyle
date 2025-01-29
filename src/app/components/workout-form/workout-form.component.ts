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
          maxlength="50"
        >
        <div *ngIf="workoutForm.get('name')?.invalid && workoutForm.get('name')?.touched" class="text-red-500 text-sm mt-1">
          <span *ngIf="workoutForm.get('name')?.errors?.['required']">Name is required</span>
          <span *ngIf="workoutForm.get('name')?.errors?.['pattern']">Name contains invalid characters</span>
        </div>
      </div>

      <div class="mb-4">
        <label for="type" class="block text-gray-700 text-sm font-bold mb-2">Workout Type:</label>
        <select
          id="type"
          formControlName="type"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          [class.border-red-500]="workoutForm.get('type')?.invalid && workoutForm.get('type')?.touched"
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
          min="1"
          max="1440"
        >
        <div *ngIf="workoutForm.get('minutes')?.invalid && workoutForm.get('minutes')?.touched" class="text-red-500 text-sm mt-1">
          <span *ngIf="workoutForm.get('minutes')?.errors?.['required']">Minutes is required</span>
          <span *ngIf="workoutForm.get('minutes')?.errors?.['min']">Minutes must be greater than 0</span>
          <span *ngIf="workoutForm.get('minutes')?.errors?.['max']">Minutes cannot exceed 24 hours (1440)</span>
        </div>
      </div>

      <div *ngIf="submitError" class="mb-4 text-red-500 text-sm">
        {{ submitError }}
      </div>

      <button
        type="submit"
        [disabled]="workoutForm.invalid || isSubmitting"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
      >
        {{ isSubmitting ? 'Adding...' : 'Add Workout' }}
      </button>
    </form>
  `
})
export class WorkoutFormComponent {
  workoutForm: FormGroup;
  isSubmitting = false;
  submitError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService
  ) {
    this.workoutForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\s\-']+$/), // Allow letters, numbers, spaces, hyphens, and apostrophes
        Validators.maxLength(50)
      ]],
      type: ['', Validators.required],
      minutes: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(1440) // Max 24 hours
      ]]
    });
  }

  onSubmit(): void {
    if (this.workoutForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitError = null;

      const { name, type, minutes } = this.workoutForm.value;
      
      try {
        const success = this.workoutService.addWorkout(
          name.trim(),
          type,
          Math.floor(Number(minutes))
        );

        if (success) {
          this.workoutForm.reset();
        } else {
          this.submitError = 'Failed to add workout. Please try again.';
        }
      } catch (error) {
        this.submitError = 'An unexpected error occurred. Please try again.';
        console.error('Error submitting workout:', error);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}