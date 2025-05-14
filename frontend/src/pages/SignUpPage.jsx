import { useState, useEffect } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { sendOTP, verifyOTP, signUp } from "../lib/api";
import useSignUp from "../hooks/useSignup";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isOtpResendAllowed, setIsOtpResendAllowed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Signup Mutation
  const { signupMutation, isPending: isSignupPending, error } = useSignUp();

  // OTP Generation Mutation
  const { mutate: generateOtpMutation, isPending: isSendingOtp } = useMutation({
    mutationFn: sendOTP,
    onSuccess: () => {
      setStep(2);
      setTimer(30);
      setIsOtpResendAllowed(false);
      toast.success("OTP sent to your email!");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to send OTP.");
    },
  });

  // OTP Verification Mutation
  const { mutate: verifyOtpMutation, isPending: isVerifyingOtp } = useMutation({
    mutationFn: verifyOTP,
    onSuccess: () => {
      setStep(3);
      toast.success("Email verified successfully!");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Invalid OTP.");
    },
  });

  // Handle OTP Timer
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (step === 2 && timer === 0) {
      setIsOtpResendAllowed(true);
    }
  }, [step, timer]);

  // Handle Email Verification
  const handleVerifyEmail = (e) => {
    e.preventDefault();
    if (!signupData.email) {
      toast.error("Please enter an email first.");
      return;
    }
    generateOtpMutation({ email: signupData.email });
  };

  // Handle OTP Submission
  const handleSubmitOtp = (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }
    verifyOtpMutation({ email: signupData.email, otp });
  };

  // Handle Final Signup
  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* Logo */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

          {/* ERROR MESSAGE IF ANY */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          {/* Step 1: Email Input */}
          {step === 1 && (
            <form onSubmit={handleVerifyEmail} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="john@gmail.com"
                  className="input input-bordered w-full"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  required
                />
              </div>
              <button
                className="btn btn-primary w-full"
                type="submit"
                disabled={isSendingOtp}
              >
                {isSendingOtp ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleSubmitOtp} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Enter OTP</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="input input-bordered w-full"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  className="btn btn-primary flex-1"
                  type="submit"
                  disabled={isVerifyingOtp}
                >
                  {isVerifyingOtp ? "Verifying..." : "Verify"}
                </button>
                {isOtpResendAllowed ? (
                  <button
                    type="button"
                    className="btn btn-outline flex-1"
                    onClick={handleVerifyEmail}
                  >
                    Resend OTP
                  </button>
                ) : (
                  <span className="flex-1 text-center text-gray-500">
                    Resend in {timer}s
                  </span>
                )}
              </div>
            </form>
          )}

          {/* Step 3: Full Signup Form */}
          {step === 3 && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full"
                  value={signupData.fullName}
                  onChange={(e) =>
                    setSignupData({ ...signupData, fullName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-control w-full space-y-2 relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="input input-bordered w-full"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    required
                  />
                  <span
                    className="absolute right-4 cursor-pointer top-1/2 transform -translate-y-1/2"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>
                <p className="text-xs opacity-70 mt-1">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    required
                  />
                  <span className="text-xs leading-tight">
                    I agree to the{" "}
                    <span className="text-primary hover:underline">
                      terms of service
                    </span>{" "}
                    and{" "}
                    <span className="text-primary hover:underline">
                      privacy policy
                    </span>
                  </span>
                </label>
              </div>

              <button
                className="btn btn-primary w-full"
                type="submit"
                disabled={isSignupPending}
              >
                {isSignupPending ? "Creating Account..." : "Create Account"}
              </button>
              <div className="text-center mt-4">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
        {/* RIGHT SIDE - IMAGE AND TEXT */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8 text-center">
            <img
              src="/videocall.png"
              alt="Language connection illustration"
              className="w-full h-full rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-6">
              Connect with language partners worldwide
            </h2>
            <p className="opacity-70 mt-2">
              Practice conversations, make friends, and improve your language
              skills together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
