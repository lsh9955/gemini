import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

export const StyledMyProfileContentBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  justify-content: flex-start; // 변경
  margin: 0 auto;
  padding-left: 2.6vw;
  // padding-right: 2.6vw;
  padding-top: 3.9vh;
  // max-width: 58.4vw;
  // max-width: 58.4vw;
`;

export const ImageWrapper = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 14.6vw;
  // width: 12.6vw;
  height: 19.467vw;
  margin-bottom: 2vw;
  margin-right: 2.8vw;
  transition: transform 0.3s ease; // 추가
  cursor: pointer; // 추가
  border-radius: 10px;

  &:hover {
    transform: scale(1.2); // 추가
  }
`;

export const EndMessage = styled.div`
  font-size: 1rem;
  margin-bottom: 3vh;
`;

export const StyledMyProfileTRPGContentBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  justify-content: flex-start; // 변경
  margin: 0 auto;
  padding-left: 2.6vw;
  // padding-right: 2.6vw;
  padding-top: 3.9vh;
  // max-width: 58.4vw;
  // max-width: 58.4vw;
`;

interface TRPGImageWrapperProps {
  background: string;
}

export const TRPGImageWrapper = styled.div<TRPGImageWrapperProps>`
  // 😀 비율 자유롭게 조정 가능함.
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 7px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  // background-color: transparent;
  // background-image: ${({ background }) => `url(${background})`};
  // 예지야 이거 가져가라.

  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url(${({ background }) => background});

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  // background-color: #00000066;
  // background-color: #ffffff; // 대신 배경 url이 들어가야함.😀
  // background-color: transparent; // 대신 배경 url이 들어가야함.😀

  padding: 1% 7% 1% 1%;

  // width: 14.6vw;
  // height: 19.467vw;
  width: 32vw;
  height: 26vw; // 세로크기 비율에 맞게 수정이 필요함 😀
  margin-bottom: 5vw;
  margin-right: 2.8vw;
  transition: transform 0.3s ease;
  cursor: pointer;
  // border-radius: 10px;

  &:hover {
    transform: scale(1.1);
  }
`;

export const TRPGImageItem = styled.div`
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`;

// export const StyledInfiniteScroll = styled(InfiniteScroll)`
//   /* 스크롤바 숨기기 */
//   &::-webkit-scrollbar {
//     display: none;
//   }
//   & {
//     scrollbar-width: none;
//   }
// `;

// export const InfiniteScrollWrapper = styled.div`
//   /* 스크롤바 숨기기 */
//   &::-webkit-scrollbar {
//     display: none;
//   }
//   & {
//     scrollbar-width: none;
//   }
// `;
