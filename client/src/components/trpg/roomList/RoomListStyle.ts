import styled from "styled-components";
const roomlistimg = require("../../assets/img/roomlistimg.jpg")

export const RoomListWrap = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  & h1{
    color: transparent;
    background: url(${roomlistimg}) no-repeat center;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

`;
interface roombgimgProps {
  roombgimg: string;
}
export const RoomWrap = styled.div<roombgimgProps>`
  width:45vw;
  height:20vh;
  padding-top:10vh;
  padding-left:1vw;
  border-radius: 4px;
  background:linear-gradient(90deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%), url(${props=>props.roombgimg}) no-repeat;
`
export const RoomTitle= styled.div`
  width:100%;
  height:5vh;
  color:white;
  font-size:250%;
  margin-bottom:3vh;
`
export const RoomUserNum= styled.div`
  width:100%;
  height:5vh;
  color:white;
  font-size:150%;
`
