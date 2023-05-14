import styled from "styled-components";

export const HairColorBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
`;

export const HairColorContainer = styled.div`
  position: relative;
  width: 23%;
  height: auto;
  margin: 1%;
  border: 1px solid;

  border-radius: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export const HairColorImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
    filter: brightness(50%);
  }
`;
