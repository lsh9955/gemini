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

  // 스크롤바
  const [scrollBarHeight, setScrollBarHeight] = useState(30);

  const updateScrollBarHeight = () => {
    const scrollableElement = document.documentElement;
    const scrollHeight = scrollableElement.scrollHeight;
    const clientHeight = scrollableElement.clientHeight;

    const newScrollBarHeight = (clientHeight / scrollHeight) * 100;
    setScrollBarHeight(newScrollBarHeight);
  };

  useEffect(() => {
    updateScrollBarHeight();
    window.addEventListener("resize", updateScrollBarHeight);
    return () => window.removeEventListener("resize", updateScrollBarHeight);
  }, []);
  // 스크롤바

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
          width: 16px;
        }
        body::-webkit-scrollbar-thumb {
          height: ${scrollBarHeight}%;
        }
        body::-webkit-scrollbar-thumb {
          background: #051320;
          border-radius: 5px;
        }
        body::-webkit-scrollbar-track {
          background: rgba(33, 122, 244, .1);
        }
      `}</style>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
