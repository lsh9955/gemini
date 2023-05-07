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

export const GenreSampleImageLock = styled.img`
  width: 100%;
  height: 18vh;
  padding: 1%;
  border-radius: 20px;
`;

export const HairColorBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  margin-left: 2.5%;
`;

// 헤어 컬러 이미지와 텍스트를 함께 싸고 있는 컨테이너
export const ColorContainer = styled.div`
  position: relative;
  width: 17%;
  height: auto;
  margin: 1%;
  border: 1px solid;
  border-radius: 20px;
`;

export const ColorText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 25px;
  transform: translate(-50%, -50%);
  /* padding: 4px; */
`;

export const HairColorImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  transition: opacity 0.3s ease-in-out;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;
