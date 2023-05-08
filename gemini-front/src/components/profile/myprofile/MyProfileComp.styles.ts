import styled from "styled-components";
import MyProfileBg from "../../../assets/img/MyProfileBg.png";

export const MyProfileWrapper = styled.div`
  height: 91vh;
  background-image: url(${MyProfileBg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center bottom; // 아래가 우선으로 보이고 위에가 짤리게.
  padding-top: 5.5vh;
  padding-left: 8vw;
  padding-right: 8vw;
`;
