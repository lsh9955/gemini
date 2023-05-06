import React, { useState } from 'react'
import { io, Socket } from "socket.io-client";
const ChatFooter = ({ nowMsgTypeHandler, chatSocket }: { nowMsgTypeHandler: any, chatSocket: Socket }) => {
  const [message, setMessage] = useState("")
  const [msType, setMsType] = useState("룸 채팅")
  const [sendTo, setSendTo] = useState("")
  const handleSendMessage = (e: any) => {
    e.preventDefault()
    if (message.trim() && localStorage.getItem("userInfo")) {
      chatSocket.emit("message",
        {
          //추후 유저 이미지도 추가할것
          text: message,
          name: localStorage.getItem("userInfo"),
          time: Date.now(),
          socketID: chatSocket.id,
          //룸(게임만을 위한) 채팅, 정보 채팅, 잡담, 개인채팅에 따라 유형을 나눔
          type: msType,
          sendtarget: "",
        }
      )
    }
    setMessage("")
  }
  const chatTypeHandler = (chatType: string) => {
    setMsType(chatType)
    nowMsgTypeHandler(chatType)
  }
  return (
    <div className='chat__footer'>
      <div>{msType}</div>
      <div>
        <button onClick={() => { chatTypeHandler("룸 채팅") }}>룸 채팅</button>
        <button onClick={() => { chatTypeHandler("정보") }}>정보</button>
        <button onClick={() => { chatTypeHandler("잡담") }}>잡담</button>
        <button onClick={() => { chatTypeHandler("개인채팅") }}>개인채팅</button>
      </div>
      {msType === "개인채팅" && <div></div>}
      <form className='form' onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder='메세지를 입력해주세요'
          className='message'
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button className="sendBtn">전송</button>
      </form>
    </div>
  )
}

export default ChatFooter