import React, { FC } from "react";
import { LoginWrapper, StyledLink } from "./Login.styles";
import axios from "axios";
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
        <StyledLink href="https://mygemini.co.kr/oauth2/authorization/google">
          구글로그인 테스트
        </StyledLink>
        <br />
        <StyledLink href="https://mygemini.co.kr/login/oauth2/code/twitter">
          트위터 로그인 테스트
        </StyledLink>
        <br />
        <StyledLink href="https://mygemini.co.kr/oauth2/authorization/twitter">
          트위터 로그인 테스트2
        </StyledLink>

        <div onClick={testHandler}>이거 클릭하면 user_service로 뭘 보냄.</div>
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
