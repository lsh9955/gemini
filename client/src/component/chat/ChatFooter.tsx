import React, { useState } from 'react'
import { io, Socket } from "socket.io-client";
const ChatFooter = ({ chatSocket }: { chatSocket: Socket }) => {
  const [message, setMessage] = useState("")
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
          type: "room"
        }
      )
    }
    setMessage("")
  }
  return (
    <div className='chat__footer'>
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