import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { logoutAccount } from "./store/UserSlice";
import { logout } from "./store/Cookie";
import axios from "axios";
import AppRoutes from "./AppRoutes";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  // const handleResize = () => {
  //   const vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty("--vh", `${vh}px`);
  // };
  // useEffect(() => {
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    if (!accessToken) {
      console.log("로그아웃합니다.");
      dispatch(logoutAccount());
      logout();
      localStorage.clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <BrowserRouter>
      <style>{`
        body::-webkit-scrollbar {
          display: none;
        }
        body {
          -ms-overflow-style: none; /* Internet Explorer 10+ */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
