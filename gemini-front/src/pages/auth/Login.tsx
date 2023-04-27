import React, { FC } from "react";
// import LoginInput from '../../Components/Auth/LoginInput';
// import GoBackPage from '../../Components/Menu/goBackPage';
// import { Head, BannerLine, Title } from '../../styles/Menu/NavStyle';

const Login: FC = () => {
  return (
    <>
      <a href="http://localhost:8080/oauth2/authorization/google">
        구글로그인 테스트
      </a>
      <br />
      <a href="http://localhost:8080/login/oauth2/code/twitter">
        트위터 로그인 테스트
      </a>
      <br />
      <a href="http://localhost:8080/oauth2/authorization/twitter">
        트위터 로그인 테스트2
      </a>
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
