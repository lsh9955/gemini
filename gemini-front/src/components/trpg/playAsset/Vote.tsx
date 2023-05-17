import React, { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { GetPictureTitle, GetPictureWrap, SizeButton } from "./GetPictureStyle";
import { useSelector } from "react-redux";

const Vote = ({
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
  const [voteResult, setVoteResult] = useState<any>(null);
  useEffect(() => {
    if (!voteInfo) {
      setVoteArr([]);
      setIsvoted(false);
      setVoteResult(null);
    }
  }, [voteInfo]);

  useEffect(() => {
    chatSocket?.on("pickUserResponse", function (data: any) {
      console.log(data);
      setVoteArr((prev) => [...prev, data]);
    });
    chatSocket?.on("voteResultResponse", function (data: any) {
      setVoteResult(data);
    });
    return () => {
      chatSocket?.off("pickUserResponse");
      chatSocket?.off("voteResultResponse");
    };
  }, [chatSocket]);
  const sizeHandler = () => {
    playHandler("");
  };
  const inputRef = useRef<HTMLInputElement>(null);

  const startVote = () => {
    chatSocket?.emit("startVote", {
      roomId: new URL(window.location.href).pathname.split("/").at(-1) ?? "",
    });
  };
  const pickUser = (e: any) => {
    setIsvoted(true);
    console.log(e);
    chatSocket.emit("pickUser", {
      pickUser: e,
      roomId: new URL(window.location.href).pathname.split("/").at(-1) ?? "",
    });
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
    chatSocket.emit("resetVote", {
      roomId: new URL(window.location.href).pathname.split("/").at(-1) ?? "",
    });
  };

  return (
    <>
      <GetPictureWrap playerStyle={playTarget !== "vote"}>
        <GetPictureTitle>
          {!voteInfo && (
            <>
              <p style={{ marginTop: "5%", fontSize: "160%" }}>
                투표를 진행할까요?
              </p>
              <button
                onClick={startVote}
                style={{
                  marginTop: "5%",
                  fontSize: "140%",
                  color: "white",
                  border: "1px solid white",
                  backgroundColor: "transparent",
                  width: "auto",
                }}
              >
                시작하기
              </button>
            </>
          )}

          {voteInfo && !isVoted && voteInfo[0].owner !== userSeq.nickname && (
            <>
              <p style={{ marginTop: "5%", fontSize: "160%" }}>
                플레이어 한 명을 골라주세요
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "90%",
                  height: "60%",
                  flexWrap: "wrap",
                  fontSize: "140%",
                  color: "white",
                  marginTop: "4%",
                }}
              >
                {voteInfo[0].userarr
                  .filter((v: any) => v !== voteInfo[0].owner)
                  .map((v: any) => {
                    return (
                      <div
                        onClick={() => {
                          pickUser(v);
                        }}
                        style={{
                          color: "white",
                          fontSize: "140%",
                          fontWeight: "bold",
                          margin: "5%",
                          cursor: "pointer",
                        }}
                      >
                        {v}
                      </div>
                    );
                  })}
              </div>
            </>
          )}
          {voteInfo && isVoted && !voteResult && (
            <>
              <p style={{ marginTop: "5%", fontSize: "160%" }}>
                투표 진행 중입니다
              </p>
              <p style={{ fontSize: "160%" }}>잠시만 기다려주세요</p>
            </>
          )}

          {voteInfo &&
            voteInfo[0].owner === userSeq.nickname &&
            !voteResult && (
              <button
                onClick={() => {
                  endVote();
                }}
                style={{
                  marginTop: "5%",
                  fontSize: "160%",
                  color: "white",
                  border: "1px solid white",
                  backgroundColor: "transparent",
                }}
              >
                투표 종료
              </button>
            )}
          {voteResult && (
            <div style={{ marginTop: "5%", fontSize: "160%" }}>
              {voteResult} 가(이) 뽑혔습니다
            </div>
          )}
          {voteInfo && voteResult && voteInfo[0].owner === userSeq.nickname && (
            <button
              onClick={voteReset}
              style={{
                marginTop: "15%",
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

export default Vote;
