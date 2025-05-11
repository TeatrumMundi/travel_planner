"use client";

import Year from "../../components/Year";

export default function Home() {

  return (
    <div className="bg-white min-h-screen pt-4 px-12 w-full font-[family-name:var(--font-lato-light)] flex items-center justify-center">
      <div className="bg-white border border-gray-200 shadow-lg rounded-lg pb-4">
        <header className="text-center mb-4 bg-indigo-600 rounded-t-lg">
          <h1 className="text-2xl font-bold text-white py-4 px-4">Travel Planner</h1>
        </header>
        <div className="flex justify-center px-4">
          <Year year={2025} />
        </div>
      </div>
    </div>
  );
}