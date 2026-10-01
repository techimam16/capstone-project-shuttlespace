import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import { authMiddleware, adminOnly } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, adminOnly, getAllUsers);

export default router;