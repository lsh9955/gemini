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
    opacity: 0.5;
  }
`;

export const GenreSampleImageLock = styled.img`
  width: 85%;
  height: auto;
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
  &:hover {
    .ColorText {
      display: block;
      cursor: pointer;
    }
  }
`;

export const ColorText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 25px;
  z-index: 2px;
  transform: translate(-50%, -50%);
  /* padding: 4px; */
  &:hover {
    cursor: pointer;
  }
`;

export const HairColorImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  transition: opacity 0.3s ease-in-out;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
    .ColorText {
      display: block;
      cursor: pointer;
    }
  }
`;

// 헤어스타일 최상단 박스
export const HairStyleBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
`;

// 헤어스타일 이미지 컨테이너(이미지와 텍스트 묶음)
export const HairContainer = styled.div`
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

export const HairStyleImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  transition: opacity 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

// 성별 이미지 컨테이너
export const GenderContainer = styled.div`
  position: relative;
  width: 46%;
  height: auto;
  margin: 2%;
  border: 1px solid;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
  }
`;

// 성별 이미지 컨테이너
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
