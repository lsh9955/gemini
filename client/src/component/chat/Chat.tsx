import React, { useEffect, useState, useRef } from 'react'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import { io, Socket } from "socket.io-client";
import Typed from 'typed.js';
import { ChatBodyWrap, ChatStatus, ChatWrap } from './ChatStyle';
const ChatPage = ({ userList, chatSocket }: { userList: Array<string>, chatSocket: Socket }) => {
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
    <ChatWrap>
      {/* dialogue로 옮길것 */}
      {/* <ChatStatus ref={el} /> */}
      <ChatStatus>{nowMsgType}</ChatStatus>
      <ChatBodyWrap><ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef} nowMsgType={nowMsgType} /></ChatBodyWrap>

      <ChatFooter chatSocket={chatSocket} nowMsgTypeHandler={nowMsgTypeHandler} userList={userList} />

    </ChatWrap>
  )
}

export default ChatPage