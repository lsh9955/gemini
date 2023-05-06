import styled from "styled-components";
import MyProfileBg from "../../assets/img/MyProfileBg.png";
import MyBackgoundImgExample from "../../assets/img/MyBackgoundImgExample.png";

const myProfileWrapperHeight = "91vh";
const myInfoWrapperHeight = "43vh";
const myBgImgHeight = "26vh";
const myInfoSpaceHeight = `calc(${myInfoWrapperHeight} - ${myBgImgHeight})`;
const MyProfileImgDiameter = "12.5vw";
// const myProfileImgVerticalSpace = `calc(${myBgImgHeight} - ${
//   parseFloat(MyProfileImgDiameter) / 1
// }px)`;
const myProfileContentWrapperHeight = `calc(${myProfileWrapperHeight} - ${myInfoWrapperHeight} - 5.5vh)`;

export const MyProfileWrapper = styled.div`
  //   height: ${myProfileWrapperHeight};
  height: 1000vh; // 수정필요 😀
  background-image: url(${MyProfileBg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center bottom; // 아래가 우선으로 보이고 위에가 짤리게.
  padding-top: 5.5vh;
  padding-left: 8vw;
  padding-right: 8vw;
  background-attachment: fixed;
`;

export const MyInfoWrapper = styled.div`
  height: ${myInfoWrapperHeight};
  position: relative;
  //   margin-bottom: 0px;

  //   background-image: url(${MyProfileBg});
  //   background-repeat: no-repeat;
  //   background-size: cover;
  //   background-position: center bottom; // 아래가 우선으로 보이고 위에가 짤리게.
  //   padding-top: 5.5vh;
  //   padding-left: 8vw;
  //   padding-right: 8vw;
`;

export const MyBgImg = styled.div`
  height: ${myBgImgHeight};
  background-image: url(${MyBackgoundImgExample}); //axios받아서 받는걸로 수정예정.
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center; // 중앙 우선
`;

export const MyInfoSpace = styled.div`
  height: ${myInfoSpaceHeight};
  background-color: #ffffff90;
`;

// export const MyInfoContentWrapper = styled.div`
//   position: absolute;
//   top: ${myProfileImgVerticalSpace};
//   left: 5.2vw;
// `;

export const MyInfoContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: ${myBgImgHeight};
  left: 5.2vw;
`;

// export const MyProfileImg = styled.div`
//   height: ${MyProfileImgDiameter};
//   width: ${MyProfileImgDiameter};
//   border-radius: 50%;
//   background-color: #ffffff;
// `;
export const MyProfileImg = styled.div`
  height: ${MyProfileImgDiameter};
  width: ${MyProfileImgDiameter};
  margin-top: calc(-${MyProfileImgDiameter} / 2);
  border-radius: 50%;
  background-color: #ffffff;
`;

export const MyProfileTextWrapper = styled.div`
  height: ${myProfileContentWrapperHeight};
  display: flex;
  flex-direction: column;
  margin-left: 2.2vw;
  margin-top: calc(-${MyProfileImgDiameter} / 4);
  //   background-color: #ffffff;
  margin-right: 9.7vw;
`;

export const Nickname = styled.div`
  //   height: ${myProfileContentWrapperHeight};
  //   background-color: #ffffff;
  color: white;
  font-size: 2rem;
  //   margin-bottom: 2rem; // 뭐가 더 적절한지 수정필요😀
  margin-bottom: 3vh; // 간격 조정 필요할수도 있음.
`;

export const Desc = styled.div`
  //   height: ${myProfileContentWrapperHeight};
  //   background-color: #ffffff;
  font-size: 1.2rem;
  height: 9.2vh;
  width: 26vw;
  line-height: 1.5; // 원하는 줄 간격 비율로 조정하세요.
`;

export const EditButton = styled.div`
  //   height: ${myProfileContentWrapperHeight};
  //   background-color: #ffffff;
  //   color: white;
  //   border: 2px white solid;
  color: black;
  border: 1px black solid;
  border-radius: 5px;
  align-self: end;
  width: 9vw;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }

  &:active {
    background-color: #d0d0d0;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

export const FollowingAndPayWrappter = styled.div`
  //   background-color: #ffffff;
  margin-top: 1vh;
  display: flex;
  flex-direction: column;
  height: 14vh;
`;

export const FollowingTextWrapper = styled.div`
  //   background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 20.8vw;
`;

export const NumText = styled.div`
  //   background-color: #ffffff;
  text-align: center;
  font-size: 1.2rem;
  color: black;
  line-height: 1.5; // 원하는 줄 간격 비율로 조정하세요.
`;

export const MyProfileContentWrapper = styled.div`
  //   height: ${myProfileContentWrapperHeight};
  padding-left: 5.2vw;
  padding-right: 5.2vw;
  background-color: #eeeeee; // 수정 필요😀
`;

export const MyProfileContentBodyWrapper = styled.div`
  //   height: ${myProfileContentWrapperHeight};
  height: 39.2vh;
  background-color: #d9d9d9; // 수정 필요😀
`;

export const MyProfileContentTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const MyProfileContentTitle = styled.div`
  //   height: ${myProfileContentWrapperHeight};
  font-size: 1.6rem;
  background-color: #ffffff;
`;
