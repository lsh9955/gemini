import styled from "styled-components";
import { Link } from "react-router-dom";

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
  width: 100%; // 수정
  height: 100%;
  background: #111111;
  clip-path: polygon(0% 0%, 79.17% 0%, 20.83% 100%, 0% 100%);

  text-align: center;
  line-height: 100vh;
  text-decoration: none;
  color: #fff;
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
