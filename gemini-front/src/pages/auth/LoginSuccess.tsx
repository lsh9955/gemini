import React, { FC, useEffect } from "react";
import axios from "axios";
import {
  CenteredDiv,
  ContentWrapper,
  LoginSuccessWrapper,
} from "./LoginSuccess.styles";
import {
  RequestAccessTokenWithRefreshToken,
  getUserProfile,
} from "../../utils/api/login-http";
// import { getUserProfile } from "../../utils/api/login-http";
import { useDispatch } from "react-redux";
import { loginAccount } from "../../store/UserSlice";
import { useHistory } from "react-router-dom";
import { UserInfoDto } from "../../utils/api/login-http";

const LoginSuccess: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const newUesrCheck = (userInfo: UserInfoDto) => {
    if (userInfo.profileImgUrl) {
      history.push("/");
    } else {
      history.push("/selectPairchild");
    }
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      console.log("엑세스토큰 가져올거임.");
      const accessTokenResponse = await RequestAccessTokenWithRefreshToken();
      console.log("엑세스토큰받았나?");
      console.log(accessTokenResponse);
      const accessToken = accessTokenResponse.accessToken;
      localStorage.setItem("accessToken", accessToken);

      console.log("유저프로필 받아올게");
      const userInfo = await getUserProfile(accessToken);
      console.log("유저프로필 받았나?");
      console.log(userInfo);

      dispatch(loginAccount(userInfo));
      newUesrCheck(userInfo);
    };

    fetchAccessToken();
  }, []);

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
