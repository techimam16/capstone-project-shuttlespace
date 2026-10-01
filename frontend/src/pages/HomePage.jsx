import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLapangan } from "../hooks/useLapangan";
import { useAvailability } from "../hooks/useAvailability";
import AvailabilityGrid from "../components/AvailabilityGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { isConsecutive, getBookingRange } from "../utils/timeSlots";

export default function HomePage() {
  const { lapangan, status: lapanganStatus } = useLapangan();
  const [selectedLapangan, setSelectedLapangan] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);

  const { bookedSlots, status: availStatus } = useAvailability(
    selectedLapangan,
    selectedDate
  );

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin = currentUser?.role === "admin";

  // Reset pilihan slot setiap kali lapangan/tanggal berubah
  useEffect(() => {
    setSelectedSlots([]);
  }, [selectedLapangan, selectedDate]);

  const handleToggleSlot = (jam) => {
    if (isAdmin) return; // Admin tidak bisa memilih slot
    setSelectedSlots((prev) =>
      prev.includes(jam) ? prev.filter((s) => s !== jam) : [...prev, jam]
    );
  };

  const consecutive = isConsecutive(selectedSlots);

  const handleProceedBooking = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const { jamMulai, jamSelesai } = getBookingRange(selectedSlots);
    navigate("/booking", {
      state: { lapanganId: selectedLapangan, tanggal: selectedDate, jamMulai, jamSelesai },
    });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24">
      <h1 className="text-2xl font-bold mb-6">Ketersediaan Lapangan</h1>

      {lapanganStatus === "loading" && <LoadingSpinner />}
      {lapanganStatus === "error" && (
        <p className="text-red-600">Gagal memuat data lapangan.</p>
      )}
      {lapanganStatus === "empty" && <EmptyState message="Belum ada lapangan tersedia." />}

      {lapanganStatus === "success" && (
        <>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <select
              className="border p-2 rounded flex-1 shadow-md"
              value={selectedLapangan || ""}
              onChange={(e) => setSelectedLapangan(Number(e.target.value))}
            >
              <option value="">-- Pilih Lapangan --</option>
              {lapangan.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.nama} — Rp{l.hargaPerJam}/jam
                </option>
              ))}
            </select>

            <input
              type="date"
              min={today}
              className="border p-2 rounded flex-1 shadow-md"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          {isAdmin ? (
            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded p-3 mb-4">
              Kamu login sebagai admin. Kalender ini hanya untuk memantau ketersediaan, booking dilakukan oleh penyewa.
            </p>
          ) : (
            <p className="text-sm text-gray-500 mb-4">
              💡 Klik beberapa jam berurutan untuk booking lebih dari 1 jam.
            </p>
          )}

          {(
            <AvailabilityGrid
              bookedSlots={bookedSlots}
              status={availStatus}
              tanggal={selectedDate}
              selectedSlots={selectedSlots}
              onToggleSlot={handleToggleSlot}
            />
          )}

          {!consecutive && (
            <p className="text-red-600 text-sm mt-3">
              ⚠️ Slot yang dipilih harus berurutan tanpa bolong.
            </p>
          )}
        </>
      )}

      {/* Floating action bar saat ada slot dipilih */}
      {selectedSlots.length > 0 && consecutive && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <span className="font-medium">
              {selectedSlots.length} jam dipilih ({getBookingRange(selectedSlots).jamMulai} -{" "}
              {getBookingRange(selectedSlots).jamSelesai})
            </span>
            <button
              onClick={handleProceedBooking}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Lanjut Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}