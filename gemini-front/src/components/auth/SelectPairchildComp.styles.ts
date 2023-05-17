import styled, { css } from "styled-components";

const selectPairChildWrapperHeight = "75%";

export const SelectPairchildWrapper = styled.div`
  position: absolute;
  //   padding-top: 10.5%;
  padding-top: 5.25vh;
  padding-bottom: 16px;
  padding-left: 11.3vw;
  padding-right: 11.3vw;
  width: 60vw;
  height: 77%;
  background-color: rgba(217, 217, 217, 0.3);
  display: flex;
  flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  border-radius: 32px;
`;

export const NicknameLabel = styled.label`
  display: block;
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: bold;
  // margin-bottom: 8px;
  // margin-right: 100px;
  white-space: nowrap;
  margin-right: 16px;
`;

export const FormLabel = styled.label`
  display: block;
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: bold;
  //   margin-bottom: 8px;
  white-space: nowrap;
  margin-right: 16px;
`;

export const TextInput = styled.input`
  display: block;
  // width: 82.5%;
  width: 100%;
  margin-left: 1.3rem;
  //   padding: 8px;
  margin-bottom: 16px;
  color: white;
  border: none;
  border-bottom: 2px solid white;
  background-color: transparent;
  font-size: 0.9rem;
  font-weight: bold;
  &::placeholder {
    color: white;
    opacity: 0.5;
    font-size: 0.7rem;
  }

  &:focus {
    outline: none;
    border-bottom: 3px solid white;
  }
`;

export const TextArea = styled.textarea`
  display: block;
  width: 100%;
  padding: 8px;
  //   height: calc(${selectPairChildWrapperHeight} * 0.9); // 0.75에 0.9를 그냥 곱해버리네;
  height: 155px;
  border-radius: 10px;
  margin-bottom: 16px;
  color: white;
  border: 2px solid white;
  background-color: transparent;
  font-weight: bold;
  // font-size: 8px;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-bottom: 3px solid white;
  }
`;

export const CharacterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  // margin-bottom: 16px;
  margin-top: 5%;
  margin-bottom: 1.5%;
  // padding-left: 10%;
  margin-left: 10%;
  width: 100%;
`;

export const PairchildName = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  // margin-bottom: 16px;
  margin-top: 5%;
  margin-bottom: 1.5%;
  color: white;
  white-space: pre-wrap;
`;

export const PairchildNameContainer = styled.div`
  position: absolute;
  top: 60%;
  left: 40%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 5%;
  margin-bottom: 1.5%;
`;

// 원형으로 보여주기
export const CharacterImage = styled.img<{ isSelected: boolean }>`
  width: 20vh;
  height: 20vh;
  border-radius: 50%;
  transition: transform 0.3s;
  cursor: pointer;

  ${(props) =>
    props.isSelected &&
    css`
      transform: scale(1.2);
      border: 2px solid white;
    `}

  &:hover {
    transform: scale(1.2);
    border: 2px solid white;
  }
`;

// 문제있는 2번 방법
// export const CharacterImage = styled.img<{ isSelected: boolean }>`
//   width: 120px;
//   height: 120px;
//   border-radius: 50%;
//   transition: transform 0.3s;
//   cursor: pointer;

//   ${(props) =>
//     props.isSelected &&
//     css`
//       transform: scale(1.2);
//       border: 2px solid white;
//       mask-image: url(${props.src && props.src.replace(".png", "-mask.png")});
//     `}

//   &:hover {
//     transform: scale(1.2);
//     border: 2px solid white;
//     mask-image: url(${(props) =>
//       props.src && props.src.replace(".png", "-mask.png")});
//   }
// `;

// 마지막시도. 안되면 원형으로 넘어감.
// export const CharacterImage = styled.div<{
//   isSelected: boolean;
//   backgroundImage: string;
// }>`
//   width: 120px;
//   height: 120px;
//   background-image: url(${(props) => props.backgroundImage});
//   background-position: center;
//   background-size: cover;
//   border-radius: 50%;
//   transition: transform 0.3s;
//   cursor: pointer;
//   position: relative;

//   ${(props) =>
//     props.isSelected &&
//     css`
//       transform: scale(1.2);
//       border: 2px solid white;
//     `}
// `;
// // 마지막시도. 안되면 원형으로 넘어감.
// export const Overlay = styled.div<{
//   isSelected: boolean;
//   backgroundImage: string;
// }>`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-image: url(${(props) => props.backgroundImage});
//   background-position: center;
//   background-size: cover;
//   background-repeat: no-repeat;
//   opacity: 0;
//   transition: opacity 0.3s;

//   ${(props) =>
//     props.isSelected &&
//     css`
//       opacity: 0.5;
//     `}
// `;

export const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 1.5vh;
  //   width: 75%;
  flex-direction: row;
  justify-content: space-between;
  /* 추가적인 스타일 속성들 */
`;

export const SubmitButton = styled.div`
  // width:
  // height:
  margin-bottom: 8px;
  margin-top: 3%;
  align-self: center;
  color: white;
  font-weight: bold;
  border: 2px solid white;
  border-radius: 10px;
  padding: 3% 10% 3% 10%;

  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.4);
    transform: scale(0.95);
  }
`;
