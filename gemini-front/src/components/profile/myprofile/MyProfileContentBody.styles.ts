import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

export const StyledMyProfileContentBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 58.4vw;
`;

export const ImageWrapper = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 14.6vw;
  height: 19.467vw;
  margin-bottom: 1vw;
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
