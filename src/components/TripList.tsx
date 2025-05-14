export interface Trip {
  date: Date;
  city: string;
  country: string;
  cost: string;
  weather?: number;
  color: string;
}

interface TripListProps {
  trips: Trip[];
  onDelete: (index: number) => void;
}

export default function TripList({ trips, onDelete }: TripListProps) {
  if (trips.length === 0) return null;

  return (
    <div className="mt-8 w-full max-w-2xl mx-auto text-black">
      <h2 className="text-xl font-bold mb-4">Zapisane wycieczki</h2>
      <ul className="space-y-2">
        {trips.map((trip, idx) => (
          <li
            key={idx}
            className="border rounded-xs p-1.5 shadow flex flex-col md:flex-row md:items-center md:justify-between"
            style={{
              backgroundColor: trip.color,
              color: "#fff",
            }}
          >
            <span><b>{trip.city}</b> ({trip.country})</span>
            <span>Data: {new Date(trip.date).toLocaleDateString()}</span>
            <span>Koszt: {trip.cost} zł</span>
            <span>Pogoda: {trip.weather !== undefined ? `${trip.weather}°C` : "Brak danych"}</span>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-xs hover:bg-red-600 transition"
              onClick={() => onDelete(idx)}
            >
              Usuń
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}