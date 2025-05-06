import { axiosInstance } from "./axios";

export const sendOTP = async ({ email }) => {
  const response = await axiosInstance.post("/auth/generate-otp", { email });
  return response.data;
};

export const verifyOTP = async ({ email, otp }) => {
  const response = await axiosInstance.post("/auth/verify-otp", { email, otp });
  return response.data;
};

export const signUp = async (signUpData) => {
  const response = await axiosInstance.post("/auth/signup", signUpData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const getAuthUser = async () => {
  const response = await axiosInstance.get("/auth/check-auth");
  return response.data;
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
}
