import React, { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { GetPictureTitle, GetPictureWrap, SizeButton } from "./GetPictureStyle";

const Vote = ({
  chatSocket,
  playTarget,
  playHandler,
}: {
  chatSocket: Socket;
  playTarget: any;
  playHandler: any;
}) => {
  useEffect(() => {
    console.log(playTarget);
  }, [playTarget]);
  const sizeHandler = () => {
    playHandler("");
  };
  const inputRef = useRef<HTMLInputElement>(null);

  const imgCreateHandler = () => {
    const passQuery = async (data: object) => {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/andite/pastel-mix",
        {
          headers: {
            Authorization: `${process.env.REACT_APP_HUGGING_FACE_API}`,
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.blob();
      return result;
    };

    passQuery({ inputs: inputRef }).then((response) => {
      const objectURL = URL.createObjectURL(response);
      chatSocket?.emit("createPicture", {
        createPicture: objectURL,
        roomId: new URL(window.location.href).pathname.split("/").at(-1) ?? "",
      });
    });
  };

  return (
    <>
      <GetPictureWrap playerStyle={playTarget !== "addBackground"}>
        <GetPictureTitle>
          <p>배경 이미지를 생성합니다</p>
          <p>(몇 분 소요될 수 있습니다.</p>
          <p>생성시 알람으로 알려드립니다)</p>
        </GetPictureTitle>
        <input
          ref={inputRef}
          defaultValue={
            "masterpiece, best quality, ultra-detailed, illustration, close-up, straight on, face focus, 1girl, white hair, golden eyes, long hair, halo, angel wings, serene expression, looking at viewer"
          }
        />
        <button onClick={imgCreateHandler}>이미지 생성</button>
        <SizeButton onClick={sizeHandler}>닫기</SizeButton>
      </GetPictureWrap>
    </>
  );
};

export default Vote;
