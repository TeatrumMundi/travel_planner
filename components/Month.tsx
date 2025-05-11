"use client";

import React from "react";
import Day from "./Day";

const daysOfWeek = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"];

interface MonthProps {
  year: number;
  month: number;
  today?: Date;
  selectedDay?: number;
  onDayClick?: (day: number) => void;
}

function getMondayStartIndex(jsDay: number) {
  return (jsDay + 6) % 7;
}

export default function Month({
  year,
  month,
  today = new Date(),
  selectedDay,
  onDayClick,
}: MonthProps) {
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
              isToday={
                today.getFullYear() === year &&
                today.getMonth() === month &&
                today.getDate() === day
              }
              isSelected={selectedDay === day}
              onClick={() => onDayClick?.(day)}
            />
          ) : (<div key={idx} />)
        )}
      </div>
    </div>
  );
}