import React, { FC, useEffect, useState } from "react";
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
    xhr.open("GET", "http://192.168.0.71:8081/alarms");
    xhr.setRequestHeader("nickname", "yeji");
    xhr.responseType = "text"; // 텍스트 응답을 받을 수 있도록 설정
    xhr.withCredentials = true;
    xhr.send();

    // 나중에 이렇게 보낼거임
    // xhr.setRequestHeader("X-Access-Token", "your-access-token");
    // xhr.setRequestHeader("X-Nickname", "your-nickname");

    const url = "http://192.168.0.71:8081/alarms?nickname=yeji";
    const eventSource = new EventSource(url, {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      const alarm = JSON.parse(event.data);
      setAlarmList((prev) => [...prev, alarm]); // 알림 리스트에 존재하지 않는 경우, 새로 추가
    };
    return () => {
      eventSource.close();
      xhr.abort();
    };
  }, []);

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
