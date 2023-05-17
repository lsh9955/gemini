import React, { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { GetPictureTitle, GetPictureWrap, SizeButton } from "./GetPictureStyle";
import { useSelector } from "react-redux";
import { PicUser } from "./RandomPickStyle";

const RandomPick = ({
  chatSocket,
  playTarget,
  playHandler,
  voteInfo,
}: {
  chatSocket: Socket;
  playTarget: any;
  playHandler: any;
  voteInfo: any;
}) => {
  const userSeq = useSelector((state: any) => state.user);
  const [voteArr, setVoteArr] = useState<string[]>([]);
  const [isVoted, setIsvoted] = useState<boolean>(false);
  const [isPicked, setIsPicked] = useState(false);
  const [voteResult, setVoteResult] = useState<any>(null);
  const [ranPickUser, setRanPickUser] = useState<any>([]);
  const [allUser, setAllUser] = useState<any>(null);

  useEffect(() => {
    chatSocket?.on("pickUserResponse", function (data: any) {
      console.log(data);
      setVoteArr((prev) => [...prev, data]);
    });
    chatSocket?.on("voteResultResponse", function (data: any) {
      setVoteResult(data);
    });
    chatSocket?.on("resetRanVoteResponse", function (data: any) {
      setVoteArr([]);
      setIsvoted(false);
      setVoteResult(null);
    });

    chatSocket?.on("startRanPickResponse", function (data: any) {
      setAllUser(data);
    });

    chatSocket?.on("randomPickResponse", function (data: any) {
      playHandler("randompick");
      setVoteResult(data);
    });
    return () => {
      chatSocket?.off("pickUserResponse");
      chatSocket?.off("voteResultResponse");
      chatSocket?.off("randomPickResponse");
      chatSocket?.off("resetRanVoteResponse");
    };
  }, [chatSocket]);
  const sizeHandler = () => {
    playHandler("");
  };
  const inputRef = useRef<HTMLInputElement>(null);

  const startVote = () => {
    console.log(voteInfo);
    chatSocket?.emit("randomPick", {
      ranPick: ranPickUser,
      roomId: new URL(window.location.href).pathname.split("/").at(-1) ?? "",
    });
    setRanPickUser([]);
    setIsPicked(false);
  };
  const pickUser = (e: any) => {
    setRanPickUser((prev: any) => [...prev, e]);
  };

  function findMostFrequentElement(arr: Array<string>) {
    // 요소를 카운트하기 위한 객체 생성
    interface MyObject {
      [key: string]: any;
    }
    let count: MyObject = {};

    // 배열 요소를 순회하며 카운트
    for (let i = 0; i < arr.length; i++) {
      let element = arr[i];
      if (count[element]) {
        count[element]++;
      } else {
        count[element] = 1;
      }
    }

    // 카운트된 요소 중 가장 많이 중복된 요소 찾기
    let mostFrequentElement;
    let maxCount = 0;
    for (let key in count) {
      if (count[key] > maxCount) {
        mostFrequentElement = key;
        maxCount = count[key];
      }
    }

    return mostFrequentElement;
  }

  const endVote = () => {
    // setVoteResult(findMostFrequentElement(voteArr));
    chatSocket.emit("voteResult", {
      pickUser: findMostFrequentElement(voteArr),
      roomId: new URL(window.location.href).pathname.split("/").at(-1) ?? "",
    });
  };
  const voteReset = () => {
    chatSocket.emit("resetRanVote", {
      roomId: new URL(window.location.href).pathname.split("/").at(-1) ?? "",
    });
  };

  return (
    <>
      <GetPictureWrap playerStyle={playTarget !== "randompick"}>
        <GetPictureTitle>
          {!voteInfo && !voteResult && !isPicked && (
            <>
              <p style={{ marginTop: "5%", fontSize: "160%" }}>
                랜덤으로 한 명을 선택하시겠어요?
              </p>
              <button
                onClick={() => {
                  setIsPicked(true);
                }}
                style={{
                  marginTop: "15%",
                  fontSize: "140%",
                  color: "white",
                  border: "1px solid white",
                  backgroundColor: "transparent",
                }}
              >
                시작하기
              </button>
            </>
          )}
          {isPicked && (
            <>
              <p style={{ marginTop: "5%", fontSize: "160%" }}>
                랜덤으로 뽑을 사람들을 정해주세요
              </p>
              <div
                style={{
                  marginTop: "5%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "80%",
                  height: "50%",
                }}
              ></div>
              {allUser &&
                allUser[0].userarr
                  .filter((v: any) => v !== allUser[0].owner)
                  .map((k: any) => {
                    return (
                      <PicUser
                        pickedUser={ranPickUser.indexOf(k) === -1}
                        onClick={() => {
                          ranPickUser.indexOf(k) === -1
                            ? pickUser(k)
                            : setRanPickUser(
                                ranPickUser
                                  .slice()
                                  .splice(ranPickUser.indexOf(k), 1)
                              );
                        }}
                      >
                        {k}
                      </PicUser>
                    );
                  })}
              <button
                onClick={() => {
                  startVote();
                }}
                style={{
                  marginTop: "15%",
                  fontSize: "140%",
                  color: "white",
                  border: "1px solid white",
                  backgroundColor: "transparent",
                }}
              >
                시작하기
              </button>
            </>
          )}

          {voteResult && (
            <div style={{ marginTop: "5%", fontSize: "160%" }}>
              {voteResult} 가(이) 뽑혔습니다
            </div>
          )}
          {voteResult && (
            <button
              onClick={voteReset}
              style={{
                marginTop: "5%",
                fontSize: "160%",
                color: "white",
                border: "1px solid white",
                backgroundColor: "transparent",
              }}
            >
              초기화
            </button>
          )}
        </GetPictureTitle>

        <SizeButton onClick={sizeHandler}>닫기</SizeButton>
      </GetPictureWrap>
    </>
  );
};

export default RandomPick;
