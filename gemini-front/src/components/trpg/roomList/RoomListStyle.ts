import styled from "styled-components";
const roomlistimg = require("../../../assets/img/roomlistimg.jpg");

export const RoomListWrap = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const TitleWrap = styled.div`
  display: flex;
  width: 90%;
  height: 15vh;
  align-items: center;
  justify-content: space-between;
  & div {
    color: transparent;
    background: url(${roomlistimg}) no-repeat center;
    background-clip: text;
    font-size: 300%;
    font-weight: 900;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  & button {
    background-color: transparent;
    border: none;
    font-size: 150%;
    cursor: pointer;
  }
`;
interface roombgimgProps {
  roombgimg: string;
}

export const ListWrap = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const RoomWrap = styled.div<roombgimgProps>`
  width: 40vw;
  height: 20vh;
  padding-top: 10%;
  padding-left: 1vw;
  border-radius: 4px;
  margin: 2vw 2vh;
  background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    url(${(props) => props.roombgimg}) no-repeat;
  & p {
    display: none;
  }
  :hover {
    background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.9) 0%,
        rgba(0, 0, 0, 0.9) 100%
      ),
      url(${(props) => props.roombgimg}) no-repeat;
    & div {
      display: none;
    }
    & span {
      display: none;
    }
    & p {
      display: inline;
    }
  }
`;
export const RoomTitle = styled.div`
  width: 100%;
  height: 22%;
  color: white;
  font-size: 170%;
  margin-bottom: 3vh;
`;
export const RoomConcept = styled.p`
  width: 100%;
  height: 22%;
  color: white;
  font-size: 170%;
  margin-bottom: 3vh;
`;
export const RoomUserNum = styled.span`
  width: 100%;
  height: 15%;
  color: white;
  font-size: 120%;
`;
