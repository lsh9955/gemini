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
import { BASE_URL } from "../config";
import CreateRoomModal from "./CreateRoomModal";

const RoomList = ({ chatSocket }: { chatSocket: Socket }) => {
  const [rooms, setRooms] = useState<string[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  useEffect(() => {
    const res = async () => {
      const getRoomInfo = await axios.get(`${BASE_URL}/room`);
      setRooms(
        getRoomInfo.data.room.map((v: any, i: any) => {
          return JSON.stringify(v);
        })
      );
    };
    res();
  }, []);
  useEffect(() => {
    chatSocket?.on("allroomchange", (data: any) => {
      console.log("방 목록 정보 바뀜");
      const res = async () => {
        const getRoomInfo = await axios.get(`${BASE_URL}/room`);
        setRooms(
          getRoomInfo.data.room.map((v: any, i: any) => {
            return JSON.stringify(v);
          })
        );
      };
      res();
    });

    return () => {
      chatSocket?.off("allroomchange");
    };
  }, []);
  const closeModal = () => {
    setModal(false);
  };

  //비밀번호가 필요한 경우 추가할 것

  return (
    <RoomListWrap>
      <h1>TRPG</h1>
      <button
        onClick={() => {
          setModal(!modal);
        }}
      >
        방 생성하기
      </button>
      <CreateRoomModal modal={modal} closeModal={closeModal} />
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
