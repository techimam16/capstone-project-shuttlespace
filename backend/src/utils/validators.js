export function validateRegister(body) {
  const { username, password, namaLengkap, noHp } = body;
  if (!username || username.length < 4) return "Username minimal 4 karakter";
  if (!password || password.length < 6) return "Password minimal 6 karakter";
  if (!namaLengkap || namaLengkap.trim().length === 0) return "Nama lengkap wajib diisi";
  if (!noHp || !/^08[0-9]{8,11}$/.test(noHp)) return "Format nomor HP tidak valid (contoh: 081234567890)";
  return null;
}

export function validateLogin(body) {
  const { username, password } = body;
  if (!username) return "Username wajib diisi";
  if (!password) return "Password wajib diisi";
  return null;
}

export function validateLapangan(body) {
  const { nama, hargaPerJam } = body;
  if (!nama || nama.trim().length === 0) return "Nama lapangan wajib diisi";
  if (typeof hargaPerJam !== "number" || hargaPerJam <= 0) return "Harga per jam harus lebih dari 0";
  return null;
}

const timeRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;

export function validateBooking(body) {
  const { lapanganId, tanggal, jamMulai, jamSelesai } = body;
  if (!lapanganId || typeof lapanganId !== "number") return "lapanganId tidak valid";
  if (!tanggal || !/^\d{4}-\d{2}-\d{2}$/.test(tanggal)) return "Format tanggal harus YYYY-MM-DD";
  if (!jamMulai || !timeRegex.test(jamMulai)) return "Format jam mulai tidak valid (HH:MM)";
  if (!jamSelesai || !timeRegex.test(jamSelesai)) return "Format jam selesai tidak valid (HH:MM)";
  if (jamMulai >= jamSelesai) return "Jam mulai harus lebih awal dari jam selesai";
  if (jamMulai < "08:00" || jamSelesai > "22:00") return "Booking hanya bisa dilakukan dalam jam operasional 08:00 - 22:00";
  return null;
}

export function validateBookingStatus(body) {
  const { status } = body;
  if (!["confirmed", "cancelled"].includes(status)) return "Status harus 'confirmed' atau 'cancelled'";
  return null;
}