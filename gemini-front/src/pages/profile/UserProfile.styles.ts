import styled from "styled-components";
import MyProfileBg from "../../assets/img/MyProfileBg.png";
import MyBackgoundImgExample from "../../assets/img/MyBackgoundImgExample.png";
import AriesDummyProfile from "../../assets/img/AriesDummyProfile.png";
import EditPenSvg from "../../assets/img/EditPen.svg";

interface MyProfileContentBodyWrapperProps {
  minHeight: string;
}

const myProfileWrapperHeight = "91vh";
const myInfoWrapperHeight = "43vh";
const myBgImgHeight = "26vh";
const myInfoSpaceHeight = `calc(${myInfoWrapperHeight} - ${myBgImgHeight})`;
const MyProfileImgDiameter = "12.5vw";
// const myProfileImgVerticalSpace = `calc(${myBgImgHeight} - ${
//   parseFloat(MyProfileImgDiameter) / 1
// }px)`;
const myProfileContentWrapperHeight = `calc(${myProfileWrapperHeight} - ${myInfoWrapperHeight} - 5.5vh)`;
const EditPenButtonOffset = "9.25vw";

// 3번 동적높이
// export const MyProfileWrapper = styled.div`
export const MyProfileWrapper = styled.div<MyProfileContentBodyWrapperProps>`
  min-height: ${({ minHeight }) => minHeight};
  //   height: ${myProfileWrapperHeight};
  //   min-height: ${myProfileWrapperHeight};

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
  background-color: #ffffff99;
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
//   background-image: url(${AriesDummyProfile}); //axios받아서 받는걸로 수정예정.
//   background-size: cover;
//   margin-top: calc(-${MyProfileImgDiameter} / 2);

//   border-radius: 50%;
//   background-color: #ffffff;
// `;
interface MyProfileImgProps {
  imgUrl: string;
}

export const MyProfileImg = styled.div<MyProfileImgProps>`
  height: ${MyProfileImgDiameter};
  width: ${MyProfileImgDiameter};
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
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
  font-size: 1.5rem;
  //   margin-bottom: 2rem; // 뭐가 더 적절한지 수정필요😀
  margin-bottom: 3vh; // 간격 조정 필요할수도 있음.
`;

export const Desc = styled.div`
  //   height: ${myProfileContentWrapperHeight};
  //   background-color: #ffffff;
  font-size: 1rem;
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
  font-size: 1rem;
  color: black;
  line-height: 1.5; // 원하는 줄 간격 비율로 조정하세요.
`;

// 2번 동적높이
export const MyProfileContentWrapper = styled.div<MyProfileContentBodyWrapperProps>`
  min-height: ${({ minHeight }) => minHeight};
  //   height: ${myProfileContentWrapperHeight};
  //   min-height: ${myProfileContentWrapperHeight}; // 수정필요
  padding-left: 5.2vw;
  padding-right: 5.2vw;
  background-color: #ffffff99; // 수정 필요😀
  z-index: 11;
`;

// export const MyProfileContentBodyWrapper = styled.div`
//   //   height: ${myProfileContentWrapperHeight};
//   min-height: 39.2vh;
//   background-color: #d9d9d9; // 수정 필요😀
// `;

// 1번 동적높이
export const MyProfileContentBodyWrapper = styled.div<MyProfileContentBodyWrapperProps>`
  min-height: ${({ minHeight }) => minHeight};
  //   background-color: #ffffff99; // 바꿀까? 😀
  z-index: 12;
`;

export const MyProfileContentTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  // justify-content: space-around;
  margin-bottom: 1.5vw; // 😀 타이틀이랑 간격 수정가능
`;

export const MyProfileContentTitle = styled.div<{ active: boolean }>`
  //   height: ${myProfileContentWrapperHeight};
  font-size: 1.3rem;
  //   background-color: #ffffff99;
  margin-right: 4vw;
  // margin-left: 2vw;
  cursor: pointer;
  z-index: 10;
  // color: #858585;
  // border-bottom: ${({ active }) => (active ? "2px solid black" : "none")};
  position: relative;

  :before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ active }) => (active ? "100%" : "0")};
    height: 2px;
    background-color: black;
    transition: width 0.3s ease-in-out;
  }
`;

// export const EditPenButton = styled.div`
//   height: 2vh;
//   width: 2vh;
//   background-image: url(${EditPenSvg}); //axios받아서 받는걸로 수정예정.
//   background-size: cover;
//   // margin-top: calc(-${MyProfileImgDiameter} / 2);

//   border-radius: 50%;
//   background-color: #ffffff;
// `;

export const EditPenButton = styled.div`
  position: relative;
  margin-left: ${EditPenButtonOffset};
  margin-top: ${EditPenButtonOffset};
  height: 5vh;
  width: 5vh;
  background-image: url(${EditPenSvg});
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #f4f4f4;
  border-radius: 50%;

  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }

  &:active {
    background-color: #d0d0d0;
  }

  // Make the clickable area larger than the visible part
  &::before {
    content: "";
    position: absolute;
    // top: -5px;
    // left: -5px;
    // right: -5px;
    // bottom: -5px;
    top: -3vh;
    left: -3vh;
    right: -3vh;
    bottom: -3vh;
  }
`;
