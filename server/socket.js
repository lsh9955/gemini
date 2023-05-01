const SocketIO = require("socket.io");
const { removeRoom } = require("./services");
const cors = require("cors");
const redis = require("redis");
const client = redis.createClient({
  password: `${process.env.REDIS_PASSWORD}`,
  socket: {
    host: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    port: 15197,
  },
});

module.exports = (server, app, sessionMiddleware) => {
  let roomsUsers = {};
  const io = SocketIO(server, {
    path: "/socket.io",
    cors: {
      origin: "http://localhost:3000",
    },
    transports: ["websocket"],
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
      console.log("채팅방에 입장 체크");

      console.log("새 방을 만듦");
      let newUserObj = {};
      client.hgetall(`roomToUser`, (err, obj) => {
        if (obj?.data?.roomId?.users) {
          newUserObj = JSON.parse(obj.users);

          newUserObj[socket.id] = data.user;
          //방 안의 유저 정보
          client.hmset(`roomToUser`, "users", JSON.stringify(newUserObj));
          //유저의 방 정보
          client.hmset(
            `userToRoom`,
            `${data.user}`,
            JSON.stringify(newUserObj)
          );
        } else {
          newUserObj[socket.id] = data.user;
          client.hmset(
            `room_${data.roomId}`,
            "users",
            JSON.stringify(newUserObj)
          );
        }
      });

      if (!roomsUsers[data.roomId]) {
        roomsUsers[data.roomId] = {};
      }
      roomsUsers[data.roomId][socket.id] = data.user;
      socket.join(data.roomId);
      roomInfo = data;
      socket.to(data.roomId).emit("join", {
        user: roomsUsers[data.roomId],
        roomInfo: chat.adapter.rooms.get(data.roomId),
        chat: `${data.user}님이 입장하셨습니다.`,
      });
    });
    socket.on("userUpdate", (data) => {
      socket.to(data.roomId).emit("userUpdate", {
        user: data.user,
      });
    });

    socket.on("disconnect", async () => {
      console.log("chat 네임스페이스 접속 해제");

      let roomId = null;

      for (let k in roomsUsers) {
        if (roomsUsers[k][socket.id]) {
          roomId = k;
        }
      }
      let userCount;
      if (roomId) {
        userCount = Object.keys(roomsUsers[roomId]).length;
      }

      if (userCount) {
        if (userCount === 1) {
          // 유저가 0명이면 방 삭제
          delete roomsUsers[roomId];
          await removeRoom(roomId); // 컨트롤러 대신 서비스를 사용
          room.emit("removeRoom", roomId);
          client.del(roomId);
          console.log("방 제거 요청 성공");
        } else {
          delete roomsUsers[roomId][socket.id];
          socket.to(roomId).emit("exit", {
            user: roomsUsers[roomId],
            chat: `${roomInfo.user}님이 퇴장하셨습니다.`,
          });
        }
      }
    });
  });
};
