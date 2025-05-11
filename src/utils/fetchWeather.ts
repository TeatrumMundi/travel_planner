export interface WeatherDay {
  date: string;
  tempMax: number | null;
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