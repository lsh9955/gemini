import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import axios from "axios";
import axiosInstanceWithAccessToken from "../src/utils/AxiosInstanceWithAccessToken";
import Header from "./components/common/header/Header";
import Main from "./pages/main/Main";
import Login from "./pages/auth/Login";
import LoginSuccess from "./pages/auth/LoginSuccess";

import SelectPairchild from "./pages/auth/SelectPairchild";
import MyProfile from "./pages/profile/MyProfile";
import AiImage from "./pages/ai_image/AiImage";
import UserProfile from "./pages/profile/UserProfile";
import UserGeminiDetail from "./components/geminiDetail/UserGeminiDetail";
import MyGeminiDetail from "./components/geminiDetail/MyGeminiDetail";
import NewGeminiDetail from "./components/geminiDetail/NewGeminiDetail";

import SocketMain from "./components/trpg/SocketMain";
import PrivacyRule from "./pages/PrivacyRule";

import NotFoundPage from "./pages/404/NotFoundPage";

import { useSelector } from "react-redux";
import { AppStore } from "../src/store/store";

type Alarm = {
  alarmId: number;
  memo: string;
  checked: boolean;
  category: number;
};

const AppRoutes = () => {
  const location = useLocation();
  const pathsWithoutHeader = [
    "/loginPage",
    "/loginSuccess",
    "/selectPairchild",
  ];

  // 모든 경로를 배열에 저장
  const validPaths = [
    "/",
    "/loginPage",
    "/loginpage",
    "/loginSuccess",
    "/loginsuccess",
    "/selectPairchild",
    "/selectpairchild",
    "/myProfile",
    "/myprofile",
    "/userProfile/:nickname",
    "/aiImage",
    "/aiimage",
    "/geminidetail-user",
    "/geminidetail-my",
    "/geminidetail-new",
    "/room",
    "/privacy",
  ];

  // NotFoundPage를 위한 state 변수
  const [isNotFoundPage, setIsNotFoundPage] = React.useState(false);

  useEffect(() => {
    // 현재 경로가 validPaths에 포함되어 있지 않다면 isNotFoundPage를 true로 설정
    setIsNotFoundPage(!validPaths.includes(location.pathname));
  }, [location.pathname]);

  const shouldShowHeader =
    !pathsWithoutHeader.includes(location.pathname) && !isNotFoundPage;

  //alarm 불러오기
  // const [alarmList, setAlarmList] = useState<Alarm[]>([]);

  // const accessToken = window.localStorage.getItem("accessToken");

  // useEffect(() => {
  //   const fetchAlarms = async () => {
  //     try {
  //       const response = await axios.get("/user-service/alarms", {
  //         withCredentials: true,
  //       });

  //       const newAlarm = response.data;
  //       setAlarmList(newAlarm);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   const eventSource = new EventSource(
  //     "https://mygemini.co.kr/user-service/alarms",
  //     {
  //       withCredentials: true,
  //     }
  //   );

  //   eventSource.onmessage = (event) => {
  //     const newAlarm = JSON.parse(event.data);
  //     setAlarmList(newAlarm);
  //   };

  //   fetchAlarms();

  //   return () => {
  //     eventSource.close();
  //   };
  // }, []);
  // console.log(alarmList);
  const [alarmList, setAlarmList] = useState<Alarm[]>([]);
  const reduxNickname: any = useSelector(
    (state: AppStore) => state.user.nickname
  );

  // useEffect(() => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open("GET", "https://mygemini.co.kr/user-service/alarms");
  //   // xhr.open("GET", "http://192.168.31.221:8081/alarms");
  //   // xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
  //   xhr.responseType = "text"; // 텍스트 응답을 받을 수 있도록 설정
  //   xhr.withCredentials = true;
  //   xhr.send();

  //   const url = `https://mygemini.co.kr/user-service/alarms?nickname=${reduxNickname}`;
  //   // const url = "http://192.168.31.221:8081/alarms?nickname=yeji";
  //   const eventSource = new EventSource(url, {
  //     withCredentials: true,
  //   });
  //   eventSource.onmessage = (event) => {
  //     const newAlarm = JSON.parse(event.data);
  //     setAlarmList(newAlarm);
  //   };
  //   return () => {
  //     eventSource.close();
  //     xhr.abort();
  //   };
  // }, []);
  // console.log(alarmList);

  return (
    <>
      {shouldShowHeader && <Header alarmList={alarmList} />}
      <Switch>
        <Route exact path="/" component={Main} />

        <Route exact path="/loginPage" component={Login} />
        <Route exact path="/loginSuccess" component={LoginSuccess} />

        <Route exact path="/selectPairchild" component={SelectPairchild} />
        <Route exact path="/myProfile" component={MyProfile} />
        <Route exact path="/userProfile/:nickname" component={UserProfile} />

        <Route exact path="/aiImage" component={AiImage} />
        <Route exact path="/geminidetail-user" component={UserGeminiDetail} />
        <Route exact path="/geminidetail-my" component={MyGeminiDetail} />
        <Route exact path="/geminidetail-new" component={NewGeminiDetail} />
        <Route path="/room" component={SocketMain} />
        <Route exact path="/privacy" component={PrivacyRule} />

        {/* ... */}
        {/* NotFoundPage에는 header 안보이게 */}
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default AppRoutes;
