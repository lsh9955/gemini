// import LoginInput from '../../Components/Auth/LoginInput';
// import GoBackPage from '../../Components/Menu/goBackPage';
// import { Head, BannerLine, Title } from '../../styles/Menu/NavStyle';
import React, { FC } from "react";
// import { useHistory } from "react-router-dom";
import {
  LeftComponent,
  MainWrapper,
  RightComponent,
  MiddleBox,
} from "./Main.styles";
import AnimatedArrow from "../../components/main/AnimatedArrow";
import Gallery from "../../components/main/Gallery";

const Main: FC = () => {
  // const history = useHistory();
  const accessToken = window.localStorage.getItem("accessToken");
  console.log(`accessToken:${accessToken}`);

  // useEffect(() => {
  //   if (!accessToken) {
  //     alert("로그인이 필요합니다. 로그인페이지로 이동합니다.");
  //     history.push("/loginPage");
  //   }
  // }, []);

  return (
    <>
      <MainWrapper>
        <LeftComponent to="/aiImage"></LeftComponent>
        <RightComponent to="/">
          <AnimatedArrow></AnimatedArrow>
        </RightComponent>
      </MainWrapper>
      <MiddleBox>
        <AnimatedArrow></AnimatedArrow>
      </MiddleBox>
      <Gallery></Gallery>
    </>
  );
};

export default Main;
