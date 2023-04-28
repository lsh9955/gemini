import React, { FC } from "react";
import { StyledHeader } from "./Header.styles";
import HeaderLogo from "./HeaderLogo";
import HeaderTools from "./HeaderTools";

const Header: FC = () => {
  return (
    <>
      <StyledHeader>
        <HeaderLogo></HeaderLogo>
        <HeaderTools></HeaderTools>
      </StyledHeader>
    </>
  );
};

export default Header;
