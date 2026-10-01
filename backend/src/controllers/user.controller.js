import { users } from "../db/schema.js";
import { db } from "../config/db.config.js";

export const getAllUsers = async (req, res) => {
  try {
    const data = await db
      .select({
        id: users.id,
        username: users.username,
        role: users.role,
        namaLengkap: users.namaLengkap,
        noHp: users.noHp,
        createdAt: users.createdAt,
      })
      .from(users);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data user" });
  }
};