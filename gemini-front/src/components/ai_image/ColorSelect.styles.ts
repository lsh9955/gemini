import styled from "styled-components";

export const ColorWrapper = styled.div`
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
  & p {
    display: none;
  }
  :hover {
    cursor: pointer;
    & p {
      top: 45%;
      left: 30%;

      display: inline-block;
      position: absolute;
      z-index: 90;
    }
    & img {
      cursor: pointer;
      filter: brightness(50%);
    }
  }
`;

//선택된 헤어 컬러 컴포넌트 스타일
export const ClickedColorContainer = styled.div`
  position: relative;
  width: 17%;
  height: auto;
  margin: 1%;
  border: 1px solid;
  border-radius: 20px;
  cursor: pointer;
  & > p {
    top: 45%;
    left: 30%;
    display: inline-block;
    position: absolute;
    z-index: 90;
  }
  & > img {
    cursor: pointer;
    filter: brightness(50%);
  }
`;

export const ColorImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

export const ColorText = styled.p`
  font-size: 15px;
  color: white;

  /* padding: 4px; */
`;
