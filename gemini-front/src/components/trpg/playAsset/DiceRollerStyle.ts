import styled from "styled-components";

export const DiceWrap = styled.div<{ playerStyle: boolean }>`
  background: rgba(0, 0, 0, 0.45);

  width: 30%;
  height: 50%;
  position: absolute;
  left: 20%;
  top: 15%;
  padding: 5% 0;
  display: ${(props) => (props.playerStyle ? "none" : "flex")};
  border-radius: 4px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
  background-color: #000000;
`;
