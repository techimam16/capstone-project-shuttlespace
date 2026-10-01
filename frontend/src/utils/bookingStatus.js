// Status tampilan, dihitung dari status database + waktu sekarang
export function getDisplayStatus(booking) {
  if (booking.status === "cancelled") return "cancelled";

  const endTime = new Date(`${booking.tanggal}T${booking.jamSelesai}`);
  const isPast = endTime < new Date();

  if (!isPast) return booking.status; // pending atau confirmed
  return booking.status === "confirmed" ? "completed" : "expired";
}