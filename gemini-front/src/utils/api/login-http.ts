//
import axios, { AxiosResponse } from "axios";

export interface UserInfoDto {
  userPk: number;
  description: string;
  nickname: string;
  profileBackground: string;
  star: number;
  username: string;
  profileImgUrl: string;
}

export const getUserProfile = async (
  accessToken: string
): Promise<UserInfoDto> => {
  const url = `${process.env.REACT_APP_API_USER_BASE_URL}/user-service/profile/login`;
  const response: AxiosResponse<UserInfoDto> = await axios.get(url, {
    // headers: {
    //   Authorization: `Bearer ${accessToken}`,
    // }, // 배포때 이걸로 다시 바꿔야함. 😀
    headers: {
      username: "google_12346",
    },
    withCredentials: true,
  });

  return response.data;
};

interface AccessTokenResponse {
  accessToken: string;
}

export const RequestAccessTokenWithRefreshToken =
  async (): Promise<AccessTokenResponse> => {
    const url = `${process.env.REACT_APP_API_AUTH_BASE_URL}/auth/reissue`;
    console.log(url);
    console.log("RequestAccessTokenWithRefreshToken시작");
    console.log(process.env.REACT_APP_API_AUTH_BASE_URL);
    const response: AxiosResponse<AccessTokenResponse> = await axios.post(
      url,
      null,
      {
        withCredentials: true,
      } // 이거 배포때 수정해야되나?
    );
    console.log("RequestAccessTokenWithRefreshToken응답받았나?");
    console.log(response);

    return response.data;
  };
