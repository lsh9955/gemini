import styled from "styled-components";

export const CostumeBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
`;

export const CostumeContainer = styled.div`
  position: relative;
  width: 30%;
  height: auto;
  margin: 1.5%;
  border: 1px solid;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export const CostumeImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
    filter: brightness(50%);
  }
`;
