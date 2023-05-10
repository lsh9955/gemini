const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  renderMain,
  renderRoom,
  createRoom,
  enterRoom,
  removeRoom,
  sendChat,
  sendPic,
} = require("../controllers");

const router = express.Router();

router.get("/", renderMain);

router.get("/room", renderRoom);

router.post("/room", createRoom);

router.get("/room/:id", enterRoom);

router.delete("/room/:id", removeRoom);

router.post("/room/:id/chat", sendChat);

//이미지 업로드 로직
//Firebase업로드 로직으로 이식 또는 S3 업로드로 로직 구현
//추후 이미지 생성 API와 연동 후 삭제할 것

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
router.post("/room/:id/pic", upload.single("pic"), sendPic);

module.exports = router;
