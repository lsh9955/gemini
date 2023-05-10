const Room = require("../schemas/room");
const Chat = require("../schemas/chat");

exports.removeRoom = async (roomId) => {
  try {
    await Room.deleteOne({ _id: roomId });
    //채팅은 남겨달라는 요청으로 삭제하지 않음
    // await Chat.deleteMany({ room: roomId });
  } catch (error) {
    throw error;
  }
};
