import { useAdminBookings } from "../../hooks/useAdminBooking";
import BookingStatusBadge from "../../components/BookingStatusBadge";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import { getDisplayStatus } from "../../utils/bookingStatus";

export default function AdminDashboardPage() {
  const { bookings, status, updateStatus } = useAdminBookings();

  const pendingCount = bookings.filter((b) => getDisplayStatus(b) === "pending").length;
  const confirmedCount = bookings.filter((b) => getDisplayStatus(b) === "confirmed").length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>

      {status === "success" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold">{bookings.length}</p>
            <p className="text-sm text-gray-500">Total Booking</p>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            <p className="text-sm text-gray-500">Menunggu Konfirmasi</p>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{confirmedCount}</p>
            <p className="text-sm text-gray-500">Dikonfirmasi</p>
          </div>
        </div>
      )}

      <h2 className="text-lg font-semibold mb-4">Daftar Booking</h2>

      {status === "loading" && <LoadingSpinner />}
      {status === "error" && <p className="text-red-600">Gagal memuat data booking.</p>}
      {status === "empty" && <EmptyState message="Belum ada booking masuk." />}

      {status === "success" && (
        <div className="flex flex-col gap-3">
          {bookings.map((b) => {
            const displayStatus = getDisplayStatus(b);
            return (
              <div key={b.id} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {b.tanggal} • {b.jamMulai.slice(0, 5)} - {b.jamSelesai.slice(0, 5)}
                  </p>
                  <p className="text-sm text-gray-500">
                     {b.lapanganNama || `Lapangan ID: ${b.lapanganId}`} • {b.namaPenyewa || `User ID: ${b.userId}`}
                     {b.noHpPenyewa && ` • ${b.noHpPenyewa}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <BookingStatusBadge status={displayStatus} />
                  {displayStatus === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(b.id, "confirmed")}
                        className="bg-green-600 text-white text-xs px-3 py-1.5 rounded hover:bg-green-700"
                      >
                        Konfirmasi
                      </button>
                      <button
                        onClick={() => updateStatus(b.id, "cancelled")}
                        className="bg-red-600 text-white text-xs px-3 py-1.5 rounded hover:bg-red-700"
                      >
                        Tolak
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}