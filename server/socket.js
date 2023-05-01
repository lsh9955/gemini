const SocketIO = require("socket.io");
const { removeRoom } = require("./services");
const cors = require("cors");
const redis = require("redis");
const client = redis.createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
});
client.on('connect', () => {
  console.info('Redis connected!');
});

//방 입장시 유저 정보, 유저 소켓 아이디에 따른 실제 유저 아이디를 Redis에 저장
const saveUser = async (data, socket) => {
  console.log(data.roomId)
await client.set(String(socket.id), String(data.user));
 await client.lpush(String(data.roomId), String(socket.id));



};

//소켓 정보로 유저 이름 정보 조회
const findUserName = async(socket)=>{
  let thisUserName = null;

 const a = await client.get(String(socket.id),
  (err,rp)=>{
    console.log("@@@@@@@@@@@@@")
    console.log(rp)
  }
  
 );
 a

  return thisUserName
}



module.exports = (server, app, sessionMiddleware) => {
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

    socket.on("join", (data) => {
      console.log("채팅방에 입장 체크");
      console.log("새 방을 만듦");

      saveUser(data, socket);
      socket.join(data.roomId);

    });

    socket.on("disconnect", async () => {
      console.log("chat 네임스페이스 접속 해제");

      let thisUserName = await findUserName(socket)
 
      await client.del(`${socket.id}`)
      console.log("########################")
      console.log(thisUserName)
       const a =  await client.scan("0", 'MATCH', thisUserName);
       console.log(a)
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
