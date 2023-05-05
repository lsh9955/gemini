import React, { useEffect, useState, useRef } from 'react'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import { io, Socket } from "socket.io-client";
import Typed from 'typed.js';
const ChatPage = ({ chatSocket }: { chatSocket: Socket }) => {
  const [messages, setMessages] = useState<any[]>([])
  const [typingStatus, setTypingStatus] = useState("")
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const el = React.useRef(null);

  useEffect(() => {
    console.log(messages)
    chatSocket.on("messageResponse", (data: any) => setMessages([...messages, data]))
  }, [chatSocket, messages])



  useEffect(() => {
    if (messages.length >= 1) {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
      const typed = new Typed(el.current, {
        strings: [`${messages[messages.length - 1].text}`],
        typeSpeed: 50,
      });


      return () => {
        // Destroy Typed instance during cleanup to stop animation
        typed.destroy();
      };
    }
  }, [messages]);

  return (
    <div className="chat">
      <span ref={el} />
      <div className='chat__main'>
        <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef} />
        <ChatFooter chatSocket={chatSocket} />
      </div>
    </div>
  )
}

export default ChatPage