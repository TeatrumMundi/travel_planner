import Month from "./Month";

interface YearProps {
  year: number;
  city: string;
  onDayClick: (date: Date, weather?: number) => void;
  trips: Array<{ date: Date; city: string; country: string; cost: string; weather?: number; color: string }>;
}

export default function Year({ year, city, onDayClick, trips }: YearProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
      {Array.from({ length: 12 }).map((_, idx) => (
        <div key={idx} className="p-2">
          <h2 className="text-center font-bold mb-2 text-black">
            {new Date(year, idx).toLocaleString("pl-PL", { month: "long" })}
          </h2>
          <Month
            year={year}
            month={idx}
            city={city}
            onDayClick={onDayClick}
            trips={trips}
          />
        </div>
      ))}
    </div>
  );
}