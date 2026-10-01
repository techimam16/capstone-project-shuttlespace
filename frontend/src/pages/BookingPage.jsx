import { useLocation, useNavigate } from "react-router-dom";
import { useBooking } from "../hooks/useBooking";

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { createBooking, loading, error } = useBooking();

  const bookingInfo = location.state;

  if (!bookingInfo) {
    return (
      <div className="max-w-md mx-auto mt-12 p-6 text-center">
        <p className="text-gray-500 mb-4">
          Tidak ada slot yang dipilih. Silakan pilih slot dari halaman utama.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Kembali ke Home
        </button>
      </div>
    );
  }

  const handleConfirm = () => {
    createBooking({
      lapanganId: bookingInfo.lapanganId,
      tanggal: bookingInfo.tanggal,
      jamMulai: bookingInfo.jamMulai,
      jamSelesai: bookingInfo.jamSelesai,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Konfirmasi Booking</h1>

      <div className="bg-gray-50 p-4 rounded mb-6 flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Tanggal</span>
          <span className="font-medium">{bookingInfo.tanggal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Jam</span>
          <span className="font-medium">
            {bookingInfo.jamMulai} - {bookingInfo.jamSelesai}
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => navigate("/")}
          className="flex-1 border py-2 rounded hover:bg-gray-50"
        >
          Batal
        </button>
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Konfirmasi Booking"}
        </button>
      </div>
    </div>
  );
}