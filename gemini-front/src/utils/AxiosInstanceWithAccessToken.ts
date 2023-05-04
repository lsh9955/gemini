import axios from "axios";
import Cookies from "universal-cookie";
// import Cookies from 'js-cookie';

const cookies = new Cookies();

const axiosInstanceWithAccessToken = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
});

axiosInstanceWithAccessToken.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
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
      if (refreshToken) {
        try {
          // 쿠키 값 이용해서 reissue 시작. header에 담아서 보내는거 수정이 필요함.
          const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}` + "/auth/reissue",
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          ); // 여기까지 쿠키값 이용해서 reissue

          if (response.status === 200) {
            localStorage.setItem("accessToken", response.data.accessToken);
            return axiosInstanceWithAccessToken(originalRequest);
          }
        } catch (reissueError: any) {
          // reissue 보낸거 오류 생겼을때. any인거 고쳐야함😀
          if (reissueError.response.status === 401) {
            alert("세션이 만료되었습니다. 재로그인이 필요합니다.");
            // 여기에 history.push 보내고 싶음. 내가 원하는거 -> history.push("/loginPage")
            return Promise.reject(reissueError); // 이게 나오면 alert 띄우고..
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstanceWithAccessToken;
