import styled from "styled-components";
import MyProfileBg from "../../assets/img/MyProfileBg.png";
import MyBackgoundImgExample from "../../assets/img/MyBackgoundImgExample.png";

const myProfileWrapperHeight = "91vh";
const myInfoWrapperHeight = "43vh";
const myBgImgHeight = "26vh";
const myInfoSpaceHeight = `calc(${myInfoWrapperHeight} - ${myBgImgHeight})`;
const MyProfileImgDiameter = "12.5vw";
const myProfileImgVerticalSpace = `calc(${myBgImgHeight} - ${
  parseFloat(MyProfileImgDiameter) / 1
}px)`;

export const MyProfileWrapper = styled.div`
  height: ${myProfileWrapperHeight};
  background-image: url(${MyProfileBg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center bottom; // 아래가 우선으로 보이고 위에가 짤리게.
  padding-top: 5.5vh;
  padding-left: 8vw;
  padding-right: 8vw;
`;

export const MyInfoWrapper = styled.div`
  height: ${myInfoWrapperHeight};
  position: relative;

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
