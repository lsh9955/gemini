import React, { useCallback, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { Messagechats, Messagecontainer } from "./ChatBodyStyle";

const ChatBody = ({ messages, lastMessageRef, nowMsgType }: any) => {
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
      <Messagecontainer ref={scrollRef}>
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
              <Messagechats key={message.id}>
                <img src={message.userImg} alt="채팅유저이미지" />
                <p className="sender__name">{message.name}(나)</p>
                <div className="message__sender">
                  <p>{message.text}</p>
                </div>
              </Messagechats>
            ) : (
              <div className="message__chats" key={message.id}>
                <img src={message.userImg} alt="채팅유저이미지" />
                <p>{message.name}</p>
                <div className="message__recipient">
                  <p>{message.text}</p>
                </div>
              </div>
            )
          )}
        {/* {messages
          .filter((message: any) =>
            message.type === "개인채팅"
              ? message.type === nowMsgType &&
                (message.sendtarget === localStorage.getItem("userInfo") ||
                  message.name === localStorage.getItem("userInfo"))
              : message.type === nowMsgType
          )
          .map((message: any) =>
            message.name === localStorage.getItem("userInfo") ? (
              <div className="message__chats" key={message.id}>
                <p className="sender__name">{message.name}(나)</p>
                <div className="message__sender">
                  <p>{message.text}</p>
                </div>
              </div>
            ) : (
              <div className="message__chats" key={message.id}>
                <p>{message.name}</p>
                <div className="message__recipient">
                  <p>{message.text}</p>
                </div>
              </div>
            )
          )} */}

        <div ref={lastMessageRef}></div>
      </Messagecontainer>
    </>
  );
};

export default ChatBody;
