import styled from "styled-components";

export const MusicWrap = styled.div<{ playerStyle: boolean }>`
  background: rgba(0, 0, 0, 0.45);

  width: 30%;
  height: 50%;
  position: absolute;
  left: 20%;
  top: 15%;
  display: ${(props) => (props.playerStyle ? "none" : "flex")};
  border-radius: 4px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const MusicTitle = styled.div`
  font-size: 120%;
  color: white;
  margin-bottom: 4%;
`;
export const MusicInput = styled.input`
  width: 80%;
  height: 8%;
  margin-bottom: 4%;
`;
export const SizeButton = styled.button`
  width: 50%;
  height: 8%;
  margin-top: 4%;
  color: white;
  font-size: 120%;
  border-radius: 4px;
  background-color: #000000;
`;
