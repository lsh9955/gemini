import styled from "styled-components";

export const GenreSampleImageBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GenreSampleImage = styled.img`
  width: 85%;
  height: auto;
  padding: 1%;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
    filter: brightness(50%);
  }
`;

export const GenreSampleImageLock = styled.img`
  width: 85%;
  height: auto;
  padding: 1%;
  border-radius: 20px;
`;
