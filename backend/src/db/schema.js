import { pgTable, serial, varchar, integer, timestamp, date, time, uniqueIndex, } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 20 }).notNull().default("penyewa"),
  namaLengkap: varchar("nama_lengkap", { length: 100 }),
  noHp: varchar("no_hp", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const lapangan = pgTable("lapangan", {
  id: serial("id").primaryKey(),
  nama: varchar("nama", { length: 100 }).notNull(),
  hargaPerJam: integer("harga_per_jam").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  lapanganId: integer("lapangan_id").references(() => lapangan.id).notNull(),
  tanggal: date("tanggal").notNull(),
  jamMulai: time("jam_mulai").notNull(),
  jamSelesai: time("jam_selesai").notNull(),
  status: varchar("status", { length: 20 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  noBentrok: uniqueIndex("unique_slot_booking")
    .on(table.lapanganId, table.tanggal, table.jamMulai)
    .where(sql`${table.status} != 'cancelled'`),
}));