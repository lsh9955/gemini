import React, { useEffect, useState } from "react";
import axios from "axios";
import io, { Socket } from "socket.io-client";

const Game = () => {
  const userN = localStorage.getItem("userInfo");
  console.log(userN);
  const [userList, setUserList] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [firCome, setFirCome] = useState(true);
  const [socket, setSocket] = useState(
    io("http://localhost:5000/chat", {
      transports: ["websocket"],
    })
  );

  useEffect(() => {
    // 현재는 유저정보를 랜덤으로 하고 있지만, 추후 생성시 json형태로 emit에 넣을것
    socket.emit("join", {
      user: String(userN),
      roomId: new URL(window.location.href).pathname.split("/").at(-1) ?? "",
    });
    socket.on("join", function (data) {
      setUserList([...userList, data.user]);
    });

    socket.on("chat", function (data) {
      setChatList([...chatList, data]);
    });
    socket.on("roomupdate", function (data) {
      console.log(data);
      setUserList(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <a href="/room" id="exit-btn">
        방 나가기
      </a>
      <div>유저리스트</div>
      <div>
        {userList.map((v, i) => {
          return <div key={i}>{v}</div>;
        })}
      </div>
      <div>채팅리스트</div>
      <div>
        {chatList.map((v, i) => {
          return (
            <div key={i}>
              {v.user_id}: {v.message}
            </div>
          );
        })}
      </div>
      <div>채팅 내용</div>
    </>
  );
};

export default Game;
