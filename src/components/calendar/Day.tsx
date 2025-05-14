import React from "react";
import { isPastDate } from "../../utils/isPastDate";

interface DayProps {
  day: number;
  month?: number;
  year?: number;
  isToday?: boolean;
  isSelected?: boolean;
  onClick: (date: Date, weather?: number) => void;
  weather?: number | null;
}

export default function Day({
  day,
  month,
  year,
  isToday = false,
  isSelected = false,
  onClick,
  weather,
}: DayProps) {
  const isPast =
    year !== undefined && month !== undefined
      ? isPastDate(year, month, day)
      : false;

  return (
    <button
      className={`
        w-10 h-10 flex flex-col items-center justify-center rounded-xs text-black
        ${isToday ? "bg-indigo-100 text-indigo-700 font-bold" : ""}
        ${isSelected ? "bg-indigo-600 text-white" : ""}
        ${isPast ? "opacity-40 cursor-not-allowed" : "hover:bg-indigo-200 transition"}
      `}
      onClick={
        isPast
          ? undefined
          : () => {
              if (year !== undefined && month !== undefined) {
                const date = new Date(year, month, day);
                onClick(date, weather ?? undefined);
              }
            }
      }
      disabled={isPast}
    >
      <span>{day}</span>
      {weather !== undefined && weather !== null && (
        <span className="text-xs text-blue-700">{weather.toFixed(0)}°C</span>
      )}
    </button>
  );
}