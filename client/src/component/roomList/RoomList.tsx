import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import {
  RoomListWrap,
  RoomTitle,
  RoomUserNum,
  RoomWrap,
} from "./RoomListStyle";

const RoomList = ({ roomSocket }: { roomSocket: Socket }) => {
  const [rooms, setRooms] = useState<string[]>([]);
  useEffect(() => {
    const res = async () => {
      const getRoomInfo = await axios.get("http://localhost:5000/room");
      setRooms(
        getRoomInfo.data.room.map((v: any, i: any) => {
          return JSON.stringify(v);
        })
      );
    };
    res();
  }, []);
  useEffect(() => {
    roomSocket.on("newRoom", function (data: any) {
      // 새 방 이벤트 시 새 방 생성
      console.log("새 방 생성");
      setRooms([...rooms, JSON.stringify(data)]);
    });

    roomSocket.on("removeRoom", function (data: any) {
      // 방 제거 이벤트 시 id가 일치하는 방 제거
      console.log("방 제거");
      console.log(data);
      setRooms(rooms.slice().splice(rooms.indexOf(JSON.stringify(data)), 1));
    });
    roomSocket.on("allroomInfo", function (data: any) {
      console.log(data);
    });

    return () => {
      roomSocket.disconnect();
    };
  }, []);

  //비밀번호가 필요한 경우 추가할 것

  return (
    <RoomListWrap>
      <h1>TRPG</h1>
      <a href="/test">방 생성하기</a>
      <div>
        {rooms.map((v: any, i) => {
          return (
            <Link
              to={`/room/${JSON.parse(v)["_id"]}`}
              key={i}
              style={{ textDecoration: "none" }}
            >
              <RoomWrap roombgimg={JSON.parse(v).defaultpicture}>
                <RoomTitle>{JSON.parse(v).title}</RoomTitle>
                <RoomUserNum>{JSON.parse(v).usernum}/8</RoomUserNum>
              </RoomWrap>
            </Link>
          );
        })}
      </div>
    </RoomListWrap>
  );
};

export default RoomList;
