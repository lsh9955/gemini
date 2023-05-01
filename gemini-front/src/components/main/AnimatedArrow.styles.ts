import styled, { keyframes } from "styled-components";

const arrowDownAnimation = keyframes`
0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(17px);
  }

// 0% {
//     transform: translateY(0);
//   }
//   50% {
//     transform: translateY(10px);
//   }
//   100% {
//     transform: translateY(0);
//   }
`;

export const StyledArrowWrapper = styled.div`
  //   position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export const StyledAnimatedArrow = styled.div`
  opacity: 0.7;
  animation: ${arrowDownAnimation} 1.5s infinite ease-in-out;
  //   color: white;
  z-index: 2;

  &:hover {
    opacity: 1;
  }
`;
