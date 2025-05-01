import express from "express"
import { generateOTP, login, logout, onboard, signup, verifyOtp } from "../controllers/auth.controller.js";
import { generalapiLimiter, strictapiLimiter } from "../middlewares/rateLimiter.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import checkEmailVerified from "../middlewares/otp.middleware.js";

const router = express.Router()

router.post("/generate-otp", strictapiLimiter,generateOTP);
router.post("/verify-otp", strictapiLimiter,verifyOtp);

router.post("/signup", strictapiLimiter, checkEmailVerified, signup);
router.post("/login", strictapiLimiter, login);
router.post("/logout", generalapiLimiter, logout);

router.post("/onboarding", strictapiLimiter, protectedRoute, onboard)

// check if the user is logged in or not
router.get("/check-auth", generalapiLimiter, protectedRoute, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    })
})

export default router;