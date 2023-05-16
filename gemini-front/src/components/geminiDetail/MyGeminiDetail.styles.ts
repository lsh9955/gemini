import styled from "styled-components";
import ShareLinkSvg from "../../assets/img/ShareLinkSvg.svg";

export const EditButtonWrapper = styled.div`
  margin-top: 2%;
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const EditButton = styled.div`
  border: 1px solid white;
  font-size: 0.9rem;
  border-radius: 10px;
  width: 45%;
  padding: 3% 10% 3% 10%;
  color: white;
  display: flex;
  justify-content: center;

  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.8);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;
//

// export const LinkImg = styled.div`
//   display: flex;
//   flex-direction: row-reverse;
//   margin-top: 5%;
//   width: 15%;
//   height: 30%;
//   background-image: url(${ShareLinkSvg});
//   background-repeat: no-repeat;
//   background-position: center;
//   background-size: contain;
// `;

export const LinkImg = styled.img.attrs({
  src: ShareLinkSvg,
})`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 5%;
  width: 15%;
  height: 30%;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

///////////////////////////////////////////////////////////

export const MyGeminiFlipContainerWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  display: flex;
  // flex
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const MyGeminFlipContainer = styled.div<{ isFlipped: boolean }>`
  position: absolute; // position 값을 absolute로 변경
  top: 50%;
  left: 50%;
  z-index: 1000;
  display: flex;

  flex-direction: row; /* 세로 방향으로 아이템 정렬을 위해 추가 */
  justify-content: center; /* 세로 방향으로 아이템을 가운데 정렬하기 위해 추가 */
  align-items: center; /* 가로 방향으로 아이템을 가운데 정렬하기 위해 추가 */

  background-color: #00000099;

  aspect-ratio: ${({ isFlipped }) => (isFlipped ? "3 / 2" : "3 / 2")};
  width: 50vw;
  /* max-height: 75vh; 세로 길이를 최대 높이로 제한 */

  perspective: 1000px;
  transform-style: preserve-3d;
  transform: ${({ isFlipped }) =>
    `translate(-50%, -50%) rotateY(${isFlipped ? 180 : 0}deg) rotateX(${
      isFlipped ? 180 : 0
    }deg)`};
  transition: transform 0.8s;
`;

export const MyLikeWrapper = styled.div`
  display: flex;
  // align-items: center;
  flex-direction: row;
  padding-bottom: 3%;
  // cursor: pointer;
`;
