import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import lapanganRoutes from "./routes/lapangan.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend jalan!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/lapangan", lapanganRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/user", userRoutes);

// Route tidak dikenal, balas JSON bukan HTML
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));