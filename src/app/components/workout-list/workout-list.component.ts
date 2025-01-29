import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';
import { User } from '../../models/workout.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="p-4">
      <div class="mb-4 flex gap-4">
        <div class="flex-1">
          <input
            [formControl]="searchControl"
            placeholder="Search by name..."
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <div class="flex-1">
          <select
            [formControl]="filterControl"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All workout types</option>
            <option *ngFor="let type of workoutTypes" [value]="type">{{ type }}</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white rounded-lg overflow-hidden">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workout Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Minutes</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <ng-container *ngFor="let user of filteredUsers | slice:startIndex:endIndex">
              <tr *ngFor="let workout of user.workouts">
                <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ workout.type }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ workout.minutes }}</td>
              </tr>
            </ng-container>
          </tbody>
        </table>
      </div>

      <div class="mt-4 flex justify-between items-center">
        <div>
          Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, filteredUsers.length) }} of {{ filteredUsers.length }} entries
        </div>
        <div class="flex gap-2">
          <button
            (click)="previousPage()"
            [disabled]="currentPage === 1"
            class="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            (click)="nextPage()"
            [disabled]="currentPage >= totalPages"
            class="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  `
})
export class WorkoutListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  workoutTypes: string[] = [];
  searchControl = new FormControl('');
  filterControl = new FormControl('');
  
  currentPage = 1;
  pageSize = 5;
  Math = Math;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.getUsers().subscribe(users => {
      this.users = users;
      this.applyFilters();
    });

    this.workoutTypes = this.workoutService.getWorkoutTypes();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => this.applyFilters());

    this.filterControl.valueChanges.subscribe(() => this.applyFilters());
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return this.startIndex + this.pageSize;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  private applyFilters(): void {
    let filtered = [...this.users];
    
    const searchTerm = this.searchControl.value?.toLowerCase();
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm)
      );
    }

    const workoutType = this.filterControl.value;
    if (workoutType) {
      filtered = filtered.filter(user =>
        user.workouts.some(workout => workout.type === workoutType)
      );
    }

    this.filteredUsers = filtered;
    this.currentPage = 1;
  }
}