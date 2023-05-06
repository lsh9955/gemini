const Room = require("../schemas/room");
const Chat = require("../schemas/chat");
const { removeRoom: removeRoomService } = require("../services");
const redis = require("redis");
const bcrypt = require("bcrypt");
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
  const rooms = await Room.find({});
  res.json({ room: rooms });
};

const userPicList = [
  "https://firebasestorage.googleapis.com/v0/b/crudtest-e658b.appspot.com/o/user1.png?alt=media&token=34af8408-0782-44b2-aca5-4ce903676aa7",
  "https://firebasestorage.googleapis.com/v0/b/crudtest-e658b.appspot.com/o/user2.png?alt=media&token=50319500-e428-473c-b7f5-b5812977f0c2",
  "https://firebasestorage.googleapis.com/v0/b/crudtest-e658b.appspot.com/o/user3.png?alt=media&token=058ffe29-b1c5-495f-a649-5a10d5488e15",
  "https://firebasestorage.googleapis.com/v0/b/crudtest-e658b.appspot.com/o/user4.png?alt=media&token=1f8ab0c3-b74f-42f5-bd89-63f36740bb75",
];

exports.createRoom = async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const newRoom = await Room.create({
      title: req.body.title,
      max: req.body.max,
      concept: req.body.concept,
      owner: req.body.userId,
      password: hashedPassword,
      users: req.body.userId,
      userArr: [],
      usernum: 0,
      //추후 유저 연결시 변경할 것
      defaultpicture: userPicList[Math.floor(Math.random() * 4)],
    });

    //const io = req.app.get("io");
    // io.emit("newRoom", newRoom);

    res.redirect(`http://localhost:3000/room/${newRoom._id}`);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.enterRoom = async (req, res, next) => {
  try {
    const willupdateRoom = await Room.find({ _id: req.params.id });
    //비밀번호 방인 경우
    if (willupdateRoom.password) {
    } else {
      await Room.updateOne({ _id: req.params.id }, { $set: { usernum: willupdateRoom.usernum + 1 } });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.removeRoom = async (req, res, next) => {
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
