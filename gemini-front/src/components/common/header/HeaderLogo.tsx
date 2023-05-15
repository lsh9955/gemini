import React, { FC } from "react";
import { useHistory } from "react-router-dom";
// import GeminiLogo from "../../assets/img/GeminiLogo.png";
import GeminiLogo from "../../../assets/img/GeminiLogo.png";
import { StyledHeaderLogo } from "./HeaderLogo.styles";

const HeaderLogo: FC = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  };
  return (
    <>
      <StyledHeaderLogo
        src={GeminiLogo}
        alt="Gemini Logo"
        onClick={handleClick}
      ></StyledHeaderLogo>
    </>
  );
};

export default HeaderLogo;
