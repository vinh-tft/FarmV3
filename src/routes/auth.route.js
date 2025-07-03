import express from "express";
import { register } from "../Controllers/auth.controller.js";
import { validateRegister } from "../Validators/Auth.Validator.js";

const router = express.Router();
router.post("/register", validateRegister, register);
export default router;
