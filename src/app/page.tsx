"use client";

import { useState, useEffect } from "react";
import Year from "../components/calendar/Year";
import Footer from "../components/Footer";
import TripModal from "../components/TripModal";

type SelectedDay = {
  date: Date;
  weather?: number;
};

export default function Home() {
  const [year, setYear] = useState(2025);
  const [city, setCity] = useState("Warszawa");
  const [selectedDay, setSelectedDay] = useState<SelectedDay | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [trips, setTrips] = useState<Array<{ date: Date; city: string; country: string; cost: string; weather?: number; color: string }>>([]);

  // Wczytaj wycieczki z localStorage przy starcie
  useEffect(() => {
    const saved = localStorage.getItem("trips");
    if (saved) {
      setTrips(JSON.parse(saved, (key, value) => {
        // Zamień string na Date dla pola date
        if (key === "date") return new Date(value);
        return value;
      }));
    }
  }, []);

  // Zapisuj wycieczki do localStorage przy każdej zmianie
  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  const handleDayClick = (date: Date, weather?: number) => {
    setSelectedDay({ date, weather });
    setShowModal(true);
  };

  const handleSaveTrip = (trip: { date: Date; city: string; country: string; cost: string; weather?: number; color: string }) => {
    setTrips(prev => [...prev, trip]);
    setShowModal(false);
  };

  const handleDeleteTrip = (index: number) => {
    setTrips(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white min-h-screen pt-4 px-12 w-full font-[family-name:var(--font-lato-light)] flex items-center justify-center">
      <div className="bg-white border border-gray-200 shadow-lg rounded-lg pb-4">
        <header className="text-center mb-4 bg-indigo-600 rounded-t-lg">
          <h1 className="text-2xl font-bold text-white py-4 px-4">Travel Planner</h1>
        </header>
        <div className="flex flex-col items-center px-4">
          <div className="flex items-center gap-4 mb-4">

            <button
              className="px-4 py-1 bg-indigo-700 text-white rounded hover:bg-indigo-800 transition"
              onClick={() => setYear((y) => y - 1)}
            >
              ◀
            </button>

            <span className="text-xl font-bold text-gray-800">{year}</span>

            <button
              className="px-4 py-1 bg-indigo-700 text-white rounded hover:bg-indigo-800 transition"
              onClick={() => setYear((y) => y + 1)}
            >
              ▶
            </button>

            <label htmlFor="city" className="text-gray-700 font-semibold ml-4">Miasto:</label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              className="border border-gray-300 text-black rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Wpisz miasto"
            />
          </div>
          <div className="w-full" style={{ minHeight: 725 }}>
            <Year
              year={year}
              city={city}
              onDayClick={handleDayClick}
              trips={trips}
            />
          </div>
        </div>
        {trips.length > 0 && (
          <div className="mt-8 w-full max-w-2xl mx-auto text-black">
            <h2 className="text-xl font-bold mb-4">Zapisane wycieczki</h2>
            <ul className="space-y-2">
              {trips.map((trip, idx) => (
                <li
                  key={idx}
                  className="border rounded p-2 bg-white shadow flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                >
                  <span><b>{trip.city}</b> ({trip.country})</span>
                  <span>Data: {new Date(trip.date).toLocaleDateString()}</span>
                  <span>Koszt: {trip.cost} zł</span>
                  <span>Pogoda: {trip.weather !== undefined ? `${trip.weather}°C` : "Brak danych"}</span>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => handleDeleteTrip(idx)}
                  >
                    Usuń
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <TripModal
        open={showModal}
        onClose={() => setShowModal(false)}
        city={city}
        selectedDay={selectedDay}
        onSave={handleSaveTrip}
      />
      <Footer />
    </div>
  );
}