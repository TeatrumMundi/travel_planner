async function fetchCountry(city: string): Promise<string | null> {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!apiKey) return null;

  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`
  );
  const data = await res.json();
  if (data && data[0] && data[0].country) {
    return data[0].country;
  }
  return null;
}

export default fetchCountry;