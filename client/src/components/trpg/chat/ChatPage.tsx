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

  const nowMsgTypeHandler = (data: string) => {
    setNowMsgType(data);
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
        chatSocket={chatSocket}
        nowMsgTypeHandler={nowMsgTypeHandler}
        userList={userList}
      />
    </ChatWrap>
  );
};

export default ChatPage;
