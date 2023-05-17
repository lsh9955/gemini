import React from "react";
import {
  AddBackground,
  AddBackgroundWrap,
  Dice,
  DiceWrap,
  ExitWrap,
  Music,
  MusicWrap,
  Photo,
  PhotoWrap,
  PlayBarWrap,
  Randompick,
  RandompickWrap,
  Vote,
  VoteWrap,
} from "./PlayBarStyle";
import dice from "../../../assets/img/dice.svg";
import music from "../../../assets/img/music.svg";
import photo from "../../../assets/img/photo.svg";
import randompick from "../../../assets/img/randompick.svg";
import vote from "../../../assets/img/vote.svg";
import addBackground from "../../../assets/img/addBackground.svg";
import exit from "../../../assets/img/exit.svg";
import { useHistory } from "react-router-dom";

const PlayBar = ({ playHandler }: { playHandler: any }) => {
  const history = useHistory();
  return (
    <PlayBarWrap>
      {/* <AddBackground
        src={addBackground}
        onClick={() => {
          playHandler("addBackground");
        }}
      /> */}
      {/* <Dice
        src={dice}
        onClick={() => {
          playHandler("dice");
        }}
      />
       */}
      {/* 
      <Music
        src={music}
        onClick={() => {
          playHandler("music");
        }}
      /> */}
      {/* <Vote
        src={vote}
        onClick={() => {
          playHandler("vote");
        }}
      /> */}
      {/* <Randompick
        src={randompick}
        onClick={() => {
          playHandler("randompick");
        }}
      /> */}
      {/* <Photo
        src={photo}
        onClick={() => {
          playHandler("photo");
        }}
      /> */}

      <AddBackgroundWrap
        onClick={() => {
          playHandler("addBackground");
        }}
      >
        <img src={addBackground} alt="" />
        <div>배경 설정</div>
      </AddBackgroundWrap>

      <DiceWrap
        onClick={() => {
          playHandler("dice");
        }}
      >
        <img src={dice} alt="" />
        <div>주사위</div>
        <div>굴리기</div>
      </DiceWrap>

      <MusicWrap
        onClick={() => {
          playHandler("music");
        }}
      >
        <img src={music} alt="" />
        <div>배경음악</div>
      </MusicWrap>
      <VoteWrap
        onClick={() => {
          playHandler("vote");
        }}
      >
        <img src={vote} alt="" />
        <div>투표하기</div>
      </VoteWrap>
      <RandompickWrap
        onClick={() => {
          playHandler("randompick");
        }}
      >
        <img src={randompick} alt="" />
        <div>랜덤픽</div>
      </RandompickWrap>
      <PhotoWrap
        onClick={() => {
          playHandler("photo");
        }}
      >
        <img src={photo} alt="" />
        <div>인생네컷</div>
      </PhotoWrap>
      <ExitWrap
        onClick={() => {
          history.push("/");
        }}
      >
        <img src={exit} alt="" />
        <div>나가기</div>
      </ExitWrap>
    </PlayBarWrap>
  );
};

export default PlayBar;
