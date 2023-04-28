import React, { FC } from "react";
import { StyledHeader } from "./Header.styles";
import HeaderLogo from "./HeaderLogo";

const Header: FC = () => {
  return (
    <>
      <StyledHeader>
        <HeaderLogo></HeaderLogo>
      </StyledHeader>
    </>
  );
};

export default Header;
