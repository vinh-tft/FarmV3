import express from "express";
import { register } from "../Controllers/Auth.Controller.js";
import { validateRegister } from "../Validators/Auth.Validator.js";

const router = express.Router();
router.post("/register", validateRegister, register);
export default router;

router.post('/login', validateLogin, controller.login);
//Endpoints quên và reset mật khẩu
router.post('/forgot-password', validateForgot, controller.forgotPassword);
router.post('/reset-password', validateReset, controller.resetPassword);

module.exports = router;

