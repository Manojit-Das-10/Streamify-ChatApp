import express from "express"
import { login, logout, signup } from "../controllers/auth.controller.js";
import { generalapiLimiter, strictapiLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router()

router.post("/signup",strictapiLimiter,signup);
router.post("/login",strictapiLimiter, login);
router.post("/logout",generalapiLimiter, logout);

export default router;