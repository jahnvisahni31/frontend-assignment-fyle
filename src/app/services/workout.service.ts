import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private readonly STORAGE_KEY = 'userData';
  private users: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>([]);

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    try {
      const storedData = localStorage.getItem(this.STORAGE_KEY);
      if (storedData) {
        this.users = JSON.parse(storedData);
      } else {
        this.users = this.getInitialData();
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      this.users = this.getInitialData();
    } finally {
      this.saveToLocalStorage();
    }
  }

  private getInitialData(): User[] {
    return [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 }
        ]
      },
      {
        id: 2,
        name: 'Jane Smith',
        workouts: [
          { type: 'Swimming', minutes: 60 },
          { type: 'Running', minutes: 20 }
        ]
      },
      {
        id: 3,
        name: 'Mike Johnson',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Cycling', minutes: 40 }
        ]
      }
    ];
  }

  private saveToLocalStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.users));
      this.usersSubject.next(this.users);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      // Continue providing data in memory even if storage fails
      this.usersSubject.next(this.users);
    }
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  addWorkout(name: string, workoutType: string, minutes: number): boolean {
    // Validate inputs
    if (!name?.trim() || !workoutType?.trim() || !minutes || minutes <= 0) {
      return false;
    }

    // Sanitize inputs
    const sanitizedName = name.trim();
    const sanitizedType = workoutType.trim();

    try {
      const existingUser = this.users.find(user => 
        user.name.toLowerCase() === sanitizedName.toLowerCase()
      );
      
      if (existingUser) {
        existingUser.workouts.push({ 
          type: sanitizedType, 
          minutes: Math.floor(minutes) // Ensure whole numbers
        });
      } else {
        const newUser: User = {
          id: this.generateUniqueId(),
          name: sanitizedName,
          workouts: [{ type: sanitizedType, minutes: Math.floor(minutes) }]
        };
        this.users.push(newUser);
      }
      
      this.saveToLocalStorage();
      return true;
    } catch (error) {
      console.error('Error adding workout:', error);
      return false;
    }
  }

  getWorkoutTypes(): string[] {
    const types = new Set<string>();
    this.users.forEach(user => {
      user.workouts.forEach(workout => {
        types.add(workout.type);
      });
    });
    return Array.from(types).sort();
  }

  private generateUniqueId(): number {
    return Math.max(0, ...this.users.map(u => u.id)) + 1;
  }
}