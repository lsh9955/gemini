import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { logoutAccount } from "./store/UserSlice";
import { logout } from "./store/Cookie";
import axios from "axios";
import Main from "./pages/main/Main";

function App() {
  // const navigate = useNavigate();
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
      // navigate('/Login');
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
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/*" element={<NotFound />} /> */}
        {/* <Route path="/map/*" element={<Map mapdata={mapdata} />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Admin data={mapdata} />} />
          <Route path="/admin/:id" element={<AdminDetail />} />
        </Route>
        <Route path="/map/detail/:id/*" element={<MapDetail />}>
          <Route index element={<DetailHome />} />
          <Route path="Home" element={<DetailHome />} />
          <Route path="Photo" element={<DetailPhoto />} />
          <Route path="Recommend" element={<DetailRecommend />} />
          <Route path="Review" element={<DetailReview />} />
          <Route path="Map" element={<DetailMap />} />
        </Route>
        <Route path="/myloc" element={<Mylocation />} />
        <Route path="/map/detail/:id/EditReview" element={<EditReview />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Donation" element={<DonationPage />} />
        <Route path="/Mypage" element={<MyPage />} />
        <Route path="/Mypage/Donation" element={<MyDonation />} />
        <Route path="/Mypage/MyInfoManage" element={<MyInfoManage />} />
        <Route path="/Mypage/MyReview" element={<MyReview />} />
        <Route path="/Mypage/ChangePassword" element={<ChangePasswordPage />} />
        <Route
          path="/Mypage/ChangeBarrierFree"
          element={<ChangeBarrierFreePage />}
        />
        <Route path="/map/newlocation/*" element={<NewLocation />} />
        <Route path="/map/newlocation/search" element={<SearchAddress />}>
          <Route index element={<SearchAddressMain />} />
          <Route path="main" element={<SearchAddressMain />} />
          <Route path="marker" element={<SearchAddressMap />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
