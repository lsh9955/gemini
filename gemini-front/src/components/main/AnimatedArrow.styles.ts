import styled, { keyframes } from "styled-components";

const arrowDownAnimation = keyframes`
0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(20px);
  }
`;

export const StyledArrowWrapper = styled.div`
  position: absolute;
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
  z-index: 2;

  &:hover {
    opacity: 1;
  }
`;
