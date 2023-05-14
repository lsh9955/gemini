import React, { useEffect, useState } from "react";
import { DiceStart, DiceTitle, DiceWrap, SizeButton } from "./DiceRollerStyle";
import oneDice from "../../assets/dice/1.gif";

const DiceRoller = ({
  playTarget,
  playHandler,
}: {
  playTarget: any;
  playHandler: any;
}) => {
  const sizeHandler = () => {
    playHandler("");
  };
  const handleMessageFromIframe = (event: any) => {
    console.log("주사위 점수", event.data, isNaN(event.data));
  };
  useEffect(() => {
    window.addEventListener("message", handleMessageFromIframe);

    return () => {
      window.removeEventListener("message", handleMessageFromIframe);
    };
  }, []);
  return (
    <DiceWrap playerStyle={playTarget !== "dice"}>
      <DiceTitle>주사위를 던집니다</DiceTitle>
      <iframe
        src={"https://stupendous-cupcake-e93f3f.netlify.app/"}
        style={{ position: "absolute", width: "100%", height: "70%" }}
      />
      {/* <DiceStart>시작</DiceStart> */}
      <SizeButton onClick={sizeHandler}>닫기</SizeButton>
    </DiceWrap>
  );
};

export default DiceRoller;
