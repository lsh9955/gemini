import React, { FC } from "react";
import {
  CenteredDiv,
  ContentWrapper,
  LoginSuccessWrapper,
} from "./LoginSuccess.styles";

const LoginSuccess: FC = () => {
  return (
    <>
      <LoginSuccessWrapper>
        <CenteredDiv>
          <ContentWrapper>
            <p>Gemini로 확인되었습니다.</p>
            <p>메인페이지로 입장합니다.</p>
          </ContentWrapper>
        </CenteredDiv>
      </LoginSuccessWrapper>
    </>
  );
};

export default LoginSuccess;
