import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { io, Socket } from "socket.io-client";

interface ClienttoServerEvents {
  newRoom: (data: any) => void;
  removeRoom: (data: any) => void;
  allroomInfo: (data: any) => void;
}

const RoomList = () => {
  const [rooms, setRooms] = useState<string[]>([]);
  useEffect(() => {
    const res = async () => {
      const getRoomInfo = await axios.get("http://localhost:5000/room");
      console.log(getRoomInfo);
      setRooms(
        getRoomInfo.data.room.map((v: any, i: any) => {
          return JSON.stringify(v);
        })
      );
    };
    res();
  }, []);
  useEffect(() => {
    const socket: Socket<ClienttoServerEvents> = io(
      "http://localhost:5000/room",
      {
        transports: ["websocket"],
      }
    );
    socket?.on("newRoom", function (data: any) {
      // 새 방 이벤트 시 새 방 생성
      console.log("새 방 생성");
      setRooms([...rooms, JSON.stringify(data)]);
    });

    socket?.on("removeRoom", function (data: any) {
      // 방 제거 이벤트 시 id가 일치하는 방 제거
      console.log("방 제거");
      console.log(data);
      setRooms(rooms.slice().splice(rooms.indexOf(JSON.stringify(data)), 1));
    });
    socket?.on("allroomInfo", function (data: any) {
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  //비밀번호가 필요한 경우 추가할 것

  return (
    <>
      <h1>TRPG</h1>
      <div>
        {rooms.map((v: any, i) => {
          return (
            <Link to={`/room/${JSON.parse(v)["_id"]}`} key={i}>
              {v}
              <img src={JSON.parse(v).defaultpicture} alt="방 기본사진" />
            </Link>
          );
        })}
      </div>
      <fieldset>
        <legend>채팅방 목록</legend>
        <table>
          <thead>
            <tr>
              <th>방 제목</th>
              <th>종류</th>
              <th>허용 인원</th>
              <th>방장</th>
            </tr>
          </thead>
        </table>

        <a href="/test">채팅방 생성</a>
      </fieldset>
    </>
  );
};

export default RoomList;
