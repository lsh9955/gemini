import styled from "styled-components";

export const EmotionBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
`;

export const EmotionContainer = styled.div`
  position: relative;
  width: 31%;
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

export const PickedEmotionContainer = styled.div`
  position: relative;
  width: 31%;
  height: auto;
  margin: 1%;
  border: 1px solid;

  border-radius: 20px;
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
`;

export const EmotionImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
    filter: brightness(50%);
  }
`;

export const EmotionText = styled.p`
  font-size: 15px;
  color: white;
`;
