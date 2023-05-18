import React, { useCallback, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import {
  ChatUserImg,
  ChatUserName,
  ChatUserWrap,
  Messagechats,
  Messagecontainer,
} from "./ChatBodyStyle";

const ChatBody = ({ messages, lastMessageRef, nowMsgType }: any) => {
  console.log(messages);
  const userSeq = useSelector((state: any) => state.user);
  const scrollRef = useRef<any>(null);
  useEffect(() => {
    if (messages && scrollRef.current) {
      console.log("내려가요");
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [messages]);

  return (
    <>
      <Messagecontainer>
        {messages
          .filter((message: any) =>
            message.type === "개인채팅"
              ? message.type === nowMsgType &&
                (message.sendtarget === userSeq.nickname ||
                  message.name === userSeq.nickname)
              : message.type === nowMsgType
          )
          .map((message: any) =>
            message.name === userSeq.nickname ? (
              <>
                <Messagechats key={message.id}>
                  <ChatUserWrap>
                    <ChatUserImg src={message.userImg} alt="" />
                  </ChatUserWrap>
                  <div className="message__sender">
                    <p>{message.text}</p>
                  </div>
                </Messagechats>
                <ChatUserName>
                  <p>{message.name}(나)</p>
                </ChatUserName>
              </>
            ) : (
              <>
                <Messagechats key={message.id}>
                  <ChatUserWrap>
                    <ChatUserImg src={message.userImg} alt="" />
                  </ChatUserWrap>
                  <div className="message__recipient">
                    <p>{message.text}</p>
                  </div>
                </Messagechats>
                <ChatUserName>
                  <p>{message.name}</p>
                </ChatUserName>
              </>
            )
          )}

        <div ref={scrollRef}></div>
      </Messagecontainer>
    </>
  );
};

export default ChatBody;
