const Room = require("../schemas/room");
const Chat = require("../schemas/chat");
const { removeRoom: removeRoomService } = require("../services");
const redis = require("redis");

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

exports.renderMain = async (req, res, next) => {
  try {
    const rooms = await Room.find({});
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.renderRoom = async (req, res) => {
  console.log("방 전체 조회");
  const rooms = await Room.find({});
  res.json({ room: rooms });
};

//방 생성
exports.createRoom = async (req, res, next) => {
  console.log("유저가 방 생성, 입장 전");
  try {
    const newRoom = await Room.create({
      title: req.body.title,
      max: req.body.max,
      concept: req.body.concept,
      owner: req.body.userId,
      password: req.body.password,
      users: req.body.userId,
      userArr: [],
      usernum: 0,
      fourpic: [],
      userImg: req.body.userImg,
      //추후 유저 연결시 변경할 것
      defaultpicture: req.body.userImg,
    });

    //const io = req.app.get("io");
    // io.emit("newRoom", newRoom);

    //개발시
    // res.redirect(`http://localhost:3000/room/${newRoom._id}`);
    //  배포시
    res.redirect(`https://mygemini.co.kr/room/${newRoom._id}`);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.enterRoom = async (req, res, next) => {
  console.log("기존에 생성된 방에 유저 입장");
  console.log(req);
  try {
    const willupdateRoom = await Room.find({ _id: req.params.id });
    //비밀번호 방인 경우
    if (willupdateRoom.password) {
    } else {
      await Room.updateOne(
        { _id: req.params.id },
        { $set: { usernum: willupdateRoom.usernum + 1 } }
      );
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.checkPassword = async (req, res) => {
  console.log("비밀방 입장 시도");
  try {
    const willupdateRoom = await Room.find({ _id: req.params.id });
    //비밀번호가 같은 경우
    if (willupdateRoom.password === req.body.password) {
      await Room.updateOne(
        { _id: req.params.id },
        { $set: { usernum: willupdateRoom.usernum + 1 } }
      );
      //개발시
      // res.redirect(`http://localhost:3000/room/${req.params.id}`);
      //  배포시
      res.redirect(`https://mygemini.co.kr/room/${req.params.id}`);
    } else {
      res.json({ error: "비밀번호가 다릅니다. 다시 시도해주세요" });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.removeRoom = async (req, res, next) => {
  console.log("유저가 없어 방 제거");
  try {
    await removeRoomService(req.params.id);
    res.send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.sendChat = async (req, res, next) => {
  try {
    const chat = await Chat.create({
      room: req.params.id,
      user: req.session.color,
      chat: req.body.chat,
    });
    req.app.get("io").to(req.params.id).emit("chat", chat);
    res.send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.sendPic = async (req, res, next) => {
  try {
    const chat = await Chat.create({
      room: req.params.id,
      user: req.session.color,
      pic: req.file.filename,
    });
    req.app.get("io").to(req.params.id).emit("chat", chat);
    res.send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
