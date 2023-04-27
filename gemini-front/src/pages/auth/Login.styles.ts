import styled from "styled-components";
import loginBg from "../../assets/img/LoginBg1.png";

export const LoginWrapper = styled.div`
  position: relative;
  background-image: url(${loginBg});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }

  //   &::after {
  //     content: "";
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     right: 0;
  //     bottom: 0;
  //     background-color: rgba(217, 217, 217, 0.3);
  //     z-index: 2;
  //   }
`;
