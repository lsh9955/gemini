import { createBrowserHistory } from "history";
import axios, { AxiosError } from "axios";
import Cookies from "universal-cookie";
import { RequestAccessTokenWithRefreshToken } from "./api/login-http";
import { useHistory } from "react-router-dom";

// import Cookies from 'js-cookie';

const cookies = new Cookies();
const history = createBrowserHistory(); // history 객체 생성

const axiosInstanceWithAccessToken = axios.create({
  baseURL: `${process.env.REACT_APP_API_USER_BASE_URL}`, // 로컬테스트 끝나고 일반적인 포트 없는걸로 변경 😀
});

axiosInstanceWithAccessToken.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    // config.headers.X-username = "google_12346"; // 테스트용. 수정필요 😀
    //
  }
  return config;
});

axiosInstanceWithAccessToken.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      // 첫 요청이고, 401 -> accessToken에 문제가 있다.
      originalRequest._retry = true;

      const refreshToken = cookies.get("refreshToken"); //쿠키에서 refreshToken을 찾아봄.
      console.log("refreshToken 쿠키 확인", refreshToken); // 사실 쿠키는 자동이라서 필요 없음.

      try {
        const accessTokenResponse = await RequestAccessTokenWithRefreshToken();
        localStorage.setItem("accessToken", accessTokenResponse.accessToken);
        return axiosInstanceWithAccessToken(originalRequest);
      } catch (reissueError: any) {
        if (reissueError.response.status === 401) {
          // alert("세션이 만료되었습니다. 재로그인이 필요합니다.");
          history.push("/loginPage"); // 로그인 페이지로 이동

          return Promise.reject(reissueError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstanceWithAccessToken;
