import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { StyledHeader } from "./Header.styles";
import HeaderLogo from "./HeaderLogo";
import HeaderTools from "./HeaderTools";

type Alarm = {
  alarmId: number;
  memo: string;
  checked: boolean;
  category: number;
};

const Header: FC = () => {
  const [alarmList, setAlarmList] = useState<Alarm[]>([]);

  useEffect(() => {
    // const xhr = new XMLHttpRequest();
    // xhr.open("GET", "http://192.168.31.221:8081/alarms");
    // xhr.setRequestHeader("nickname", "yeji");
    // xhr.responseType = "text"; // 텍스트 응답을 받을 수 있도록 설정
    // xhr.withCredentials = true;
    // xhr.send();

    // 나중에 이렇게 보낼거임
    // xhr.setRequestHeader("X-Access-Token", "your-access-token");
    // xhr.setRequestHeader("X-Nickname", "your-nickname");

    const url = "http://192.168.31.221:8081/alarms?nickname=yeji";
    const eventSource = new EventSource(url, {
      withCredentials: true,
    });

    eventSource.onmessage = async (event) => {
      const alarm = await JSON.parse(event.data);
      console.log(alarm);
      setAlarmList((prv: any) => [...prv, alarm]);
    };
    axios
      .get(url, {
        responseType: "stream",
        withCredentials: true,
        headers: {
          "Content-Type": "text/event-stream",
          Accept: "text/event-stream",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  console.log(alarmList);
  //     const nowAlarm = alarmList.slice();
  //     nowAlarm.map((v: any) => {
  //       return JSON.stringify(v);
  //     });
  //     let setNowAlarm = Array.from(new Set(nowAlarm));
  //     setNowAlarm.map((v: any) => {
  //       return JSON.parse(v);
  //     });
  //     const alarm = await JSON.parse(event.data);
  //     const alarmIdList = setNowAlarm.map((v: any) => {
  //       return String(v.alarmId);
  //     });

  //     if (alarmIdList.indexOf(String(alarm.alarmId)) === -1) {
  //       // 알림 리스트에 존재하지 않는 경우, 새로 추가
  //       setAlarmList([...setNowAlarm, alarm]);
  //     }
  //   };
  //   return () => {
  //     eventSource.close();
  //     xhr.abort();
  //   };
  // }, []);

  return (
    <>
      <StyledHeader>
        <HeaderLogo></HeaderLogo>
        <HeaderTools alarmList={alarmList}></HeaderTools>
      </StyledHeader>
    </>
  );
};

export default Header;
