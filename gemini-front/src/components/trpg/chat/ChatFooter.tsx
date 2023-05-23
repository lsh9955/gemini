import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { io, Socket } from "socket.io-client";
import Dialogue from "../dialogue/Dialogue";
import PersonalMsgSelect from "./PersonalMsgSelect";
import { useSelector } from "react-redux";
import { ChatInputForm, ChatInputWrap, ChatStatuButtonWrap } from "./ChatStyle";
const ChatFooter = ({
  nowMsgTypeHandler,
  chatSocket,
  userList,
  nowMsgType,
  notReadMsg,
}: {
  nowMsgTypeHandler: any;
  chatSocket: Socket;
  userList: Array<string>;
  nowMsgType: any;
  notReadMsg: any;
}) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [msType, setMsType] = useState("룸 채팅");
  const [sendTo, setSendTo] = useState("");
  const handleSendMessage = () => {
    if (message.trim() && userSeq.nickname) {
      const thisUserImg = localStorage.getItem("gameUserImg");
      chatSocket?.emit("message", {
        //추후 유저 이미지도 추가할것
        text: message,
        name: userSeq.nickname,
        time: Date.now(),
        socketID: chatSocket?.id,
        //룸(게임만을 위한) 채팅, 정보 채팅, 잡담, 개인채팅에 따라 유형을 나눔
        type: msType,
        sendtarget: sendTo,
        userImg: thisUserImg && JSON.parse(thisUserImg).image,
      });
    }
    setMessage("");
  };
  const chatTypeHandler = (chatType: string) => {
    setMsType(chatType);
    nowMsgTypeHandler(chatType);
  };
  const sendtargetHandler = (targetUser: string) => {
    setSendTo(targetUser);
  };
  const userSeq = useSelector((state: any) => state.user);
  const onKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      const start = e.currentTarget.selectionStart || 0;
      const end = e.currentTarget.selectionEnd || 0;
      setMessage((prevState) => {
        return prevState.substring(0, start) + "\n" + prevState.substring(end);
      });

      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(start + 1, start + 1);
      }, 0);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
      setMessage("");
    }
  };
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <ChatStatuButtonWrap>
        <button
          onClick={() => {
            chatTypeHandler("룸 채팅");
          }}
          style={{ position: "relative" }}
        >
          {notReadMsg["룸 채팅"] !== 0 && (
            <div
              style={{
                position: "absolute",
                width: "25px",
                height: "23px",
                borderRadius: "80px",
                color: "white",
                top: "-20px",
                right: "-20px",
                backgroundColor: "darkred",
                textAlign: "center",
              }}
            >
              {notReadMsg["룸 채팅"]}
            </div>
          )}
          룸 채팅
        </button>
        <button
          onClick={() => {
            chatTypeHandler("정보");
          }}
          style={{ position: "relative" }}
        >
          {notReadMsg["정보"] !== 0 && (
            <div
              style={{
                position: "absolute",
                width: "25px",
                height: "23px",
                borderRadius: "80px",
                color: "white",
                top: "-20px",
                right: "-20px",
                backgroundColor: "darkred",
                textAlign: "center",
              }}
            >
              {notReadMsg["정보"]}
            </div>
          )}
          정보
        </button>
        <button
          onClick={() => {
            chatTypeHandler("잡담");
          }}
          style={{ position: "relative" }}
        >
          {notReadMsg["잡담"] !== 0 && (
            <div
              style={{
                position: "absolute",
                width: "25px",
                height: "23px",
                borderRadius: "80px",
                color: "white",
                top: "-20px",
                right: "-20px",
                backgroundColor: "darkred",
                textAlign: "center",
              }}
            >
              {notReadMsg["잡담"]}
            </div>
          )}
          잡담
        </button>
        <button
          onClick={() => {
            chatTypeHandler("개인채팅");
          }}
          style={{ position: "relative" }}
        >
          {notReadMsg["개인채팅"] !== 0 && (
            <div
              style={{
                position: "absolute",
                width: "25px",
                height: "23px",
                borderRadius: "80px",
                color: "white",
                top: "-20px",
                right: "-20px",
                backgroundColor: "darkred",
                textAlign: "center",
              }}
            >
              {notReadMsg["개인채팅"]}
            </div>
          )}
          개인채팅
        </button>
      </ChatStatuButtonWrap>
      <ChatInputWrap>
        <div>내 이름 : {userSeq.nickname}</div>
        <div>
          {msType === "개인채팅" && (
            <PersonalMsgSelect
              userList={userList}
              sendtargetHandler={sendtargetHandler}
            />
          )}
        </div>
        <button onClick={handleSendMessage}>전송</button>
      </ChatInputWrap>
      <ChatInputForm>
        <textarea
          placeholder="메세지를 입력해주세요"
          className="message"
          value={message}
          ref={inputRef}
          onKeyDown={onKeyPress}
          onChange={handleChange}
          // onChange={(e) => setMessage(e.target.value)}
        />
      </ChatInputForm>
    </>
  );
};

export default ChatFooter;
