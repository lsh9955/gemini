import React, { useEffect, useState } from "react";
import { DiceStart, DiceTitle, DiceWrap, SizeButton } from "./FourPictureStyle";
import fourUser from "../../../assets/img/fourUser.png";
import axios from "axios";

const FourPicture = ({
  chatSocket,
  playTarget,
  playHandler,
}: {
  chatSocket: any;
  playTarget: any;
  playHandler: any;
}) => {
  const [diceStart, setDiceStart] = useState<boolean>(false);
  const [fourPic, setFourPic] = useState(null);
  const [makePic, setMakePic] = useState(false);
  const getFourUser = () => {
    const imgCreateHandler = async () => {
      const response: any = await axios.post(
        "https://mygemini.co.kr/user-service/generate/pose",
        {
          sample: 0,
          geminis: [119, 119, 119, 119],
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
          <div style={{ marginTop: "2%", fontSize: "110%" }}>
            원하는 모습을 선택해주세요
          </div>
          <img
            src={fourUser}
            alt=""
            style={{
              width: "30%",
              height: "auto",
              cursor: "pointer",
              marginTop: "2%",
            }}
            onClick={getFourUser}
          />
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
          <div style={{ marginTop: "2%", fontSize: "110%" }}>
            사진을 찍었어요! 내 보관함에서 확인해주세요
          </div>
          <button
            style={{
              width: "auto",
              height: "auto",
              cursor: "pointer",
              marginTop: "2%",
              fontSize: "120%",
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
