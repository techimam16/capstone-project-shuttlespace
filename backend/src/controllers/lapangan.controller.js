import { eq } from "drizzle-orm";
import { db } from "../config/db.config.js";
import { lapangan } from "../db/schema.js";

// GET semua lapangan (publik)
export const getAllLapangan = async (req, res) => {
  try {
    const data = await db.select().from(lapangan);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data lapangan" });
  }
};

// POST tambah lapangan (admin only)
export const createLapangan = async (req, res) => {
  try {
    const { nama, hargaPerJam } = req.body;

    if (!nama || !hargaPerJam) {
      return res.status(400).json({ message: "Nama dan harga per jam wajib diisi" });
    }

    const newLapangan = await db
      .insert(lapangan)
      .values({ nama, hargaPerJam })
      .returning();

    res.status(201).json({ message: "Lapangan berhasil ditambahkan", data: newLapangan[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menambahkan lapangan" });
  }
};

// PUT update lapangan (admin only)
export const updateLapangan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, hargaPerJam } = req.body;

    const updated = await db
      .update(lapangan)
      .set({ nama, hargaPerJam })
      .where(eq(lapangan.id, parseInt(id)))
      .returning();

    if (updated.length === 0) {
      return res.status(404).json({ message: "Lapangan tidak ditemukan" });
    }

    res.status(200).json({ message: "Lapangan berhasil diupdate", data: updated[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengupdate lapangan" });
  }
};

// DELETE lapangan (admin only)
export const deleteLapangan = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await db
      .delete(lapangan)
      .where(eq(lapangan.id, parseInt(id)))
      .returning();

    if (deleted.length === 0) {
      return res.status(404).json({ message: "Lapangan tidak ditemukan" });
    }

    res.status(200).json({ message: "Lapangan berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menghapus lapangan" });
  }
};