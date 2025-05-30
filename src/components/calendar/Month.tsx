"use client";

import React, { useEffect, useState } from "react";
import Day from "./Day";
import { fetchWeatherByCity, WeatherDay } from "../../utils/fetchWeather";
import { Trip } from "../TripList";

const daysOfWeek = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"];

interface MonthProps {
  year: number;
  month: number;
  city: string;
  selectedDay?: number;
  onDayClick: (date: Date, weather?: number) => void;
  trips: Trip[];
}

function getMondayStartIndex(jsDay: number) {
  return (jsDay + 6) % 7;
}

export default function Month({
  year,
  month,
  city,
  selectedDay,
  onDayClick,
  trips,
}: MonthProps) {
  const [weather, setWeather] = useState<WeatherDay[]>([]);
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchWeatherByCity(city, 16).then(setWeather).catch(() => setWeather([]));
  }, [year, month, city]);

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  const startDay = getMondayStartIndex(firstDay.getDay());

  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = Array(startDay).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  function getTempMax(day: number) {
    const date = new Date(year, month, day).toISOString().slice(0, 10);
    const found = weather.find((w) => w.date === date);
    return found?.tempMax ?? null;
  }

  function getTripForDay(day: number) {
    return trips.find(
      (trip) =>
        new Date(trip.date).getFullYear() === year &&
        new Date(trip.date).getMonth() === month &&
        new Date(trip.date).getDate() === day
    );
  }

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((d) => (
          <div key={d} className="text-center font-semibold text-gray-600">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((day, idx) =>
          day ? (
            <Day
              key={idx}
              day={day}
              month={month}
              year={year}
              weather={getTempMax(day)}
              isToday={
                today.getFullYear() === year &&
                today.getMonth() === month &&
                today.getDate() === day
              }
              isSelected={selectedDay === day}
              onClick={onDayClick}
              tripColor={getTripForDay(day)?.color}
              isBlocked={!!getTripForDay(day)}
            />
          ) : (<div key={idx} />)
        )}
      </div>
    </div>
  );
}