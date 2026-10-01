const STATUS_CONFIG = {
  pending: { label: "Menunggu Konfirmasi", className: "bg-yellow-100 text-center text-yellow-700" },
  confirmed: { label: "Dikonfirmasi", className: "bg-green-100 text-green-700" },
  cancelled: { label: "Ditolak", className: "bg-red-100 text-red-700" },
  completed: { label: "Selesai", className: "bg-blue-100 text-blue-700" },
  expired: { label: "Kedaluwarsa", className: "bg-gray-100 text-gray-600" },
};

export default function BookingStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || { label: status, className: "bg-gray-100 text-gray-700" };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
}