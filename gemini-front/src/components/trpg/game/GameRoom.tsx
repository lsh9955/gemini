import React, { useEffect, useState } from "react";
import axios from "axios";
import io, { Socket } from "socket.io-client";
import ChatPage from "../chat/ChatPage";
import GetPicture from "../playAsset/GetPicture";
import PlayBar from "../playAsset/PlayBar";
import { ChatScreen, GameScreen, RoomWrap } from "./GameRoomStyle";
import { BASE_URL } from "../config";
import Dialogue from "../dialogue/Dialogue";
import GroundMain from "../groundMain/GroundMain";
import MusicPlayer from "../playAsset/MusicPlayer";
import DiceRoller from "../playAsset/DiceRoller";
import { useSelector } from "react-redux";
import Vote from "../playAsset/Vote";
import RandomPick from "../playAsset/RandomPick";
import CharacterChoose from "../playAsset/CharacterChoose";
import FourPicture from "../playAsset/FourPicture";
const GameRoom = ({ chatSocket }: { chatSocket: Socket }) => {
  const userSeq = useSelector((state: any) => state.user);
  const userN = userSeq.nickname;
  const [userList, setUserList] = useState<Array<string>>([]);
  const [chatList, setChatList] = useState<string[]>([]);
  const [createPicList, setCreatePicList] = useState<string[]>([]);
  const [msg, setMsg] = useState<any>({});
  const [msgData, setMsgData] = useState<object[]>([]);
  const [gameMsg, setGameMsg] = useState<object[]>([]);
  const [playTarget, setPlayTarget] = useState<string>("pickUserImg");
  const [voteInfo, setVoteInfo] = useState<any>(null);
  const [musicURL, setMusicURL] = useState<string>("");
  const [diceNum, setDiceNum] = useState<number>(-1);
  const [pickUserImg, SetPickUserImg] = useState<any>(null);
  const [alarmList, setAlarmList] = useState<any>(null);
  const [changeBg, setChangeBg] = useState<any>(null);
  const [fourpi, setFourPi] = useState(null);
  //알림 받기

  useEffect(() => {
    // 현재는 유저정보를 랜덤으로 하고 있지만, 추후 생성시 json형태로 emit에 넣을것
    chatSocket?.emit("join", {
      user: String(userN),
      roomId: new URL(window.location.href).pathname.split("/").at(-1) ?? "",
    });
    chatSocket?.on("join", function (data: any) {
      setUserList([...userList, data.user]);
    });

    chatSocket?.on("chat", function (data: any) {
      setChatList((prev) => [...prev, data]);
    });

    chatSocket?.on("picCreateResponse", function (data: any) {
      setCreatePicList([...createPicList, data.createPicture]);
    });

    chatSocket?.on("allroomchange", (data: any) => {
      console.log("방 목록 정보 바뀜");
      const res = async () => {
        const getRoomInfo = await axios.get(`https://mygemini.co.kr/node/room`);
        const nowURL = new URL(window.location.href).pathname.split("/").at(-1);

        setUserList(
          getRoomInfo.data.room.filter((v: any) => v._id === nowURL)[0].userarr
        );
      };
      res();
    });
    chatSocket?.on("messageResponse", (data: any) => {
      if (data.type === "룸 채팅") {
        setGameMsg((prev) => [...prev, data]);
      }
      setMsgData((prev) => [...prev, data]);

      setMsg(data);
    });

    chatSocket?.on("voteResponse", function (data: any) {
      setPlayTarget("vote");
      setVoteInfo(data);
    });

    chatSocket?.on("musicPlayResponse", function (data: any) {
      setMusicURL(data);
      setPlayTarget("music");
    });

    chatSocket?.on("diceRollResponse", function (data: any) {
      setDiceNum(data);
      setPlayTarget("dice");
    });
    chatSocket?.on("changeBgImgResponse", function (data: any) {
      setChangeBg(data);
    });
    chatSocket?.on("makeFourPicResponse", function (data: any) {
      setFourPi(data);
    });

    return () => {
      chatSocket?.off("join");
      chatSocket?.off("chat");
      chatSocket?.off("roomupdate");
      chatSocket?.off("allroomchange");
      chatSocket?.off("messageResponse");
      chatSocket?.off("voteResponse");
      chatSocket?.off("musicPlayResponse");
      chatSocket?.off("diceRollResponse");
      chatSocket?.off("changeBgImgResponse");
      chatSocket?.off("makeFourPicResponse");
    };
  }, [chatSocket]);

  // useEffect(() => {
  //   if (msg.type === "룸 채팅") {
  //     setGameMsg([...gameMsg, msg]);
  //   }
  //   setMsgData((prev) => [...prev, msg]);
  //   console.log(gameMsg, msg);
  // }, [msg]);

  useEffect(() => {
    const getUserImgs = async () => {
      const response = await axios.get(
        //개발시
        // "http://localhost:8081/user-service/gallery/mygeminis",
        //배포시
        "https://mygemini.co.kr/user-service/gallery/mygeminis",
        {
          headers: {
            Accept: "*/*",
            // 배포시
            Authorization: window.localStorage.getItem("accessToken"),
            //개발시
            // "X-Username": "google_104917137836848256614",
          },
          params: {
            page: 0,
            size: 999,
          },
        }
      );

      console.log(response.data.geminiPage.content);
      SetPickUserImg(response.data.geminiPage.content);
    };
    getUserImgs();
  }, []);

  const playHandler = (e: string) => {
    setPlayTarget(e);
  };
  const diceReset = () => {
    setDiceNum(-1);
  };

  useEffect(() => {
    if (playTarget === "randompick") {
      chatSocket?.emit("startRanPick", {
        roomId: new URL(window.location.href).pathname.split("/").at(-1) ?? "",
      });
    }
  }, [playTarget]);

  return (
    <RoomWrap bgimg={changeBg}>
      <GameScreen>
        <PlayBar playHandler={playHandler} />
        <GroundMain />
        <Dialogue gameMsg={gameMsg} />
      </GameScreen>
      <ChatScreen>
        <ChatPage
          chatSocket={chatSocket}
          messages={msgData}
          userList={userList}
        />
      </ChatScreen>
      {/* 
      <a href="/room" id="exit-btn">
        방 나가기
      </a>
      <div>유저리스트</div>
      <div>
        {userList.map((v, i) => {
          return <div key={i}>{v}</div>;
        })}
      </div> */}
      {/* {userList.map((v, i) => {
        return <div key={i}>{v}</div>;
      })} */}
      <MusicPlayer
        chatSocket={chatSocket}
        playTarget={playTarget}
        playHandler={playHandler}
        musicURL={musicURL}
      />
      <DiceRoller
        chatSocket={chatSocket}
        playTarget={playTarget}
        playHandler={playHandler}
        diceNum={diceNum}
        diceReset={diceReset}
      />
      <GetPicture
        playTarget={playTarget}
        playHandler={playHandler}
        chatSocket={chatSocket}
      />
      <Vote
        playTarget={playTarget}
        playHandler={playHandler}
        chatSocket={chatSocket}
        voteInfo={voteInfo}
      />
      <RandomPick
        playTarget={playTarget}
        playHandler={playHandler}
        chatSocket={chatSocket}
        voteInfo={voteInfo}
      />
      <CharacterChoose
        playTarget={playTarget}
        playHandler={playHandler}
        chatSocket={chatSocket}
        pickUserImg={pickUserImg}
      />
      <FourPicture
        playTarget={playTarget}
        playHandler={playHandler}
        chatSocket={chatSocket}
        fourpi={fourpi}
        bgimg={changeBg}
      />
    </RoomWrap>
  );
};

export default GameRoom;
