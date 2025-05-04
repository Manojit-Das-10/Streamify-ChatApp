import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import CheckPage from "./pages/CheckPage";
import NotificationPage from "./pages/NotificationPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import PageNotFound from "./pages/PageNotFound";

import { Toaster } from "react-hot-toast";
import { useEffect,useState } from "react";
import {useQuery} from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios.js";

const App = () => {

  // tanstack query

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/check-auth");
      return response.data;
    },
    retry: false,
  })

  console.log(data)

  return ( 
    <div data-theme="night" className="h-screen">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/onboarding" element={<OnboardingPage/>} />
          <Route path="/check" element={<CheckPage/>} />
          <Route path="/notification" element={<NotificationPage/>} />
          <Route path="/call" element={<CallPage/>} />
          <Route path="/chat" element={<ChatPage/>} />
          <Route path="*" element={<PageNotFound/>} />
      </Routes>

      <Toaster/>

    </div>
  );
};

export default App;
