import React, { useEffect, useState } from "react";
import oneDice from "../../assets/dice/1.gif";
import {
  PlayImgWrap,
  DiceTitle,
  DiceWrap,
  DiceStart,
  SizeButton,
} from "./CharacterChooseStyle";

const CharacterChoose = ({
  playTarget,
  playHandler,
  chatSocket,
  pickUserImg,
}: {
  playTarget: any;
  playHandler: any;
  chatSocket: any;
  pickUserImg: any;
}) => {
  const [diceStart, setDiceStart] = useState<boolean>(false);
  const sizeHandler = () => {
    playHandler("");
  };

  const handleMessageFromIframe = (event: any) => {
    if (!isNaN(event.data)) {
      chatSocket?.emit("diceRoll", {
        diceNum: event.data,
        roomId: new URL(window.location.href).pathname.split("/").at(-1) ?? "",
      });
    }
    // console.log("주사위 점수", event.data, isNaN(event.data));
  };
  useEffect(() => {
    window.addEventListener("message", handleMessageFromIframe);

    return () => {
      window.removeEventListener("message", handleMessageFromIframe);
    };
  }, []);
  return (
    <DiceWrap playerStyle={playTarget !== "pickUserImg"}>
      <DiceTitle>플레이할 이미지를 골라주세요</DiceTitle>
      <PlayImgWrap>
        {pickUserImg &&
          pickUserImg.map((v: any) => {
            return (
              <img
                src={v.image}
                style={{
                  width: "19%",
                  height: "auto",
                  margin: "1%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  localStorage.setItem("gameUserImg", JSON.stringify(v));
                  playHandler("");
                  chatSocket?.emit("inputfourPic", {
                    userImg: Number(v.geminiPk),
                    roomId:
                      new URL(window.location.href).pathname
                        .split("/")
                        .at(-1) ?? "",
                  });
                  //inputfourPic
                }}
                alt=""
              />
            );
          })}
      </PlayImgWrap>
    </DiceWrap>
  );
};

export default CharacterChoose;
