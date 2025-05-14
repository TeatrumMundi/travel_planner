"use client";

import { useState, useEffect } from "react";
import Year from "../components/calendar/Year";
import Footer from "../components/Footer";
import TripModal from "../components/TripModal";
import TripList, { Trip } from "../components/TripList";

type SelectedDay = {
  date: Date;
  weather?: number;
};

export default function Home() {
  // --- STANY ---
  const [year, setYear] = useState(2025);
  const [city, setCity] = useState("Warszawa");
  const [selectedDay, setSelectedDay] = useState<SelectedDay | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);

  // --- LOCAL STORAGE ---
  useEffect(() => {
    const saved = localStorage.getItem("trips");
    if (saved) {
      setTrips(JSON.parse(saved, (key, value) => (key === "date" ? new Date(value) : value)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  // --- HANDLERY ---
  const handleDayClick = (date: Date, weather?: number) => {
    setSelectedDay({ date, weather });
    setShowModal(true);
  };

  const handleSaveTrip = (trip: Trip) => {
    setTrips(prev => [...prev, trip]);
    setShowModal(false);
  };

  const handleDeleteTrip = (index: number) => {
    setTrips(prev => prev.filter((_, i) => i !== index));
  };

  // --- RENDER ---
  return (
    <div className="bg-white min-h-screen pt-4 px-12 w-full font-[family-name:var(--font-lato-light)] flex items-center justify-center">
      <div className="border border-gray-200 shadow-lg rounded-lg pb-4 bg-white">
        <header className="text-center mb-4 bg-indigo-600 rounded-t-lg">
          <h1 className="text-2xl font-bold text-white py-4 px-4">Travel Planner</h1>
        </header>
        <div className="flex flex-col items-center px-4">
          {/* Nawigacja roku i wybór miasta */}
          <div className="flex items-center gap-4 mb-4">
            <button
              className="px-4 py-1 bg-indigo-700 text-white rounded hover:bg-indigo-800 transition"
              onClick={() => setYear(y => y - 1)}
            >◀</button>
            <span className="text-xl font-bold text-gray-800">{year}</span>
            <button
              className="px-4 py-1 bg-indigo-700 text-white rounded hover:bg-indigo-800 transition"
              onClick={() => setYear(y => y + 1)}
            >▶</button>
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
          {/* Kalendarz */}
          <div className="w-full" style={{ minHeight: 725 }}>
            <Year
              year={year}
              city={city}
              onDayClick={handleDayClick}
              trips={trips}
            />
          </div>
          {/* Lista wycieczek */}
          <TripList trips={trips} onDelete={handleDeleteTrip} />
        </div>
      </div>
      {/* Modal dodawania wycieczki */}
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