import React, { useEffect, useState, useRef } from 'react'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import { io, Socket } from "socket.io-client";
import Typed from 'typed.js';
const ChatPage = ({ chatSocket }: { chatSocket: Socket }) => {
  const [messages, setMessages] = useState<any[]>([])
  const [gameMsg, setGameMsg] = useState<any[]>([])
  const [nowMsgType, setNowMsgType] = useState("룸 채팅")
  const [typingStatus, setTypingStatus] = useState("")
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const el = React.useRef(null);

  useEffect(() => {
    console.log(messages)
    chatSocket.on("messageResponse", (data: any) => {
      setMessages([...messages, data])
      if (data.type === "룸 채팅") {
        setGameMsg([...gameMsg, data])
      }
    })
    return (() => {
      chatSocket.off("messageResponse")
    })
  }, [chatSocket, messages])



  useEffect(() => {
    if (gameMsg.length >= 1 && gameMsg[gameMsg.length - 1].type === "룸 채팅") {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
      const typed = new Typed(el.current, {
        strings: [`${gameMsg[gameMsg.length - 1].text}`],
        typeSpeed: 50,
      });
      return () => {
        typed.destroy();
      };
    }

  }, [gameMsg]);

  const nowMsgTypeHandler = (data: string) => {
    setNowMsgType(data)
  }

  return (
    <div className="chat">
      <span ref={el} />
      <div className='chat__main'>
        <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef} nowMsgType={nowMsgType} />
        <ChatFooter chatSocket={chatSocket} nowMsgTypeHandler={nowMsgTypeHandler} />
      </div>
    </div>
  )
}

export default ChatPage