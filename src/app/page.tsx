"use client";

import { useState } from "react";
import Year from "../components/calendar/Year";
import Footer from "../components/Footer";

export default function Home() {
  const [year, setYear] = useState(2025);

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
          </div>
          <div className="w-full" style={{ minHeight: 725 }}>
            <Year year={year} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}