import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    if (storedData) {
      this.users = JSON.parse(storedData);
    } else {
      this.users = this.getInitialData();
      this.saveToLocalStorage();
    }
    this.usersSubject.next(this.users);
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
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.users));
    this.usersSubject.next(this.users);
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  addWorkout(name: string, workoutType: string, minutes: number): void {
    const existingUser = this.users.find(user => user.name === name);
    
    if (existingUser) {
      existingUser.workouts.push({ type: workoutType, minutes });
    } else {
      const newUser: User = {
        id: this.users.length + 1,
        name,
        workouts: [{ type: workoutType, minutes }]
      };
      this.users.push(newUser);
    }
    
    this.saveToLocalStorage();
  }

  getWorkoutTypes(): string[] {
    const types = new Set<string>();
    this.users.forEach(user => {
      user.workouts.forEach(workout => {
        types.add(workout.type);
      });
    });
    return Array.from(types);
  }
}