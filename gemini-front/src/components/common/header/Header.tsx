import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyledHeader } from "./Header.styles";
import HeaderLogo from "./HeaderLogo";
import HeaderTools from "./HeaderTools";
import { AppStore } from "../../../store/store";

type Alarm = {
  alarmId: number;
  memo: string;
  checked: boolean;
  category: number;
};

interface Props {
  alarmList: Alarm[];
}

const Header: FC<Props> = ({ alarmList }) => {
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
