import React, { useEffect } from "react";
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
    console.log("Received message from iframe:", event.data);
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
        style={{ width: "100%", height: "50vh" }}
      />
      {/* <DiceStart>시작</DiceStart> */}
      <SizeButton onClick={sizeHandler}>닫기</SizeButton>
    </DiceWrap>
  );
};

export default DiceRoller;
