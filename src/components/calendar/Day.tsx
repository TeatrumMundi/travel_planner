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
  tripColor?: string;
  isBlocked?: boolean;
}

export default function Day({
  day,
  month,
  year,
  isToday = false,
  isSelected = false,
  onClick,
  weather,
  tripColor,
  isBlocked,
}: DayProps) {
  const isPast =
    year !== undefined && month !== undefined
      ? isPastDate(year, month, day)
      : false;

  const disabled = isPast || isBlocked;

  return (
    <button
      style={tripColor ? { backgroundColor: tripColor, color: "#fff" } : {}}
      className={`
        w-9 h-9 flex flex-col items-center justify-center rounded-xs
        ${isToday && !tripColor ? "bg-indigo-100 text-indigo-700 font-bold" : ""}
        ${isSelected && !tripColor ? "bg-indigo-600 text-white" : ""}
        ${disabled ? "opacity-60 cursor-not-allowed" : "hover:bg-indigo-200 transition"}
        text-black
      `}
      onClick={
        disabled
          ? undefined
          : () => {
              if (year !== undefined && month !== undefined) {
                const date = new Date(year, month, day);
                onClick(date, weather ?? undefined);
              }
            }
      }
      disabled={disabled}
    >
      <span>{day}</span>
      {weather !== undefined && weather !== null && (
        <span className="text-xs text-blue-700">{weather.toFixed(0)}°C</span>
      )}
    </button>
  );
}