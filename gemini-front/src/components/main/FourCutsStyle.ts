import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* grid-template-rows: repeat(2, 2fr 3fr); */
  gap: 1rem;
  width: 44vw;
  height: 66vh;
`;

export const Image = styled.div<{ image: string }>`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  aspect-ratio: 2 / 3;
`;
