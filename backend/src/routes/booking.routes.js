import { Router } from "express";
import {
  getAllBookings,
  getMyBookings,
  getAvailability,
  createBooking,
  updateBookingStatus,
} from "../controllers/booking.controller.js";
import { authMiddleware, adminOnly, penyewaOnly } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { validateBooking, validateBookingStatus } from "../utils/validators.js";

const router = Router();

router.get("/availability", getAvailability); // publik
router.get("/me", authMiddleware, penyewaOnly, getMyBookings); // penyewa
router.get("/", authMiddleware, adminOnly, getAllBookings); // admin
router.post("/", authMiddleware, penyewaOnly, validate(validateBooking), createBooking); // penyewa (wajib login)
router.patch("/:id/status", authMiddleware, adminOnly, validate(validateBookingStatus), updateBookingStatus); // admin

export default router;