import { axiosInstance } from "./axios";

export const sendOTP = async ({ email }) => {
  const response = await axiosInstance.post("/auth/generate-otp", { email });
  return response.data;
};

export const verifyOTP = async ({ email, otp }) => {
  const res = await axiosInstance.post("/auth/verify-otp", { email, otp });
  return res.data;
};

export const signUp = async (signUpData) => {
  const response = await axiosInstance.post("/auth/signup", signUpData);
  return response.data;
};
