// import LoginInput from '../../Components/Auth/LoginInput';
// import GoBackPage from '../../Components/Menu/goBackPage';
// import { Head, BannerLine, Title } from '../../styles/Menu/NavStyle';
import React, { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Main: FC = () => {
  const history = useHistory();
  const accessToken = window.localStorage.getItem("accessToken");
  console.log(`accessToken:${accessToken}`);

  useEffect(() => {
    if (!accessToken) {
      alert("로그인이 필요합니다. 로그인페이지로 이동합니다.");
      history.push("/login");
    }
  }, []);

  return (
    <>
      메인페이지야!! 로그인이 안되어있으면 로그인페이지로 넘길것임.
      {/* Uncomment your JSX code when you want to use it */}
    </>
  );
};

export default Main;
{
  /* <Head>
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
<LoginInput></LoginInput> */
}
