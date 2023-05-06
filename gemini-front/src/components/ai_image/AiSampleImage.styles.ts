import styled from "styled-components";

export const GenreSampleImageBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

export const GenreSampleImage = styled.img`
  width: 100%;
  height: 18vh;
  padding: 1%;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;
