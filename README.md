# Travel Planner

A simple calendar-based travel planner built with Next.js and React.  
Plan your trips, see weather forecasts, and save your journeys with color-coded days!

---

## Features

- **Yearly calendar** view with clickable days
- **Add trips** with city, country (auto-fetched), cost, weather, and color
- **Weather forecast** for selected city (up to 16 days ahead)
- **Color-coded trips**: pick a color for each trip, see it in the calendar and trip list
- **Block days** with active trips (cannot add another trip for the same day)
- **Trips saved in browser** (localStorage) – your plans stay after refresh
- **Delete trips** easily from the list
- **Responsive** and mobile-friendly

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/travel_planner.git
cd travel_planner
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add your [OpenWeatherMap API key](https://openweathermap.org/api):

```
NEXT_PUBLIC_OPENWEATHER_API_KEY="your_openweather_api_key"
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Project Structure

```
src/
  app/
    page.tsx         # Main page
    layout.tsx       # App layout
    globals.css      # Global styles
  components/
    calendar/
      Year.tsx
      Month.tsx
      Day.tsx
    TripModal.tsx    # Modal for adding trips
    TripList.tsx     # List of saved trips
    Footer.tsx
  utils/
    fetchCountry.ts  # Fetch country by city
    fetchWeather.ts  # Fetch weather forecast
    isPastDate.ts    # Utility for past date check
```

---

## Customization

- **Colors:** You can easily change available trip colors in `TripModal.tsx`.
- **Weather:** Weather is fetched for the selected city using Open-Meteo and OpenWeatherMap APIs.
- **Persistence:** All trips are saved in your browser's localStorage.

---

## License

MIT

---

## Author

[Teatrum Mundi](https://github.com/TeatrumMundi)
