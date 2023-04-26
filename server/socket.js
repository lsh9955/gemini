const SocketIO = require("socket.io");
const { removeRoom } = require("./services");
const cors = require("cors");

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, {
    path: "/socket.io",
    cors: {
      origin: "http://localhost:3000",
    },
  });
  app.set("io", io);
  const room = io.of("/room");
  const chat = io.of("/chat");

  room.on("connection", (socket) => {
    console.log("room 네임스페이스에 접속");
    socket.on("disconnect", () => {
      console.log("room 네임스페이스 접속 해제");
    });
  });

  chat.on("connection", (socket) => {
    console.log("chat 네임스페이스에 접속");
    let roomInfo;
    socket.on("join", (data) => {
      socket.join(data.roomId);
      roomInfo = data;
      socket.to(data.roomId).emit("join", {
        user: data.user,
        roomInfo: chat.adapter.rooms.get(data.roomId),
        //현재 임시로 랜덤 컬러로 유저 이름을 지정함. 나중에 실제 유저 API 를 배포하여 연결할 예정
        chat: `${data.user}님이 입장하셨습니다.`,
      });
    });
    socket.on("userUpdate", (data) => {
      socket.to(data.roomId).emit("userUpdate", {
        userList: data.userList,
        roomId: data.roomId,
      });
    });

    socket.on("disconnect", async () => {
      console.log("chat 네임스페이스 접속 해제");
      roomId = roomInfo.roomId;
      const currentRoom = chat.adapter.rooms.get(roomId);
      const userCount = currentRoom?.size || 0;
      if (userCount === 0) {
        // 유저가 0명이면 방 삭제
        await removeRoom(roomId); // 컨트롤러 대신 서비스를 사용
        room.emit("removeRoom", roomId);
        console.log("방 제거 요청 성공");
      } else {
        socket.to(roomId).emit("exit", {
          user: `${roomInfo.user}`,
          chat: `${roomInfo.user}님이 퇴장하셨습니다.`,
        });
        메롱;
      }
    });
  });
};
