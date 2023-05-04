// import LoginInput from '../../Components/Auth/LoginInput';
// import GoBackPage from '../../Components/Menu/goBackPage';
// import { Head, BannerLine, Title } from '../../styles/Menu/NavStyle';
import React, { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LeftComponent, MainWrapper, RightComponent } from "./Main.styles";
import AnimatedArrow from "../../components/main/AnimatedArrow";

const Main: FC = () => {
  const history = useHistory();
  const accessToken = window.localStorage.getItem("accessToken");
  console.log(`accessToken:${accessToken}`);

  useEffect(() => {
    if (!accessToken) {
      alert("로그인이 필요합니다. 로그인페이지로 이동합니다.");
      history.push("/loginpage");
    }
  }, []);

  return (
    <>
      <MainWrapper>
        <LeftComponent to="/"></LeftComponent>
        <RightComponent to="/">
          <AnimatedArrow></AnimatedArrow>
        </RightComponent>
      </MainWrapper>
    </>
  );
};

export default Main;
