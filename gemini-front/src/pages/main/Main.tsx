// import LoginInput from '../../Components/Auth/LoginInput';
// import GoBackPage from '../../Components/Menu/goBackPage';
// import { Head, BannerLine, Title } from '../../styles/Menu/NavStyle';
import React, {
  FC,
  useEffect,
  useState,
  useRef,
  forwardRef,
  MutableRefObject,
} from "react";
import { useHistory } from "react-router-dom";
import {
  LeftComponent,
  MainWrapper,
  RightComponent,
  MiddleBox,
} from "./Main.styles";
import AnimatedArrow from "../../components/main/AnimatedArrow";
import Gallery from "../../components/main/Gallery";
import { useStore } from "react-redux";

const Main: React.FC = () => {
  const history = useHistory();
  const scrollRef = useRef<HTMLDivElement>(null);

  const accessToken = window.localStorage.getItem("accessToken");
  console.log(`accessToken:${accessToken}`);

  useEffect(() => {
    if (!accessToken) {
      alert("로그인이 필요합니다. 로그인페이지로 이동합니다.");
      history.push("/loginPage"); // 간이로 막아둠. 수정 필요 😀
    }
  }, []);

  const hoverMessage = [
    `AI로 나만의\n 캐릭터 만들기`,
    "나만의 캐릭터로\nTRPG하러가기",
  ];

  const scroll = (targetRef: any) => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <MiddleBox
        onClick={() => {
          scroll(scrollRef);
        }}
      >
        <AnimatedArrow />
      </MiddleBox>
      <MainWrapper>
        <LeftComponent to="/aiImage">
          <div>{hoverMessage[0]}</div>
        </LeftComponent>
        <RightComponent to="/room">
          <div>{hoverMessage[1]}</div>
        </RightComponent>
      </MainWrapper>

      <Gallery ref={scrollRef} />
    </>
  );
};

export default Main;
