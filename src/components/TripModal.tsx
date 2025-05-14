import React, { useState, useEffect } from "react";
import fetchCountry from "../utils/fetchCountry";

type TripModalProps = {
  open: boolean;
  onClose: () => void;
  city: string;
  selectedDay: {
    date: Date;
    weather?: number;
  } | null;
};

export default function TripModal({ open, onClose, city, selectedDay }: TripModalProps) {
  const [cost, setCost] = useState("");
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    if (!city) {
      setCountry("Nieznany kraj");
      return;
    }
    fetchCountry(city).then((result: string | null) => {
      setCountry(result || "Nieznany kraj");
    });
  }, [city]);

  if (!open || !selectedDay) return null;

  const { date, weather } = selectedDay;
  const today = new Date();
  const daysUntil = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) - 16);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-sm shadow-lg min-w-[300px] text-black">
        <h2 className="text-lg font-bold mb-2">Dodaj wycieczkę</h2>
        <div className="mb-2">Data: {date.toLocaleDateString()}</div>
        <div className="mb-2">Miasto: <b>{city}</b></div>
        <div className="mb-2">Kraj: <b>{country}</b></div>
        <div className="mb-2">
          Pogoda: {weather !== undefined
            ? `${weather}°C`
            : `Temperatura dostępna za ${daysUntil} dni`}
        </div>
        <div className="mb-2">
          Koszt: <input
            type="number"
            value={cost}
            onChange={e => setCost(e.target.value)}
            className="border rounded px-2 py-1"
            placeholder="Podaj koszt"
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button className="bg-indigo-600 text-white px-4 py-1 rounded" onClick={onClose}>Zamknij</button>
        </div>
      </div>
    </div>
  );
}