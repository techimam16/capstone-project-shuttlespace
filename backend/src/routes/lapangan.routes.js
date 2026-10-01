import { Router } from "express";
import {
  getAllLapangan,
  createLapangan,
  updateLapangan,
  deleteLapangan,
} from "../controllers/lapangan.controller.js";
import { authMiddleware, adminOnly } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { validateLapangan } from "../utils/validators.js";

const router = Router();

router.get("/", getAllLapangan); // publik
router.post("/", authMiddleware, adminOnly, validate(validateLapangan), createLapangan);
router.put("/:id", authMiddleware, adminOnly, validate(validateLapangan), updateLapangan);
router.delete("/:id", authMiddleware, adminOnly, deleteLapangan);

export default router;