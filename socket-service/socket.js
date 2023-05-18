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
  console.info("레디스 연결되었습니다");
});

//방 입장시 유저 정보, 유저 소켓 아이디에 따른 실제 유저 아이디를 Redis에 저장
const saveUser = async (data, socket) => {
  await client.set(String(socket.id), String(data.user));
  await client.set(String(data.user), String(data.roomId));
  await client.lpush(String(data.roomId), String(data.user));
  console.log("방에 입장한 유저 정보 레디스에 저장되었습니다");
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
    path: "/socket",
    cors: {
      // 개발시
      // origin: "http://localhost:3000",
      // 배포시
      origin: "https://mygemini.co.kr",
    },
    transports: ["websocket", "polling"],
    allowEIO3: true,
  });
  app.set("io", io);

  io.on("connection", (socket) => {
    console.log("chat 네임스페이스에 접속");
    const clientSocket = io.sockets;

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
        console.log("유저가 메세지 전송");
        io.to(data.roomId).emit("messageResponse", chatData);
      });
      socket.on("startVote", async (voteData) => {
        console.log("투표 시작");
        const voteStartRoom = await Room.find({ _id: voteData.roomId });
        io.to(voteData.roomId).emit("voteResponse", voteStartRoom);
      });
      socket.on("startRanPick", async (voteData) => {
        const voteStartRoom = await Room.find({ _id: voteData.roomId });
        io.to(voteData.roomId).emit("startRanPickResponse", voteStartRoom);
      });
      socket.on("pickUser", (voteData) => {
        console.log("투표 유저 선택");
        console.log(voteData);
        io.to(voteData.roomId).emit("pickUserResponse", voteData.pickUser);
      });
      socket.on("voteResult", (voteResult) => {
        io.to(voteResult.roomId).emit(
          "voteResultResponse",
          voteResult.pickUser
        );
      });
      socket.on("resetVote", (resetVote) => {
        io.to(resetVote.roomId).emit("voteResponse", null);
      });

      socket.on("randomPick", async (voteData) => {
        const voteStartRoom = await Room.find({ _id: voteData.roomId });
        let userArray = voteData.ranPick;
        let ranCount = Math.floor(userArray.length * Math.random());
        io.to(voteData.roomId).emit("randomPickResponse", userArray[ranCount]);
      });

      socket.on("resetRanVote", (resetVote) => {
        io.to(resetVote.roomId).emit("resetRanVoteResponse", null);
      });
      socket.on("musicPlay", (music) => {
        io.to(music.roomId).emit("musicPlayResponse", music.muiscURL);
      });
      socket.on("diceRoll", (dice) => {
        io.to(dice.roomId).emit("diceRollResponse", dice.diceNum);
      });
      socket.on("changeBgImg", (img) => {
        io.to(img.roomId).emit("changeBgImgResponse", img.imgUrl);
      });
      socket.on("inputfourPic", async (userImg) => {
        const willupdateRoom = await Room.find({ _id: userImg.roomId });
        let changeUserArr = willupdateRoom[0].fourpic.slice();
        if (changeUserArr.length <= 3) {
          changeUserArr.push(userImg.userImg);
          await Room.updateOne(
            { _id: userImg.roomId },
            {
              $set: {
                fourpic: changeUserArr,
              },
            }
          );
        }
      });
      socket.on("makeFourPic", async (userImg) => {
        const willupdateRoom = await Room.find({ _id: userImg.roomId });
        let changeUserArr = willupdateRoom[0].fourpic.slice();
        io.to(userImg.roomId).emit("makeFourPicResponse", changeUserArr);
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
