import styled from "styled-components";
import defaultBgImg from "../../assets/img/defaultBgImg.jpg";
export const RoomWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-image: url(${defaultBgImg});
`;

export const GameScreen = styled.div`
  width: 70%;
  height: 100vh;
`;
export const ChatScreen = styled.div`
  width: 30%;
  height: 100vh;
`;
