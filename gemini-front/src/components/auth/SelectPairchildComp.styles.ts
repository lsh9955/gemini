import styled, { css } from "styled-components";

const selectPairChildWrapperHeight = "75%";

export const SelectPairchildWrapper = styled.div`
  position: absolute;
  padding-top: 10.5%;
  padding-bottom: 16px;
  padding-left: 11.3%;
  padding-right: 11.3%;
  width: 50%;
  height: ${selectPairChildWrapperHeight};
  background-color: rgba(217, 217, 217, 0.3);
  display: flex;
  flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  border-radius: 32px;
`;

export const FormLabel = styled.label`
  display: block;
  color: #ffffff;
  font-size: 1rem;
  //   margin-bottom: 8px;
  white-space: nowrap;
  margin-right: 16px;
`;

export const TextInput = styled.input`
  display: block;
  width: 74%;
  //   padding: 8px;
  margin-bottom: 16px;
  color: white;
  border: none;
  border-bottom: 2px solid white;
  background-color: transparent;
  //   font-size: 0.8rem;
  &::placeholder {
    color: white;
    opacity: 0.5;
    font-size: 0.5rem;
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
  height: 102px;
  border-radius: 10px;
  margin-bottom: 16px;
  color: white;
  border: 2px solid white;
  background-color: transparent;
  font-size: 8px;

  &:focus {
    outline: none;
    border-bottom: 3px solid white;
  }
`;

export const CharacterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
`;

export const CharacterImage = styled.img<{ isSelected: boolean }>`
  width: 100px;
  height: 100px;
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

export const InputWrapper = styled.div`
  display: flex;
  //   width: 75%;
  flex-direction: row;
  justify-content: space-between;
  /* 추가적인 스타일 속성들 */
`;
