import { eq, and } from "drizzle-orm";
import { db } from "../config/db.config.js";
import { bookings, lapangan, users } from "../db/schema.js";

// GET semua booking (admin only)
export const getAllBookings = async (req, res) => {
  try {
    const data = await db.select({
        id: bookings.id,
        tanggal: bookings.tanggal,
        jamMulai: bookings.jamMulai,
        jamSelesai: bookings.jamSelesai,
        status: bookings.status,
        createdAt: bookings.createdAt,
        lapanganId: bookings.lapanganId,
        lapanganNama: lapangan.nama,
        userId: bookings.userId,
        namaPenyewa: users.namaLengkap,
        noHpPenyewa: users.noHp,
      })
      .from(bookings)
      .leftJoin(lapangan, eq(bookings.lapanganId, lapangan.id))
      .leftJoin(users, eq(bookings.userId, users.id));

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data booking" });
  }
};

// GET booking milik user yang login (penyewa)
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await db
    .select({
        id: bookings.id,
        tanggal: bookings.tanggal,
        jamMulai: bookings.jamMulai,
        jamSelesai: bookings.jamSelesai,
        status: bookings.status,
        createdAt: bookings.createdAt,
        lapanganId: bookings.lapanganId,
        lapanganNama: lapangan.nama,
      })
      .from(bookings)
      .leftJoin(lapangan, eq(bookings.lapanganId, lapangan.id))
      .where(eq(bookings.userId, userId));

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil riwayat booking" });
  }
};

// GET ketersediaan slot (publik) — filter by lapangan & tanggal
export const getAvailability = async (req, res) => {
  try {
    const { lapanganId, tanggal } = req.query;

    if (!lapanganId || !tanggal) {
      return res.status(400).json({ message: "lapanganId dan tanggal wajib diisi" });
    }

    const data = await db
      .select()
      .from(bookings)
      .where(
        and(
          eq(bookings.lapanganId, parseInt(lapanganId)),
          eq(bookings.tanggal, tanggal)
        )
      );

    // hanya kirim slot yang statusnya bukan cancelled (yang benar-benar menempati slot)
    const bookedSlots = data
      .filter((b) => b.status !== "cancelled")
      .map((b) => ({ jamMulai: b.jamMulai, jamSelesai: b.jamSelesai, status: b.status }));

    res.status(200).json({ bookedSlots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data ketersediaan" });
  }
};

// POST booking baru (penyewa, wajib login)
export const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lapanganId, tanggal, jamMulai, jamSelesai } = req.body;

    if (!lapanganId || !tanggal || !jamMulai || !jamSelesai) {
      return res.status(400).json({ message: "Semua field booking wajib diisi" });
    }

    const waktuMulai = new Date(`${tanggal}T${jamMulai}:00+07:00`);
    if (waktuMulai < new Date()) {
      return res.status(400).json({ message: "Tidak dapat booking untuk waktu yang sudah lewat" });
}

    // pastikan lapangan yang dipilih memang ada
    const lapanganExists = await db
      .select()
      .from(lapangan)
      .where(eq(lapangan.id, lapanganId));

    if (lapanganExists.length === 0) {
      return res.status(404).json({ message: "Lapangan tidak ditemukan" });
    }

    // Cek overlap dengan booking lain yang masih aktif (bukan cancelled)
    const existingBookings = await db
      .select()
      .from(bookings)
      .where(
        and(
          eq(bookings.lapanganId, lapanganId),
          eq(bookings.tanggal, tanggal)
        )
      );

    const hasOverlap = existingBookings.some((b) => {
      if (b.status === "cancelled") return false;
      // overlap terjadi kalau: mulai baru < selesai lama DAN selesai baru > mulai lama
      return jamMulai < b.jamSelesai && jamSelesai > b.jamMulai;
    });

    if (hasOverlap) {
      return res.status(409).json({
        message: "Salah satu jam dalam rentang ini sudah dibooking, silakan pilih waktu lain",
      });
    }

    const newBooking = await db
      .insert(bookings)
      .values({
        userId,
        lapanganId,
        tanggal,
        jamMulai,
        jamSelesai,
        status: "pending",
      })
      .returning();

    res.status(201).json({ message: "Booking berhasil dibuat", data: newBooking[0] });
  } catch (error) {
    // tangkap error unique constraint (anti-bentrok)
    if (error.cause?.code === "23505" || error.code === "23505") {
      return res.status(409).json({
        message: "Slot ini sudah dibooking, silakan pilih waktu lain",
      });
    }
    console.error(error);
    res.status(500).json({ message: "Gagal membuat booking" });
  }
};

// PATCH update status booking (admin only) — confirm/reject
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Status harus 'confirmed' atau 'cancelled'" });
    }

    const updated = await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, parseInt(id)))
      .returning();

    if (updated.length === 0) {
      return res.status(404).json({ message: "Booking tidak ditemukan" });
    }

    res.status(200).json({ message: `Booking berhasil di-${status}`, data: updated[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengupdate status booking" });
  }
};