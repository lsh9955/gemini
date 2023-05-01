import styled from "styled-components";
import LoginSuccessBg from "../../assets/img/LoginSuccessBg.png";

export const LoginSuccessWrapper = styled.div`
  position: relative;
  background-image: url(${LoginSuccessBg});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  //   &::after {
  //     content: "";
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     right: 0;
  //     bottom: 0;
  //     background-color: rgba(0, 0, 0, 0.3);
  //     z-index: 1;
  //   }

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

export const StyledLink = styled.a`
  z-index: 2;
  position: relative;
`;

export const CenteredDiv = styled.div`
  position: absolute;
  width: 50%;
  height: 75%;
  background-color: rgba(217, 217, 217, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  p {
    color: #ffffff;
    font-size: 2.5rem;
  }
`;
