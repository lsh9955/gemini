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
  const accessToken = window.localStorage.getItem("accessToken");

  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!accessToken) {
      dispatch(logoutAccount());
      logout();
      window.localStorage.clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const [mapdata, setMapdata] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("/api/spots");
      console.log(response.data.spots);
      setMapdata(response.data.spots);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
