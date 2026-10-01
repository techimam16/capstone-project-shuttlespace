import { useMyBookings } from "../hooks/useMyBooking";
import BookingStatusBadge from "../components/BookingStatusBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { getDisplayStatus } from "../utils/bookingStatus";

export default function RiwayatPage() {
  const { bookings, status } = useMyBookings();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Riwayat Booking Saya</h1>

      {status === "loading" && <LoadingSpinner />}
      {status === "error" && (
        <p className="text-red-600 text-center py-8">Gagal memuat riwayat booking.</p>
      )}
      {status === "empty" && <EmptyState message="Kamu belum memiliki riwayat booking." />}

      {status === "success" && (
        <div className="flex flex-col gap-3">
          {bookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">
                  {booking.tanggal} • {booking.jamMulai.slice(0, 5)} - {booking.jamSelesai.slice(0, 5)}
                </p>
                <p className="text-sm text-gray-500">{booking.lapanganNama || `Lapangan ID: ${booking.lapanganId}`}</p>
              </div>
              <BookingStatusBadge status={getDisplayStatus(booking)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}