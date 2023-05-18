import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, useHistory, Router } from "react-router-dom";
import "./App.css";
import { logoutAccount } from "./store/UserSlice";
import { logout } from "./store/Cookie";
import axios from "axios";
import AppRoutes from "./AppRoutes";
import BlockBackButtonRouter from "./BlockBackButtonRouter";
import axiosInstanceWithAccessToken from "./utils/AxiosInstanceWithAccessToken";
import { createBrowserHistory } from "history";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  // const history = useHistory();
  const history = createBrowserHistory();

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
    // <BrowserRouter>
    <Router history={history}>
      {/* <BlockBackButtonRouter> */}
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
      {/* </BlockBackButtonRouter> */}
    </Router>
    // </BrowserRouter>
  );
};

export default App;
