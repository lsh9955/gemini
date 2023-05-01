import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

const Chat = ({ client }) => {
  const userN = useState(localStorage.getItem("userInfo"));
  const [userList, setUserList] = useState([userN]);
  const [chatList, setChatList] = useState([]);
  const [firCome, setFirCome] = useState(true);
  const [socket, setSocket] = useState(
    io.connect(
      "http://localhost:5000/chat",
      {
        transports: ["websocket"],
      },
      { path: "/custom/socket.io" }
    )
  );
  const getUser = async () => {
    let userArr = [];
    const getArr = await client.lrange(
      `${new URL(window.location).pathname.split("/").at(-1)}`,
      0,
      -1,
      (err, arr) => {
        userArr = arr;
      }
    );
    getArr();
    return userArr;
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    //현재는 유저정보를 랜덤으로 하고 있지만, 추후 생성시 json형태로 emit에 넣을것
    socket.emit("join", {
      user: userN,
      roomId: new URL(window.location).pathname.split("/").at(-1),
    });
    socket.on("join", function (data) {
      console.log("join 이벤트", data.user);
      setUserList(setUserList(...userList, data.user));
    });

    socket.on("exit", function (data) {
      console.log(data.user);
      setUserList(Object.values(data.user));
    });
    socket.on("chat", function (data) {
      setChatList([...chatList, data]);
    });
    return () => {
      socket.off("join");
      socket.off("userUpdate");
      socket.off("exit");
      socket.off("chat");
    };
  }, []);

  // document.querySelector("#chat-form").addEventListener("submit", function (e) {
  //   e.preventDefault();
  //   if (e.target.chat.value) {
  //     axios
  //       .post("/room/{{room._id}}/chat", {
  //         chat: this.chat.value,
  //       })
  //       .then(() => {
  //         e.target.chat.value = "";
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }
  // });
  // document.querySelector("#pic").addEventListener("change", function (e) {
  //   console.log(e.target.files);
  //   const formData = new FormData();
  //   formData.append("pic", e.target.files[0]);
  //   axios
  //     .post("/room/{{room._id}}/pic", formData)
  //     .then(() => {
  //       e.target.file = null;
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // });
  return (
    <>
      <a href="/" id="exit-btn">
        방 나가기
      </a>
      <div>유저리스트</div>
      <div>
        {userList.map((v, i) => {
          return <div key={i}>{v}</div>;
        })}
      </div>
      <div>채팅리스트</div>
      <div>
        {chatList.map((v, i) => {
          return <div key={i}>{v}</div>;
        })}
      </div>

      <div>채팅 내용</div>
    </>
  );
};

export default Chat;
