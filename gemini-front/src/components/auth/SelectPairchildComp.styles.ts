import styled, { css } from "styled-components";

export const SelectPairchildWrapper = styled.div`
  position: absolute;
  width: 50%;
  height: 75%;
  background-color: rgba(217, 217, 217, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
`;

export const TextInput = styled.input`
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
`;

export const TextArea = styled.textarea`
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
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
