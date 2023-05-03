import styled from "styled-components";
import { Link } from "react-router-dom";
import MainPageImage from "../../assets/img/MainPageImage.png";

export const MainWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
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

  text-align: center;
  line-height: 100vh;
  text-decoration: none;
  color: #fff;

  // opacity 속성에 대한 애니메이션 추가
  opacity: 1;
  transition: opacity 0.3s ease-in-out, background 0.3s ease-in-out;

  &:hover {
    // 마우스 호버링 시 투명도와 배경 변경
    opacity: 0.5;
    background: rgba(17, 17, 17, 0.5) url(${MainPageImage}) no-repeat center
      center fixed;
    background-size: cover;
  }
`;

export const RightComponent = styled(Link)`
  position: absolute;
  right: 0;
  top: 0;
  width: 100%; // 수정
  height: 100%;
  background: #d9d9d9;
  clip-path: polygon(79.17% 0%, 100% 0%, 100% 100%, 20.83% 100%);

  text-align: center;
  line-height: 100vh;
  text-decoration: none;
  color: #fff;
`;
