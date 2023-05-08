import React, { FC, useEffect, useState } from "react";
import { StyledHeader } from "./Header.styles";
import HeaderLogo from "./HeaderLogo";
import HeaderTools from "./HeaderTools";

type Alarm = {
  memo: string;
  checked: boolean;
  category: number;
};

const Header: FC = () => {
  const [alarmList, setAlarmList] = useState<Alarm[]>([]);

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://192.168.31.221:8081/alarms");
    xhr.setRequestHeader("X-Username", "yyj");
    xhr.withCredentials = true;
    xhr.send();

    const eventSource = new EventSource("http://192.168.31.221:8081/alarms");
    eventSource.onmessage = (event) => {
      const alarm = JSON.parse(event.data);
      setAlarmList((prev) => [...prev, alarm]);
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
