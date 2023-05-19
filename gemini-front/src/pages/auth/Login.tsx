import React, { FC } from "react";
import {
  LoginButtonWrapper,
  LoginSubTitle,
  LoginTitle,
  LoginTitleWrapper,
  LoginWrapper,
  StyledLink,
} from "./Login.styles";
import axios from "axios";
import TwitterLoginButtonImg from "../../assets/img/TwitterLoginButton.png";
import GoogleLoginButtonImg from "../../assets/img/GoogleLoginButton.png";
// import LoginInput from '../../Components/Auth/LoginInput';
// import GoBackPage from '../../Components/Menu/goBackPage';
// import { Head, BannerLine, Title } from '../../styles/Menu/NavStyle';

const Login: FC = () => {
  const testHandler = () => {
    const res = axios.get("https://mygemini.co.kr/user-service/profile/login");
    console.log("테스트용 만들었음.");
    console.log(res);
  };

  return (
    <>
      <LoginWrapper>
        <LoginTitleWrapper>
          <LoginTitle></LoginTitle>
          <LoginSubTitle>또 다른 나와 만나는 시간</LoginSubTitle>
        </LoginTitleWrapper>
        <LoginButtonWrapper>
          <StyledLink
            backgroundImage={GoogleLoginButtonImg}
            // href={"http://localhost:8080/oauth2/authorization/google"}
            href={process.env.REACT_APP_GOOGLE_AUTH_URL}
          >
            {/* 구글로그인 테스트2 */}
          </StyledLink>

          {/* <StyledLink */}
          {/* backgroundImage={TwitterLoginButtonImg} */}
          {/* // href="https://mygemini.co.kr/oauth2/authorization/twitter" */}
          {/* href={process.env.REACT_APP_TWITTER_AUTH_URL} */}
          {/* > */}
          {/* 트위터 로그인 테스트2 */}
          {/* </StyledLink> */}
        </LoginButtonWrapper>

        {/* <div onClick={testHandler}>이거 클릭하면 user_service로 뭘 보냄.</div> */}
      </LoginWrapper>
      {/* Uncomment your JSX code when you want to use it */}
      {/* <Head>
        <div className="grid grid-cols-16 gap-1">
          <div className="col-start-2 col-span-2">
            <GoBackPage></GoBackPage>
          </div>
          <div className="col-start-4 col-end-8">
            <Title>로그인</Title>
          </div>
        </div>
      </Head>
      <BannerLine />
      <LoginInput></LoginInput> */}
    </>
  );
};

export default Login;
