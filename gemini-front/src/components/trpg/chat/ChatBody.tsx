import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const ChatBody = ({ messages, lastMessageRef, nowMsgType }: any) => {
  const history = useHistory();
  const userSeq = useSelector((state: any) => state.user);

  return (
    <>
      <div className="message__container">
        {messages
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
                <img src={userSeq.profileImgUrl} alt="채팅유저이미지" />
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
      </div>
    </>
  );
};

export default ChatBody;
