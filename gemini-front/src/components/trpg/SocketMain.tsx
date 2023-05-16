import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import RoomList from "./roomList/RoomList";
import GameRoom from "./game/GameRoom";
import { io, Socket } from "socket.io-client";
const SocketMain = ({ match }: { match: any }) => {
  //socket 연결

  const [chatSocket, setChatSocket] = useState<any>(null);
  //개발시
  // useEffect(() => {
  //   const sockConnect = io("http://localhost:5000", {
  //     path: "/socket",
  //     transports: ["websocket", "polling"],
  //     secure: true,
  //   });
  //   setChatSocket(sockConnect);
  //   console.log("소켓 생성이 됩니까?");
  //   console.log(sockConnect);
  //   return () => {
  //     sockConnect.disconnect();
  //   };
  // }, []);

  //배포시
  useEffect(() => {
    const sockConnect = io("https://mygemini.co.kr", {
      path: "/socket",
      transports: ["websocket", "polling"],
      secure: true,
    });
    setChatSocket(sockConnect);
    console.log("소켓 생성이 됩니까?");
    console.log(sockConnect);
    return () => {
      sockConnect.disconnect();
    };
  }, []);

  return (
    <>
      <Route
        exact
        path={match.path}
        render={() => <RoomList chatSocket={chatSocket} />}
      />
      <Route
        path={`${match.path}/:id`}
        render={() => <GameRoom chatSocket={chatSocket} />}
      />
    </>
  );
};

export default SocketMain;
