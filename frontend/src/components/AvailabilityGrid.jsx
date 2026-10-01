import { OPERATING_HOURS, isSlotBooked, isSlotPast } from "../utils/timeSlots";
import LoadingSpinner from "./LoadingSpinner";

export default function AvailabilityGrid({
  bookedSlots,
  status,
  tanggal,
  selectedSlots,
  onToggleSlot,
}) {
  if (status === "loading") return <LoadingSpinner />;
  if (status === "idle")
    return <p className="text-gray-500 text-center py-8">Pilih lapangan & tanggal terlebih dahulu.</p>;
  if (status === "error")
    return <p className="text-red-600 text-center py-8">Gagal memuat ketersediaan.</p>;

  return (
  <>
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2">
      {OPERATING_HOURS.map((jam) => {
        const booked = isSlotBooked(bookedSlots, jam);
        const past = isSlotPast(tanggal, jam);
        const disabled = booked || past;
        const selected = selectedSlots.includes(jam);

        return (
          <button
            key={jam}
            disabled={disabled}
            title={booked ? "Sudah dibooking" : past ? "Sudah lewat" : ""}
            onClick={() => onToggleSlot(jam)}
            className={`p-3 rounded text-sm font-medium border transition ${
              disabled
                ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200"
                : selected
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-green-50 text-green-700 border-green-300 hover:bg-green-600 hover:text-white"
            }`}
          >
            {jam}
          </button>
        );
      })}
    </div>

    <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-600">
      <span className="flex items-center gap-1.5">
        <span className="w-3 h-3 rounded bg-green-50 border border-green-300"></span> Tersedia
      </span>
      <span className="flex items-center gap-1.5">
        <span className="w-3 h-3 rounded bg-blue-600"></span> Dipilih
      </span>
      <span className="flex items-center gap-1.5">
        <span className="w-3 h-3 rounded bg-gray-200"></span> Terisi / sudah lewat
      </span>
    </div>
  </>
)};