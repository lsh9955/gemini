import React, { useEffect, useState } from "react";
import axios from "axios";
import io, { Socket } from "socket.io-client";
import ChatPage from "../chat/Chat";
import GetPicture from "../playAsset/GetPicture";

const GameRoom = ({ chatSocket }: { chatSocket: Socket }) => {
  const userN = localStorage.getItem("userInfo");
  console.log(userN);
  const [userList, setUserList] = useState<Array<string>>([]);
  const [chatList, setChatList] = useState<string[]>([]);

  useEffect(() => {
    // 현재는 유저정보를 랜덤으로 하고 있지만, 추후 생성시 json형태로 emit에 넣을것
    chatSocket.emit("join", {
      user: String(userN),
      roomId: new URL(window.location.href).pathname.split("/").at(-1) ?? "",
    });
    chatSocket.on("join", function (data: any) {
      setUserList([...userList, data.user]);
    });

    chatSocket.on("chat", function (data: any) {
      setChatList([...chatList, data]);
    });

    chatSocket.on("allroomchange", (data: any) => {
      console.log("방 목록 정보 바뀜");
      const res = async () => {
        const getRoomInfo = await axios.get("http://localhost:5000/room");
        const nowURL = new URL(window.location.href).pathname.split("/").at(-1);

        setUserList(
          getRoomInfo.data.room
            .filter((v: any) => v._id === nowURL)[0].userarr


        );
      };
      res();
    });

    return () => {
      chatSocket.off("join");
      chatSocket.off("chat");
      chatSocket.off("roomupdate");
      chatSocket.off("allroomchange");
    };
  }, [chatSocket]);

  return (
    <>
      <GetPicture />
      <ChatPage chatSocket={chatSocket} userList={userList} />
      <a href="/room" id="exit-btn">
        방 나가기
      </a>
      <div>유저리스트</div>
      <div>
        {userList.map((v, i) => {
          return <div key={i}>{v}</div>;
        })}
      </div>

    </>
  );
};

export default GameRoom;
