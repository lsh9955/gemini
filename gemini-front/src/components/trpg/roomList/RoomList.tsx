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
import PasswordModal from "./PasswordModal";
import { useSelector } from "react-redux";

const RoomList = ({ chatSocket }: { chatSocket: Socket }) => {
  const [rooms, setRooms] = useState<string[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [pwModal, setPwModal] = useState<boolean>(false);
  const [targetPwRoom, setTargetPwRoom] = useState<any>(null);
  const userSeq = useSelector((state: any) => state.user);
  useEffect(() => {
    const res = async () => {
      const getRoomInfo = await axios.get(`https://mygemini.co.kr/node/room`);
      setRooms(
        getRoomInfo.data.room.map((v: any, i: any) => {
          return JSON.stringify(v);
        })
      );
    };
    res();
  }, []);
  //방 목록 정보 변경시
  useEffect(() => {
    chatSocket?.on("allroomchange", (data: any) => {
      console.log("방 목록 정보 바뀜");
      const res = async () => {
        const getRoomInfo = await axios.get(`https://mygemini.co.kr/node/room`);
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
  const openPwModal = (v: any) => {
    setPwModal(true);
    setTargetPwRoom(v);
  };
  const closePwModal = (v: any) => {
    setPwModal(false);
  };
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
      <PasswordModal
        pwModal={pwModal}
        targetPwRoom={targetPwRoom}
        closePwModal={closePwModal}
      />
      <CreateRoomModal modal={modal} closeModal={closeModal} />
      <ListWrap>
        {rooms.map((v: any, i) => {
          return JSON.parse(v).password ? (
            // 비밀번호 입력하는 모달창으로 이동
            <div
              onClick={() => {
                openPwModal(JSON.parse(v));
              }}
            >
              <RoomWrap roombgimg={JSON.parse(v).defaultpicture}>
                <RoomTitle>{JSON.parse(v).title}</RoomTitle>
                <RoomConcept>{JSON.parse(v).concept}</RoomConcept>
                <RoomUserNum>{JSON.parse(v).usernum}/8</RoomUserNum>
              </RoomWrap>
            </div>
          ) : (
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
