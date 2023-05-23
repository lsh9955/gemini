import styled from "styled-components";

export const GenderBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
`;

// 성별 이미지 컨테이너
export const GenderContainer = styled.div`
  position: relative;
  width: 46%;
  height: auto;
  margin: 2%;
  border: 1px solid;
  border-radius: 20px;
  & p {
    display: none;
  }
  :hover {
    cursor: pointer;
    & p {
      top: 45%;
      left: 35%;

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
export const PickedGenderContainer = styled.div`
  position: relative;
  width: 46%;
  height: auto;
  margin: 2%;
  border: 1px solid;
  border-radius: 20px;
  cursor: pointer;
  & p {
    top: 45%;
    left: 35%;

    display: inline-block;
    position: absolute;
    z-index: 90;
  }
  & img {
    cursor: pointer;
    filter: brightness(50%);
  }
`;

export const GenderImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
    filter: brightness(50%);
  }
`;

export const GenderText = styled.p`
  font-size: 30px;
  color: white;
`;
