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
import loading from "../../../assets/img/loadding.gif";

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
  const [imgAlert, setImgAlert] = useState<boolean>(false);
  useEffect(() => {
    console.log(playTarget);
  }, [playTarget]);
  //db에서 이미지 받아옴
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
  useEffect(() => {
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
    setCreateImg(result.data.imageUrl);
    setImgAlert(true);
  };

  const changeBgImg = (targetImg: string) => {
    chatSocket?.emit("changeBgImg", {
      imgUrl: targetImg,
      roomId: new URL(window.location.href).pathname.split("/").at(-1) ?? "",
    });
  };

  const checkIsImg = async (target: string) => {
    //setcreate 비울것
    const checkValid: any = await axios.get(
      "https://mygemini.co.kr/user-service/complete/background",
      {
        params: {
          background: target,
        },
      }
    );
    console.log(checkValid);
    if (checkValid.data === "ok") {
      setCreateImg(null);
      imgGetHandler();
    }
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
              if (createImg) {
                checkIsImg(createImg);
              }
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
        {imgAlert && (
          <GetPictureTitle>
            <p style={{ fontSize: "120%", marginBottom: "3%" }}>
              그림을 그리는 중입니다....
            </p>
            <p>조금만 기다려주세요!</p>
            <button
              onClick={() => {
                setImgAlert(false);
              }}
              style={{
                fontSize: "110%",
                color: "white",
                border: "2px solid white",
                marginTop: "5%",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            >
              닫기
            </button>
          </GetPictureTitle>
        )}
        {selectBtn === "createPic" && !imgAlert && (
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
        {selectBtn === "seePic" && !imgAlert && (
          <>
            <BackImgWrap>
              {createImg && (
                <img
                  src={loading}
                  alt=""
                  style={{ width: "60%", height: "auto" }}
                />
              )}
              {picArr &&
                picArr.map((v: any) => {
                  return (
                    <img
                      src={v.imageUrl}
                      alt=""
                      onClick={() => {
                        changeBgImg(v.imageUrl);
                      }}
                    />
                  );
                })}
            </BackImgWrap>
          </>
        )}
        <SizeButton onClick={sizeHandler}>닫기</SizeButton>
      </GetPictureWrap>
    </>
  );
};

export default GetPicture;
