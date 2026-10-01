import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { validateRegister, validateLogin } from "../utils/validators.js";

const router = Router();

router.post("/register", validate(validateRegister), register);
router.post("/login", validate(validateLogin), login);

export default router;