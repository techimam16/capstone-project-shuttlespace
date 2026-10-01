import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

try {
  const res = await pool.query("SELECT NOW()");
  console.log("✅ Koneksi berhasil:", res.rows[0]);
} catch (err) {
  console.error("❌ Koneksi gagal:", err.message);
} finally {
  await pool.end();
}