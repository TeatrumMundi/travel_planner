export interface WeatherDay {
  date: string;
  tempMax: number | null;
}

export async function fetchCityCoords(city: string): Promise<{ latitude: number; longitude: number } | null> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pl&format=json`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  if (data.results && data.results.length > 0) {
    return {
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude,
    };
  }
  return null;
}

export async function fetchWeatherForecast(
  latitude: number,
  longitude: number,
  days: number = 16
): Promise<WeatherDay[]> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&forecast_days=${days}&timezone=Europe%2FWarsaw`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather data");

  const data = await res.json();
  return (data.daily.time || []).map((date: string, idx: number) => ({
    date,
    tempMax: data.daily.temperature_2m_max
      ? data.daily.temperature_2m_max[idx]
      : null,
  }));
}

// Funkcja pobierająca pogodę po nazwie miasta
export async function fetchWeatherByCity(
  city: string,
  days: number = 16
): Promise<WeatherDay[]> {
  const coords = await fetchCityCoords(city);
  if (!coords) throw new Error("Nie znaleziono miasta");
  return fetchWeatherForecast(coords.latitude, coords.longitude, days);
}