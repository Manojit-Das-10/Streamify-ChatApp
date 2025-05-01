import Otp from "../models/Otp.js";

const checkEmailVerified = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord || !otpRecord.verified) {
      return res.status(403).json({ message: "Email not verified. Please verify your email first." });
    }

    next();
  } catch (error) {
    console.error("Email verification check error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default checkEmailVerified;
