import bcrypt from "bcryptjs";
import { db } from "../config/db.config.js";
import { users } from "./schema.js";

async function seedAdmin() {
  try {
    const hashedPassword = await bcrypt.hash("adminpw123", 10);

    const newAdmin = await db
      .insert(users)
      .values({
        username: "admin_shuttlespace",
        password: hashedPassword,
        role: "admin",
        namaLengkap: "Admin ShuttleSpace",
      })
      .returning({ id: users.id, username: users.username, role: users.role });

    console.log("✅ Admin berhasil dibuat:", newAdmin[0]);
  } catch (error) {
    if (error.code === "23505") {
      console.log("⚠️ Admin dengan username ini sudah ada, tidak dibuat ulang.");
    } else {
      console.error("❌ Gagal membuat admin:", error.message);
    }
  } finally {
    process.exit(0);
  }
}

seedAdmin();