import React, { useEffect, useState, useRef } from "react";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { io, Socket } from "socket.io-client";

import { ChatBodyWrap, ChatStatus, ChatWrap } from "./ChatStyle";
const ChatPage = ({
  userList,
  messages,
  chatSocket,
}: {
  userList: Array<string>;
  messages: any;
  chatSocket: Socket;
}) => {
  const [nowMsgType, setNowMsgType] = useState("룸 채팅");
  const [typingStatus, setTypingStatus] = useState("");
  const [notReadMsg, setNotReadMsg] = useState({
    "룸 채팅": 0,
    정보: 0,
    잡담: 0,
    개인채팅: 0,
  });
  useEffect(() => {
    if (messages?.length > 0) {
      if (messages[messages.length - 1].type !== nowMsgType) {
        if (
          messages[messages.length - 1].type === "개인채팅" &&
          messages[messages.length - 1].sendtarget ===
            window.localStorage.getItem("userInfo")
        ) {
          const newNotRead: any = notReadMsg;
          newNotRead[messages[messages.length - 1].type] =
            newNotRead[messages[messages.length - 1].type] + 1;
          setNotReadMsg(newNotRead);
        } else if (messages[messages.length - 1].type !== "개인채팅") {
          const newNotRead: any = notReadMsg;
          newNotRead[messages[messages.length - 1].type] =
            newNotRead[messages[messages.length - 1].type] + 1;
          setNotReadMsg(newNotRead);
        }
      }
    }
  }, [messages]);

  const nowMsgTypeHandler = (data: string) => {
    setNowMsgType(data);
    let newNotRead: any = JSON.stringify(notReadMsg);
    newNotRead = JSON.parse(newNotRead);
    newNotRead[data] = 0;
    setNotReadMsg(newNotRead);
  };

  return (
    <ChatWrap>
      {/* dialogue로 옮길것 */}

      <ChatStatus>{nowMsgType}</ChatStatus>
      <ChatBodyWrap>
        <ChatBody
          messages={messages}
          typingStatus={typingStatus}
          nowMsgType={nowMsgType}
        />
      </ChatBodyWrap>

      <ChatFooter
        notReadMsg={notReadMsg}
        chatSocket={chatSocket}
        nowMsgTypeHandler={nowMsgTypeHandler}
        userList={userList}
        nowMsgType={nowMsgType}
      />
    </ChatWrap>
  );
};

export default ChatPage;
