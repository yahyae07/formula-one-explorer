# Formula One Explorer

A modern single page web application for exploring Formula One data including seasons, races, drivers, teams, and statistics. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Toggle between card and list views
- Browse F1 1950 to 1979 seasons in reverse chronological order
- View races for each selected season
- Pin favorite races for quick access
- Interactive race status visualization charts
- View detailed race results and driver standings
- Responsive design for all screen sizes

## Technologies Used

- **Frontend Framework**: Next.js 14 with React
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom F1-inspired design system
- **State Management**: Zustand
- **Data Visualization**: Recharts
- **Data Source**: Ergast F1 API
- **Icons**: React Icons

## Setup Instructions

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yahyae07/formula-one-explorer.git
cd formula-one-explorer
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open http://localhost:3000 in your browser to see the application.

## Technical Approach

### Architecture

The application follows a component-based architecture with:

1. **Components**: Modular UI components like `SeasonCard`, `RaceList`, and `ViewParticipantsModal`
2. **State Management**: Zustand stores for managing application state:
   - `useSeasonsStore`: Manages season data
   - `useRacesStore`: Handles selected season and race, race data, pinned races, and modal state
   - `useViewStore`: Controls the UI view mode (card vs. list)
3. **API Integration**: Fetch calls to the Ergast F1 API for real-time data
4. **Persistent Storage**: Local storage for saving user preferences (pinned races)

### Design Decisions

1. **Zustand over Redux**: Chose Zustand for its simplicity in handling global states and reduced boilerplate code
2. **Tailwind CSS**: Used for rapid styling to increase productivity with consistent designs
3. **F1-inspired UI**: Custom design system with Mercedes-AMG PETRONAS F1 car colors and styling (Black, Silver/Grey, Petronas teal, White, Red)
4. **Responsive Layout**: Grid and flex layouts that adapt to different screen sizes
5. **Data Visualization**: Donut chart showing race completion statistics, table showing each race driver standings and statistics.
6. **Progressive Enhancement**: Fallbacks and loading states for data fetching

### Performance Considerations

1. **Pagination**: Implemented to avoid rendering too many items at once
2. **Lazy Loading**: Modal contents load only when needed
3. **Persistent Cache**: Pinned races are stored in local storage

## Usage

1. Browse through seasons using the card or list view
2. Select a season to view its races
3. Pin favorite races for quick access
4. Toggle between card and list views using the toggle in the header
5. Click "View participants" to see detailed race results

## Future Improvements

- Add driver and team pages with detailed statistics
- Implement search functionality
- Add more visualizations for championship standings
- Create a dark/light theme toggle
- Add more filtering options for races and results

## License

MIT

## Acknowledgements

- Data provided by [Ergast Motor Racing Developer API](https://ergast.com/mrd/)
- F1 styling inspiration from the official Mercedes AMG PETRONAS Formula 1 website
- Some UI components inspired by or adapted from [Uiverse](https://www.uiverse.io/) and [Material UI](https://mui.com/material-ui/)
- Icons provided by [React Icons](https://react-icons.github.io/react-icons/)
- Development supported in part by Claude 3.7 Sonnet Thinking
