import React, { useEffect, useState, useRef } from 'react'

import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import { io, Socket } from "socket.io-client";
const ChatPage = ({ chatSocket }: { chatSocket: Socket }) => {
  const [messages, setMessages] = useState<string[]>([])
  const [typingStatus, setTypingStatus] = useState("")
  const lastMessageRef = useRef<HTMLDivElement>(null);
  console.log(chatSocket)
  useEffect(() => {
    chatSocket.on("messageResponse", (data: any) => setMessages([...messages, data]))
  }, [chatSocket, messages])


  useEffect(() => {

    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat">

      <div className='chat__main'>
        <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef} />
        <ChatFooter chatSocket={chatSocket} />
      </div>
    </div>
  )
}

export default ChatPage