const SocketIO = require("socket.io");
const { removeRoom } = require("./services");
const Room = require("./schemas/room");
const Chat = require("./schemas/chat");
const cors = require("cors");
const redis = require("redis");
const client = redis.createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
});

client.on("connect", () => {
  console.info("Redis connected!");
});

//방 입장시 유저 정보, 유저 소켓 아이디에 따른 실제 유저 아이디를 Redis에 저장
const saveUser = async (data, socket) => {
  await client.set(String(socket.id), String(data.user));
  await client.set(String(data.user), String(data.roomId));
  await client.lpush(String(data.roomId), String(data.user));
};

const findUserRoom = async (key) => {
  return new Promise((resolve, reject) => {
    // GET 명령어 실행
    client.get(key, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
};

function getValue(key) {
  return new Promise((resolve, reject) => {
    // GET 명령어 실행
    client.get(key, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}
//유저가 나온 방의 인원수
function getUserNum(key) {
  return new Promise((resolve, reject) => {
    client.llen(key, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}

//유저가 입장한 방 정보

function getRoomInfo(key) {
  return new Promise((resolve, reject) => {
    client.lrange(key, 0, -1, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}

//소켓 정보로 유저 이름 정보 조회
const findUserName = async (socket) => {
  const value = await getValue(socket.id);
  return value;
};

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, {
    path: "/socket.io",
    cors: {
      origin: "http://localhost:3000",
    },
    transports: ["websocket"],
  });
  app.set("io", io);
  io.on("connection", (socket) => {
    console.log("chat 네임스페이스에 접속");
    const clientSocket = io.sockets;
    console.log(clientSocket);
    let nowSocket = socket;

    socket.on("join", async (data) => {
      console.log("채팅방에 입장 체크");
      await saveUser(data, socket);
      socket.join(data.roomId);
      const roomLen = await getRoomInfo(`${data.roomId}`);
      socket.emit("roomupdate", roomLen);
      const willupdateRoom = await Room.find({ _id: data.roomId });
      let changeUserArr = willupdateRoom[0].userarr.slice();
      changeUserArr.push(data.user);
      await Room.updateOne(
        { _id: data.roomId },
        {
          $set: {
            usernum: willupdateRoom[0].usernum + 1,
            userarr: changeUserArr,
          },
        }
      );

      io.emit("allroomchange", "mongoDBChange");
      socket.on("message", (chatData) => {
        io.to(data.roomId).emit("messageResponse", chatData);
      });
    });

    socket.on("disconnect", async () => {
      console.log("chat 네임스페이스 접속 해제");

      let thisUserName = await findUserName(nowSocket);
      if (thisUserName) {
        let thisUserRoom = await findUserRoom(thisUserName);
        const willupdateRoom = await Room.find({ _id: thisUserRoom });
        const changeUserArr = willupdateRoom[0].userarr.slice();
        changeUserArr.splice(changeUserArr.indexOf(thisUserName), 1);
        await Room.updateOne(
          { _id: thisUserRoom },
          {
            $set: {
              usernum: willupdateRoom[0].usernum - 1,
              userarr: changeUserArr,
            },
          }
        );
        await client.del(`${nowSocket.id}`);
        await client.del(`${thisUserName}`);
        await client.lrem(`${thisUserRoom}`, 0, `${thisUserName}`);
        const nowroomState = await getRoomInfo(`${thisUserRoom}`);
        socket.emit("roomupdate", nowroomState);
        const roomLen = await getUserNum(`${thisUserRoom}`);
        if (Number(roomLen) === 0) {
          // 유저가 0명이면 방 삭제
          await removeRoom(thisUserRoom); // 컨트롤러 대신 서비스를 사용
        }
        io.emit("allroomchange", "mongoDBChange");
      }
    });
  });
};
