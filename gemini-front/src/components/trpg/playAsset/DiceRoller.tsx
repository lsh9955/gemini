import React, { useEffect, useState } from "react";
import { DiceStart, DiceTitle, DiceWrap, SizeButton } from "./DiceRollerStyle";

const DiceRoller = ({
  playTarget,
  playHandler,
  chatSocket,
  diceNum,
  diceReset,
}: {
  playTarget: any;
  playHandler: any;
  chatSocket: any;
  diceNum: any;
  diceReset: any;
}) => {
  const [diceStart, setDiceStart] = useState<boolean>(false);
  const sizeHandler = () => {
    playHandler("");
  };
  useEffect(() => {
    console.log(diceNum);
  }, [diceNum]);

  useEffect(() => {
    const handleMessageFromIframe = (event: any) => {
      if (!isNaN(event.data)) {
        chatSocket?.emit("diceRoll", {
          diceNum: event.data,
          roomId:
            new URL(window.location.href).pathname.split("/").at(-1) ?? "",
        });
      }
    };
    window?.addEventListener("message", handleMessageFromIframe);

    return () => {
      window?.removeEventListener("message", handleMessageFromIframe);
    };
  }, [chatSocket]);
  return (
    <DiceWrap playerStyle={playTarget !== "dice"}>
      <DiceTitle>주사위를 던집니다</DiceTitle>

      {diceStart && (
        <iframe
          src={"https://stupendous-cupcake-e93f3f.netlify.app/"}
          style={{ position: "absolute", width: "100%", height: "60%" }}
        />
      )}
      {/* <DiceStart>시작</DiceStart> */}
      <div
        style={{
          backgroundColor: "transparent",

          marginBottom: "2%",
          width: "80%",
          color: "white",
          height: "20%",

          zIndex: "333",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "100%", width: "40%" }}>
          점수 : {diceNum !== -1 && diceNum}
        </div>

        <button
          onClick={() => {
            if (diceStart) {
              diceReset();
            }
            setDiceStart(!diceStart);
          }}
          style={{
            backgroundColor: "transparent",
            fontSize: "100%",
            width: "40%",
            textAlign: "center",
            color: "white",
            border: "1px solid white",
          }}
        >
          {diceStart ? "초기화" : "주사위 던지기"}
        </button>
      </div>

      <SizeButton onClick={sizeHandler}>닫기</SizeButton>
    </DiceWrap>
  );
};

export default DiceRoller;
