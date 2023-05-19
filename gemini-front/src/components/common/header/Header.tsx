import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyledHeader } from "./Header.styles";
import HeaderLogo from "./HeaderLogo";
import HeaderTools from "./HeaderTools";
import { AppStore } from "../../../store/store";
import { useDispatch } from "react-redux";

import { endGenerate } from "../../../store/CreateGeminiSlice";
import GeminiAlarmModal from "../alarm/GeminiAlarmModal";
type Alarm = {
  alarmId: number;
  memo: string;
  checked: boolean;
  category: number;
};

interface Props {
  alarmList: Alarm[];
}

const Header: FC<Props> = () => {
  const [showGeminiAlarm, setShowGeminiAlarm] = useState<boolean>(false);
  const dispatch = useDispatch();
  const startMakeGemini = useSelector(
    (state: AppStore) => state.createGemini.isStarted
  );
  useEffect(() => {
    if (startMakeGemini) {
      const timer = setTimeout(() => {
        dispatch(endGenerate());
        setShowGeminiAlarm(true);
      }, 20000); // 20초 후에 GeminiAlarmModal을 나타냄

      return () => clearTimeout(timer);
    }
  }, [startMakeGemini]);
  const onClose = () => {
    modalClose();
  };
  const modalClose = () => {
    setShowGeminiAlarm(false);
  };
  return (
    <>
      <StyledHeader>
        <HeaderLogo></HeaderLogo>
        <HeaderTools></HeaderTools>
        {showGeminiAlarm && <GeminiAlarmModal onClose={onClose} />}
      </StyledHeader>
    </>
  );
};

export default Header;
