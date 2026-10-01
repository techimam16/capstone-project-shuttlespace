import { OPERATING_HOURS, isSlotBooked } from "../utils/timeSlots";
import LoadingSpinner from "./LoadingSpinner";

export default function AvailabilityList({ bookedSlots, status, onSelectSlot }) {
  if (status === "loading") return <LoadingSpinner />;
  if (status === "idle")
    return <p className="text-gray-500 text-center py-8">Pilih lapangan & tanggal terlebih dahulu.</p>;
  if (status === "error")
    return <p className="text-red-600 text-center py-8">Gagal memuat ketersediaan.</p>;

  return (
    <div className="flex flex-col gap-2">
      {OPERATING_HOURS.map((jam) => {
        const booked = isSlotBooked(bookedSlots, jam);
        return (
          <div
            key={jam}
            className={`flex justify-between items-center p-3 rounded border ${
              booked ? "bg-gray-100 border-gray-200" : "bg-white border-green-200"
            }`}
          >
            <span className="font-medium">{jam}</span>
            {booked ? (
              <span className="text-sm text-gray-500">Terisi</span>
            ) : (
              <button
                onClick={() => onSelectSlot(jam)}
                className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700"
              >
                Booking
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}