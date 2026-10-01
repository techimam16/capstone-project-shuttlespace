export const OPERATING_HOURS = Array.from({ length: 14 }, (_, i) => {
  const hour = 8 + i;
  return `${hour.toString().padStart(2, "0")}:00`;
});

export function isSlotBooked(bookedSlots, jam) {
  return bookedSlots.some((slot) => slot.jamMulai.slice(0, 5) === jam);
}

function getTodayLocal() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isSlotPast(tanggal, jam) {
  const today = getTodayLocal();
  if (tanggal !== today) return false;
  const now = new Date();
  const [jamSlot] = jam.split(":");
  return now.getHours() >= parseInt(jamSlot);
}

// Cek apakah array jam yang dipilih itu berurutan tanpa bolong
export function isConsecutive(selectedSlots) {
  if (selectedSlots.length <= 1) return true;
  const sorted = [...selectedSlots].sort();
  for (let i = 1; i < sorted.length; i++) {
    const prevHour = parseInt(sorted[i - 1].split(":")[0]);
    const currHour = parseInt(sorted[i].split(":")[0]);
    if (currHour - prevHour !== 1) return false;
  }
  return true;
}

// Hitung jamMulai & jamSelesai dari slot-slot yang dipilih
export function getBookingRange(selectedSlots) {
  const sorted = [...selectedSlots].sort();
  const jamMulai = sorted[0];
  const lastHour = parseInt(sorted[sorted.length - 1].split(":")[0]);
  const jamSelesai = `${(lastHour + 1).toString().padStart(2, "0")}:00`;
  return { jamMulai, jamSelesai };
}