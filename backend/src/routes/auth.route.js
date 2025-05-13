import express from "express"
import { generateOTP, login, logout, onboard, signup, verifyOtp } from "../controllers/auth.controller.js";
import { generalapiLimiter, strictapiLimiter } from "../middlewares/rateLimiter.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import checkEmailVerified from "../middlewares/otp.middleware.js";

const router = express.Router()
router.use(generalapiLimiter);

router.post("/generate-otp", generateOTP);
router.post("/verify-otp", verifyOtp);

router.post("/signup", checkEmailVerified, signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/onboarding", protectedRoute, onboard)

// check if the user is logged in or not
router.get("/check-auth", protectedRoute, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    })
})

export default router;