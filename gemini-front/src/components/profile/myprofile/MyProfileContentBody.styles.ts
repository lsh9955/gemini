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
  margin-right: 2.9vw;
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
