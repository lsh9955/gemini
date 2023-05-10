import styled from "styled-components";
import { Link } from "react-router-dom";
import MainPageImage from "../../assets/img/MainPageImage.png";
import GamePageImage from "../../assets/img/GamePageImage.png";
import MiddleImage from "../../assets/img/MiddleImage.png";

export const MainWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 91vh;
  display: flex;
  overflow: hidden;
`;

export const LeftComponent = styled(Link)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;

  // 배경 이미지 삽입
  background: url(${MainPageImage}) no-repeat center center fixed;
  background-size: cover;
  clip-path: polygon(0% 0%, 79.17% 0%, 20.83% 100%, 0% 100%);

  /* text-align: center;
  line-height: 100vh;
  text-decoration: none;
  color: #fff; */

  // opacity 속성에 대한 애니메이션 추가
  opacity: 1;
  transition: opacity 0.3s ease-in-out, background 0.3s ease-in-out;
  & div {
    display: none;
    position: absolute;
    white-space: pre-line;
  }
  &:hover {
    // 마우스 호버링 시 투명도와 배경 변경
    /* opacity: 0.5;
    background: rgba(17, 17, 17, 1) url(${MainPageImage}) no-repeat center
      center fixed;
    background-size: cover; */

    & div {
      display: flex;

      padding: 15% 15%;
      position: absolute;
      font-size: 250%;
      white-space: pre-line;
      color: white;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.7);
      border: 1px solid #000000;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
  }
`;

export const RightComponent = styled(Link)`
  position: absolute;
  right: 0;
  top: 0;
  width: 100%; // 수정
  height: 100%;

  // 배경 이미지 삽입
  background: url(${GamePageImage}) no-repeat center center fixed;
  background-size: cover;
  clip-path: polygon(79.17% 0%, 100% 0%, 100% 100%, 20.83% 100%);

  /* text-align: center;
  line-height: 100vh;
  text-decoration: none;
  color: #fff; */

  // opacity 속성에 대한 애니메이션 추가
  opacity: 1;
  transition: opacity 0.3s ease-in-out, background 0.3s ease-in-out;

  /* &:hover {
    // 마우스 호버링 시 투명도와 배경 변경
    opacity: 0.5;
    background: rgba(17, 17, 17, 0.5) url(${GamePageImage}) no-repeat center
      center fixed;
    background-size: cover;
  } */
  & div {
    display: none;
    position: absolute;
    white-space: pre-line;
  }
  &:hover {
    & div {
      display: flex;
      padding: 22% 15% 0 0;
      justify-content: right;
      position: absolute;
      font-size: 250%;
      white-space: pre-line;
      color: white;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.7);
      border: 1px solid #000000;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
  }
`;

// 중간에 그라데이션 이미지 컴포넌트
export const MiddleBox = styled.div`
  width: 100%;
  height: 30vh;
  z-index: 9999;

  position: absolute;
  bottom: 0;
  cursor: pointer;
  :hover {
    background: linear-gradient(
      0deg,
      rgba(5, 19, 32, 0.98) 0%,
      rgba(217, 217, 217, 0) 100%
    );
  }

  /* background-image: url(${MiddleImage}); */
`;
