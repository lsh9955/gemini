import styled from "styled-components";

export const GetPictureWrap = styled.div<{ playerStyle: boolean }>`
  background: rgba(0, 0, 0, 0.45);

  width: 50%;
  height: 50%;
  position: absolute;
  left: 10%;
  top: 15%;
  padding-bottom: 2%;
  display: ${(props) => (props.playerStyle ? "none" : "flex")};
  border-radius: 4px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
export const GetPictureTitle = styled.div`
  font-size: 120%;
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
export const DiceStart = styled.button`
  width: 20%;
  height: 15%;

  color: white;
  font-size: 110%;
  border: 1px solid white;
  border-radius: 4px;
`;
export const SizeButton = styled.button`
  width: 20%;
  height: 15%;
  margin-top: 1%;
  color: white;
  font-size: 120%;
  border-radius: 4px;
  background-color: transparent;
  border: 1px solid white;
  cursor: pointer;
`;

export const BackImgWrap = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  & > img {
    width: 19%;
    margin: 1%;
    height: auto;
    cursor: pointer;
  }
`;
