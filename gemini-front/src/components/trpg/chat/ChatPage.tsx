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
    console.log("메세지가 오고있어요", messages);
    if (messages?.length > 0) {
      if (messages[messages.length - 1].type !== nowMsgType) {
        const newNotRead: any = notReadMsg;
        newNotRead[messages[messages.length - 1].type] =
          newNotRead[messages[messages.length - 1].type] + 1;
        console.log("메세지 쌓일 때 ", newNotRead);
        setNotReadMsg(newNotRead);
      }
    }
  }, [messages]);

  const nowMsgTypeHandler = (data: string) => {
    setNowMsgType(data);
    let newNotRead: any = JSON.stringify(notReadMsg);
    newNotRead = JSON.parse(newNotRead);
    newNotRead[data] = 0;
    console.log("메뉴 바꿀 떄", newNotRead);
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
