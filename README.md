# Health Challenge Tracker

A modern Angular application for tracking workout activities across users. Built with Angular 16, Tailwind CSS, and Chart.js.

## Features

- ✨ Add workouts with user name, type, and duration
- 🔍 Search users and filter by workout type
- 📊 Visual workout statistics with Chart.js
- 📱 Responsive design with Tailwind CSS
- 💾 Persistent storage using localStorage
- ✅ Comprehensive test coverage

## Live Demo

[View Live Demo](https://frontend-assignment-fyle.vercel.app/)

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/health-challenge-tracker.git
cd health-challenge-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:4200`

## Running Tests

Run tests with coverage report:
```bash
npm run test
```

View the coverage report in the `coverage` directory.

## Build

Create a production build:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── workout-form/
│   │   ├── workout-list/
│   │   └── workout-chart/
│   ├── models/
│   │   └── workout.model.ts
│   └── services/
│       └── workout.service.ts
├── assets/
└── styles/
    └── global_styles.css
```

## Features in Detail

### Workout Form
- Input validation for user names (letters, numbers, spaces, hyphens, apostrophes)
- Maximum name length of 50 characters
- Workout duration limits (1-1440 minutes)
- Duplicate user name handling (adds to existing user)

### Workout List
- Real-time search with debouncing
- Workout type filtering
- Pagination (5 items per page)
- Responsive table design
- Empty state handling

### Workout Chart
- Visual representation of workout data
- Aggregated minutes by workout type
- Responsive design
- Interactive tooltips

## Edge Cases Handled

- Empty form submissions
- Duplicate user names
- Invalid workout durations
- Local storage unavailability
- Large data sets pagination
- Search with no results
- Special characters in usernames
- Browser compatibility

## Technical Details

### State Management
- BehaviorSubject for reactive data updates
- localStorage for persistence
- Error handling for storage failures

### Testing
- Unit tests for components and services
- 100% code coverage requirement
- Jasmine test framework
- Karma test runner

### Styling
- Tailwind CSS for utility-first styling
- Responsive design principles
- Consistent color scheme
- Focus on accessibility

## Assumptions

1. User names are case-insensitive for matching
2. Workout durations are stored as whole minutes
3. Local storage is the primary data store
4. Maximum workout duration is 24 hours (1440 minutes)
5. Workout types are predefined (Running, Cycling, Swimming, Yoga)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Angular Team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Chart.js for the beautiful charts
