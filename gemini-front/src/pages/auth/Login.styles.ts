import styled from "styled-components";
import loginBg from "../../assets/img/LoginBg1.png";
import TwitterLoginButtonImg from "../../assets/img/TwitterLoginButton.png";
import GoogleLoginButtonImg from "../../assets/img/GoogleLoginButton.png";
import GeminiLoginTitle from "../../assets/img/GeminiLoginTitle.png";

export const LoginTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10vh;
  margin-bottom: 6%;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

export const LoginSubTitle = styled.div`
  color: white;
  // font-weight: extra-bold;
  // font-weight: ;
  font-size: 2rem;
`;

export const LoginTitle = styled.div`
  background-image: url(${GeminiLoginTitle});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 6.5vh;
  margin-bottom: 8%;
`;

export const LoginWrapper = styled.div`
  position: relative;
  background-image: url(${loginBg});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &::after {
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

interface StyledLinkProps {
  backgroundImage: string;
}

export const LoginButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5.3%;
`;

export const StyledLink = styled.a<StyledLinkProps>`
  z-index: 2;
  position: relative;
  display: inline-block;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  width: 250px; // 이미지의 원래 너비와 높이에 맞게 조정
  height: 50px; // 이미지의 원래 너비와 높이에 맞게 조정

  margin-bottom: 10%;
`;
