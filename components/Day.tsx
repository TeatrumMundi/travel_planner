import React from "react";

interface DayProps {
  day: number;
  isToday?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function Day({ day, isToday = false, isSelected = false, onClick }: DayProps) {
  return (
    <button
      className={`
        w-10 h-10 flex items-center justify-center rounded-xs text-black
        ${isToday ? "bg-indigo-100 text-indigo-700 font-bold" : ""}
        ${isSelected ? "bg-indigo-600 text-white" : ""}
        hover:bg-indigo-200 transition
      `}
      onClick={onClick}
    >
      {day}
    </button>
  );
}