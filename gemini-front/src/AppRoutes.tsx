import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import axios from "axios";
import axiosInstanceWithAccessToken from "../src/utils/AxiosInstanceWithAccessToken";
import Header from "./components/common/header/Header";
import Main from "./pages/main/Main";
import Login from "./pages/auth/Login";
import LoginSuccess from "./pages/auth/LoginSuccess";
import { useSelector } from "react-redux";
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
    "/loginpage",
    "/loginSuccess",
    "/loginsuccess",
    "/selectPairchild",
    "/selectpairchild",
    // "/userProfile",
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
    "/userprofile/:nickname",
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
    // window.scrollTo(0, 0); // 스크롤 맨 위로 강제 고정. 무한스크롤 버그 해결
    // // 현재 경로가 validPaths에 포함되어 있지 않다면 isNotFoundPage를 true로 설정
    // setIsNotFoundPage(!validPaths.includes(location.pathname));
    // 현재 경로가 validPaths에 포함되어 있지 않다면 isNotFoundPage를 true로 설정
    const isValidPath = validPaths.some((path) => {
      const regexPath = path.replace(/:\w+/g, "[^/]+");
      const regex = new RegExp(`^${regexPath}$`, "i");
      return regex.test(location.pathname);
    });
    setIsNotFoundPage(!isValidPath);
  }, [location.pathname]);

  // 😀아래 바꾸지마세요. 헤더 고쳐놨는데 또 고장내면 나 힘들어..
  const shouldShowHeader =
    !pathsWithoutHeader.some((path) => {
      const regex = new RegExp(`^${path}`);
      return regex.test(location.pathname);
    }) && !isNotFoundPage;

  console.log("url경로를 보여줌");
  console.log(location.pathname);

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

  // // 알람 구독
  // useEffect(() => {
  //   let eventSource: any;
  //   console.log("useeffect로 들어오나?");
  //   if (reduxNickname) {
  //     console.log("userinfo 가져오기 성공");
  //     const alarmSubscribe = () => {
  //       eventSource = new EventSource(
  //         `https://mygemini.co.kr/user-service/alarms/subscribe?nickname=${reduxNickname}`,
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       console.log("열리기 직전");
  //       console.log(eventSource);
  //       eventSource.onopen = () => {
  //         console.log("SSE 연결이 열렸습니다.");
  //       };

  //       eventSource.onmessage = (event: any) => {
  //         console.log("onmessege로 들어왔나?");
  //         const eventData = JSON.parse(event.data);
  //         console.log(eventData);
  //       };

  //       eventSource.onerror = (error: any) => {
  //         console.error("SSE 연결 중 오류가 발생했습니다.", error);
  //       };

  //       return () => {
  //         // 컴포넌트가 언마운트될 때 SSE 연결 종료

  //         if (!reduxNickname) {
  //           eventSource.close();
  //         }
  //       };
  //     };
  //     alarmSubscribe();
  //     console.log("설마 나갔니?");
  //   }
  // }, [reduxNickname]);

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
