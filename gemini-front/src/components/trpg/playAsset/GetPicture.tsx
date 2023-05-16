import React, { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import {
  BackImgWrap,
  GetPictureTitle,
  GetPictureWrap,
  SizeButton,
} from "./GetPictureStyle";
import axios from "axios";
import { useSelector } from "react-redux";
import { clearInterval } from "timers";

const GetPicture = ({
  chatSocket,
  playTarget,
  playHandler,
}: {
  chatSocket: Socket;
  playTarget: any;
  playHandler: any;
}) => {
  const [selectBtn, setSelectBtn] = useState("seePic");
  const [picArr, setPicArr] = useState<any>(null);
  const [createImg, setCreateImg] = useState<any>(null);
  useEffect(() => {
    console.log(playTarget);
  }, [playTarget]);

  useEffect(() => {
    const imgGetHandler = async () => {
      const response = await axios.get(
        "https://mygemini.co.kr/user-service/generate/background",
        {
          headers: {
            Accept: "*/*",
            Authorization: window.localStorage.getItem("accessToken"),
          },
        }
      );

      const result = await response;
      setPicArr(result.data.backgrounds);
    };
    imgGetHandler();
  }, []);
  const sizeHandler = () => {
    playHandler("");
  };
  const userSeq = useSelector((state: any) => state.user);

  const inputRef = useRef<HTMLInputElement>(null);

  const imgCreateHandler = async (data: any) => {
    const response: any = await axios.post(
      "https://mygemini.co.kr/user-service/generate/background",
      {
        background: data.current.value,
      },
      {
        headers: {
          Accept: "*/*",
          Authorization: window.localStorage.getItem("accessToken"),
        },
      }
    );
    const result = await response;
    setCreateImg(result.imageUrl);
  };

  return (
    <>
      <GetPictureWrap playerStyle={playTarget !== "addBackground"}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{
              width: "50%",
              fontSize: "110%",
              border: "1px solid white",
              backgroundColor: "transparent",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => {
              setSelectBtn("seePic");
            }}
          >
            배경 보기
          </button>
          <button
            style={{
              width: "50%",
              fontSize: "110%",
              border: "1px solid white",
              backgroundColor: "transparent",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => {
              setSelectBtn("createPic");
            }}
          >
            배경 생성하기
          </button>
        </div>
        {selectBtn === "createPic" && (
          <>
            <GetPictureTitle>
              <p style={{ fontSize: "120%", marginBottom: "3%" }}>
                배경 이미지를 생성합니다
              </p>
              <p>(몇 분 소요될 수 있습니다.</p>
              <p>생성시 알람으로 알려드립니다)</p>
            </GetPictureTitle>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ color: "white", marginBottom: "3%" }}>
                원하는 단어들을 입력해주세요
              </div>
              <input
                ref={inputRef}
                style={{ fontSize: "140%", marginBottom: "3%" }}
              />
              <button
                onClick={() => {
                  imgCreateHandler(inputRef);
                }}
                style={{
                  fontSize: "110%",
                  color: "white",
                  border: "2px solid white",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                이미지 생성
              </button>
            </div>
          </>
        )}
        {selectBtn === "seePic" && (
          <>
            <BackImgWrap>
              {picArr.map((v: any) => {
                return <img src={v.imageUrl} alt="" />;
              })}
            </BackImgWrap>
          </>
        )}
        {createImg && <img src={createImg} />}
        <SizeButton onClick={sizeHandler}>닫기</SizeButton>
      </GetPictureWrap>
    </>
  );
};

export default GetPicture;
