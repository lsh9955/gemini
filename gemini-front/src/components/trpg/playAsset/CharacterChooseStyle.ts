import styled from "styled-components";

export const DiceWrap = styled.div<{ playerStyle: boolean }>`
  background: rgba(0, 0, 0, 0.45);

  width: 50%;
  height: 50%;
  position: absolute;
  left: 10%;
  top: 15%;
  padding: 2% 0;
  display: ${(props) => (props.playerStyle ? "none" : "flex")};
  border-radius: 4px;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;
export const PlayImgWrap = styled.div`
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
`;
export const DiceTitle = styled.div`
  font-size: 120%;
  color: white;
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

  color: white;
  font-size: 120%;
  border-radius: 4px;
  background-color: transparent;
  border: 1px solid white;
  cursor: pointer;
`;
