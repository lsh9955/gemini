import styled from "styled-components";

export const ContainerWrapper = styled.div`
  transform: scaleX(-1);
  margin: 1.25rem;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  width: 44vw;
  height: 66vh;

  justify-items: center; /* 이미지를 가운데로 정렬합니다 */
`;

export const Image = styled.div<{ image: string }>`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  aspect-ratio: 2 / 3;
  transform: scaleY(-1);
  text-align: center;
  margin: 0;
`;

export const MyGeminiText = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  color: white; /* 원하는 색상으로 설정하세요 */
  font-size: 1.3rem; /* 원하는 글꼴 크기로 설정하세요 */
  margin-top: 1rem;
  transform: scaleY(-1);
`;
