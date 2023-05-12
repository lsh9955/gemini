import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import {
  ListWrap,
  RoomConcept,
  RoomListWrap,
  RoomTitle,
  RoomUserNum,
  RoomWrap,
  TitleWrap,
} from "./RoomListStyle";
import { BASE_URL } from "../config";
import CreateRoomModal from "./CreateRoomModal";

const RoomList = ({ chatSocket }: { chatSocket: Socket }) => {
  const [rooms, setRooms] = useState<string[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  useEffect(() => {
    const res = async () => {
      const getRoomInfo = await axios.get(`${BASE_URL}/node/room`);
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
        const getRoomInfo = await axios.get(`${BASE_URL}/node/room`);
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
  }, [chatSocket]);
  const closeModal = () => {
    setModal(false);
  };

  //비밀번호가 필요한 경우 추가할 것

  return (
    <RoomListWrap>
      <TitleWrap>
        <div>TRPG</div>
        <button
          onClick={() => {
            setModal(!modal);
          }}
        >
          생성하기
        </button>
      </TitleWrap>
      <CreateRoomModal modal={modal} closeModal={closeModal} />
      <ListWrap>
        {rooms.map((v: any, i) => {
          return (
            <Link
              to={`/room/${JSON.parse(v)["_id"]}`}
              key={i}
              style={{ textDecoration: "none" }}
            >
              <RoomWrap roombgimg={JSON.parse(v).defaultpicture}>
                <RoomTitle>{JSON.parse(v).title}</RoomTitle>
                <RoomConcept>{JSON.parse(v).concept}</RoomConcept>
                <RoomUserNum>{JSON.parse(v).usernum}/8</RoomUserNum>
              </RoomWrap>
            </Link>
          );
        })}
      </ListWrap>
    </RoomListWrap>
  );
};

export default RoomList;
