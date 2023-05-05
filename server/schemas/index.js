const mongoose = require("mongoose");

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;

const MONGO_URL = `mongodb+srv://${MONGO_ID}:${MONGO_PASSWORD}@youtubeclone.lv19k.mongodb.net/test`;
console.log(MONGO_URL);
const connect = () => {
  if (NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose.set("strictQuery", true);
  mongoose
    .connect(MONGO_URL, {
      dbName: "gameChat",
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("MongoDB 연결 성공");
    })
    .catch((err) => {
      console.error("MongoDB 연결 에러", err);
    });
};

mongoose.connection.on("error", (error) => {
  console.error("MongoDB 연결 에러", error);
});
mongoose.connection.on("disconnected", () => {
  console.error("MongoDB 연결이 끊겼습니다. 연결을 재시도합니다.");
  connect();
});

module.exports = connect;
