import React, { useEffect, useState } from "react";
import { DiceStart, DiceTitle, DiceWrap, SizeButton } from "./FourPictureStyle";
import fourUser from "../../../assets/img/fourUser.png";
import axios from "axios";

const FourPicture = ({
  chatSocket,
  playTarget,
  playHandler,
  fourpi,
  bgimg,
}: {
  chatSocket: any;
  playTarget: any;
  playHandler: any;
  fourpi: any;
  bgimg: any;
}) => {
  const [diceStart, setDiceStart] = useState<boolean>(false);
  const [fourPic, setFourPic] = useState(null);
  const [makePic, setMakePic] = useState(false);
  useEffect(() => {
    if (playTarget === "photo") {
      chatSocket?.emit("makeFourPic", {
        roomId: new URL(window.location.href).pathname.split("/").at(-1) ?? "",
      });
    }
  }, [playTarget]);

  const getFourUser = () => {
    const imgCreateHandler = async () => {
      const response: any = await axios.post(
        "https://mygemini.co.kr/user-service/generate/pose",
        {
          sample: 0,
          geminis: fourpi,
          backgroundUrl: bgimg,
        },
        {
          headers: {
            Accept: "*/*",
            Authorization: window.localStorage.getItem("accessToken"),
          },
        }
      );
      const result = await response;
      setFourPic(result);
      setMakePic(true);
    };
    imgCreateHandler();
  };
  const sizeHandler = () => {
    playHandler("");
  };

  return (
    <DiceWrap playerStyle={playTarget !== "photo"}>
      <DiceTitle>같이 인생네컷 찍어봐요!</DiceTitle>
      {!makePic && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ marginTop: "2%", fontSize: "90%", color: "white" }}>
            원하는 모습을 선택해주세요
          </div>
          {fourpi ? (
            <img
              src={fourUser}
              alt=""
              style={{
                width: "34%",
                height: "auto",
                cursor: "pointer",
                marginTop: "2%",
              }}
              onClick={getFourUser}
            />
          ) : (
            <div>동료들의 모습을 불러오고 있어요</div>
          )}
        </div>
      )}
      {makePic && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ marginTop: "2%", fontSize: "110%", color: "white" }}>
            사진을 찍었어요! 내 보관함에서 확인해주세요
          </div>
          <button
            style={{
              width: "auto",
              height: "auto",
              cursor: "pointer",
              marginTop: "2%",
              fontSize: "120%",
              border: "1px solid white",
              borderRadius: "4px",
              backgroundColor: "transparent",
              color: "white",
            }}
            onClick={() => {
              setMakePic(false);
            }}
          >
            확인
          </button>
        </div>
      )}
      <SizeButton onClick={sizeHandler}>닫기</SizeButton>
    </DiceWrap>
  );
};

export default FourPicture;
