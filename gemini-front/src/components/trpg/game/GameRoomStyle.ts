import styled from "styled-components";
import defaultBgImg from "../../../assets/img/defaultBgImg.jpg";
export const RoomWrap = styled.div<{ bgimg: any }>`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 0px;
  left: 0px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-image: ${(props) =>
    props.bgimg ? `url(${props.bgimg})` : `url(${defaultBgImg})`};
  background-size: cover;
  background-repeat: no-repeat;
`;
export const GameScreen = styled.div`
  width: 70%;
  height: 100vh;
`;
export const ChatScreen = styled.div`
  width: 30%;
  height: 100vh;
`;
