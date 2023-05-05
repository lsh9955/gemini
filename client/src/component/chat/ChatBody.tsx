import React from 'react'
import { useHistory } from "react-router";

const ChatBody = ({ messages, typingStatus, lastMessageRef }: any) => {
  const history = useHistory();


  return (
    <>



      <div className='message__container'>

        {messages.map((message: any) => (
          message.name === localStorage.getItem("userInfo") ? (
            <div className="message__chats" key={message.id}>
              <p className='sender__name'>나</p>
              <div className='message__sender'>
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className='message__recipient'>
                <p>{message.text}</p>
              </div>
            </div>
          )
        ))}

        <div className='message__status'>

        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  )
}

export default ChatBody