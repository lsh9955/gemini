import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { io, Socket } from "socket.io-client";
import Dialogue from "../dialogue/Dialogue";
import PersonalMsgSelect from "./PersonalMsgSelect";
import { ChatInputForm, ChatInputWrap, ChatStatuButtonWrap } from "./ChatStyle";
const ChatFooter = ({
  nowMsgTypeHandler,
  chatSocket,
  userList,
}: {
  nowMsgTypeHandler: any;
  chatSocket: Socket;
  userList: Array<string>;
}) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [msType, setMsType] = useState("룸 채팅");
  const [sendTo, setSendTo] = useState("");
  const handleSendMessage = () => {
    if (message.trim() && localStorage.getItem("userInfo")) {
      chatSocket.emit("message", {
        //추후 유저 이미지도 추가할것
        text: message,
        name: localStorage.getItem("userInfo"),
        time: Date.now(),
        socketID: chatSocket.id,
        //룸(게임만을 위한) 채팅, 정보 채팅, 잡담, 개인채팅에 따라 유형을 나눔
        type: msType,
        sendtarget: sendTo,
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
        >
          룸 채팅
        </button>
        <button
          onClick={() => {
            chatTypeHandler("정보");
          }}
        >
          정보
        </button>
        <button
          onClick={() => {
            chatTypeHandler("잡담");
          }}
        >
          잡담
        </button>
        <button
          onClick={() => {
            chatTypeHandler("개인채팅");
          }}
        >
          개인채팅
        </button>
      </ChatStatuButtonWrap>
      <ChatInputWrap>
        <div>내 이름 : {localStorage.getItem("userInfo")}</div>
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
