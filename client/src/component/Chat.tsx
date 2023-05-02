import React, { useEffect, useState } from "react";
import axios from "axios";
import io, { Socket } from "socket.io-client";

type SocketIOClient = Socket<
  // 이벤트 목록 (client -> server)
  {
    join_room: (room_id: string) => void;
    leave_room: () => void;
    chat_message: (message: string) => void;
  },
  // 이벤트 목록 (server -> client)
  {
    user_joined: (user_id: string) => void;
    user_left: (user_id: string) => void;
    chat_message: (user_id: string, message: string) => void;
    join: (user: string, roomId: string) => void;
  }
>;

const Chat = (): JSX.Element => {
  const userN: string | undefined = localStorage.getItem("userInfo")?.[0];

  const [userList, setUserList] = useState<string[]>([]);
  const [chatList, setChatList] = useState<
    { user_id: string; message: string }[]
  >([]);
  const [firCome, setFirCome] = useState(true);
  const [socket, setSocket] = useState<SocketIOClient>(
    io("http://localhost:5000/chat", {
      transports: ["websocket"],
      path: "/custom/socket.io",
    })
  );

  useEffect(() => {
    // 현재는 유저정보를 랜덤으로 하고 있지만, 추후 생성시 json형태로 emit에 넣을것
    socket.emit("join", {
      user: String(userN),
      roomId: new URL(window.location.href).pathname.split("/").at(-1) ?? "",
    });
    socket.on("join", function (data: any) {
      setUserList([...userList, data.user]);
    });

    socket.on("exit", function (data: any) {
      setUserList(Object.values(data.user));
    });
    socket.on("chat", function (data: any) {
      setChatList([...chatList, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, chatList, userList, userN]);

  return (
    <>
      <a href="/" id="exit-btn">
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

export default Chat;
