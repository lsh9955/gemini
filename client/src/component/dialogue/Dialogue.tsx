import React, { useEffect, useState, useRef } from "react";
import {
  BeforeBtn,
  ButtonsWrap,
  ChatLine,
  DialogueMainWrap,
  DialogueWrap,
  NextBtn,
} from "./DialogueStyle";
import Typed from "typed.js";
import { io, Socket } from "socket.io-client";
import nextButton from "../../assets/img/nextButton.svg";

const Dialogue = ({ gameMsg }: { gameMsg: any }) => {
  const [nowTxtPage, setNowTxtPage] = useState<number>(0);
  const el = useRef(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  //   useEffect(() => {
  //     chatSocket.on("messageResponse", (data: any) => {
  //       console.log("채팅다이얼로그에서 받았습니다");
  //       if (data.type === "룸 채팅") {
  //         setGameMsg([...gameMsg, data]);
  //       }
  //     });
  //     return () => {
  //       chatSocket.off("messageResponse");
  //     };
  //   }, [chatSocket, gameMsg]);
  // 원본
  //   useEffect(() => {
  //     if (gameMsg.length >= 1 && gameMsg[gameMsg.length - 1].type === "룸 채팅") {
  //       lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  //       const typed = new Typed(el.current, {
  //         strings: [`${gameMsg[gameMsg.length - 1].text}`],
  //         typeSpeed: 50,
  //       });
  //       return () => {
  //         typed.destroy();
  //       };
  //     }
  //   }, [gameMsg]);
  useEffect(() => {
    if (gameMsg.length === 1) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      const typed = new Typed(el.current, {
        strings: [`${gameMsg[nowTxtPage].text}`],
        typeSpeed: 50,
      });
      return () => {
        typed.destroy();
      };
    }
  }, [gameMsg.length >= 1 && nowTxtPage === 0]);

  useEffect(() => {
    if (gameMsg.length >= 1) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      const typed = new Typed(el.current, {
        strings: [`${gameMsg[nowTxtPage].text}`],
        typeSpeed: 50,
      });
      return () => {
        typed.destroy();
      };
    }
  }, [nowTxtPage]);

  const nextTxtHandler = () => {
    setNowTxtPage(nowTxtPage + 1);
  };

  const beforeTxtHandler = () => {
    setNowTxtPage(nowTxtPage - 1);
  };
  return (
    <DialogueMainWrap>
      <ButtonsWrap>
        {nowTxtPage !== 0 && gameMsg.length > 1 && (
          <BeforeBtn src={nextButton} onClick={beforeTxtHandler} />
        )}
        {nowTxtPage !== gameMsg.length - 1 && gameMsg.length > 1 && (
          <NextBtn src={nextButton} onClick={nextTxtHandler} />
        )}
      </ButtonsWrap>
      <DialogueWrap>
        <ChatLine ref={el} />
      </DialogueWrap>
    </DialogueMainWrap>
  );
};

export default Dialogue;
