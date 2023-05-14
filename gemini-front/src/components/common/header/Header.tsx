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
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://172.30.1.22:8081/alarms");
    xhr.setRequestHeader("nickname", "yeji");
    xhr.responseType = "text"; // 텍스트 응답을 받을 수 있도록 설정
    xhr.withCredentials = true;
    xhr.send();

    // 나중에 이렇게 보낼거임
    // xhr.setRequestHeader("X-Access-Token", "your-access-token");
    // xhr.setRequestHeader("X-Nickname", "your-nickname");

    const url = "http://172.30.1.22:8081/alarms?nickname=yeji";
    const eventSource = new EventSource(url, {
      withCredentials: true,
    });
    eventSource.onmessage = (event) => {
      const alarm = JSON.parse(event.data);
      setAlarmList((prev) => [...prev, alarm]);
    };
    return () => {
      eventSource.close();
      xhr.abort();
    };
  }, []);
  console.log(alarmList);

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
