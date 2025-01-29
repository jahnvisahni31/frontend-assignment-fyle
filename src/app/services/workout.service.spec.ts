import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default data when localStorage is empty', (done) => {
    service.getUsers().subscribe(users => {
      expect(users.length).toBe(3);
      expect(users[0].name).toBe('John Doe');
      done();
    });
  });

  it('should add new workout for existing user', (done) => {
    service.addWorkout('John Doe', 'Running', 30);
    
    service.getUsers().subscribe(users => {
      const user = users.find(u => u.name === 'John Doe');
      expect(user?.workouts.some(w => w.type === 'Running' && w.minutes === 30)).toBeTrue();
      done();
    });
  });

  it('should create new user with workout', (done) => {
    service.addWorkout('New User', 'Yoga', 45);
    
    service.getUsers().subscribe(users => {
      const user = users.find(u => u.name === 'New User');
      expect(user).toBeTruthy();
      expect(user?.workouts[0].type).toBe('Yoga');
      expect(user?.workouts[0].minutes).toBe(45);
      done();
    });
  });

  it('should return all unique workout types', () => {
    service.addWorkout('Test User', 'Running', 30);
    service.addWorkout('Test User', 'Yoga', 45);
    
    const types = service.getWorkoutTypes();
    expect(types).toContain('Running');
    expect(types).toContain('Yoga');
  });
});