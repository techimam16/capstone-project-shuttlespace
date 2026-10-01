import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "../config/db.config.js";
import { users } from "../db/schema.js";

// REGISTER - only for penyewa
export const register = async (req, res) => {
    try {
        const { username, password, role, namaLengkap, noHp } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username dan Password wajib diisi" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.insert(users).values({
            username,
            password: hashedPassword,
            namaLengkap,
            noHp,
            role: "penyewa", // Default role is "penyewa"
        })
        .returning({ id: users.id, username: users.username, role: users.role });

        res.status(201).json({
            message: "Registrasi berhasil",
            user: newUser[0],
        });
    } catch (error) {
        if (error.code === "23505" || error.cause?.code === "23505") { 
            return res.status(400).json({ message: "Username sudah digunakan" });
        }
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

//LOGIN - Penyewa dan Admin
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username dan Password wajib diisi" });
        }

        const result = await db.select().from(users).where(eq(users.username, username));
        const user = result[0];

        if (!user) {
            return res.status(401).json({ message: "Username atau password salah" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Username atau password salah" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login berhasil",
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                namaLengkap: user.namaLengkap,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};