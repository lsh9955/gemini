import styled from "styled-components";

export const CostumeBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
`;

export const CostumeContainer = styled.div`
  position: relative;
  width: 30%;
  height: auto;
  margin: 1.5%;
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
export const PickedCostumeContainer = styled.div`
  position: relative;
  width: 30%;
  height: auto;
  margin: 1.5%;
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

export const CostumeImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
    filter: brightness(50%);
  }
`;

export const CostumeText = styled.p`
  font-size: 15px;
  color: white;
`;
