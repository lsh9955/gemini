import React from "react";
import {
  AddBackground,
  Dice,
  Music,
  Photo,
  PlayBarWrap,
  Randompick,
  Vote,
} from "./PlayBarStyle";
import dice from "../../assets/img/dice.svg";
import music from "../../assets/img/music.svg";
import photo from "../../assets/img/photo.svg";
import randompick from "../../assets/img/randompick.svg";
import vote from "../../assets/img/vote.svg";
import addBackground from "../../assets/img/addBackground.svg";

const PlayBar = ({ playHandler }: { playHandler: any }) => {
  return (
    <PlayBarWrap>
      <AddBackground
        src={addBackground}
        onClick={() => {
          playHandler("addBackground");
        }}
      />
      <Dice
        src={dice}
        onClick={() => {
          playHandler("dice");
        }}
      />
      <Music
        src={music}
        onClick={() => {
          playHandler("music");
        }}
      />
      <Vote
        src={vote}
        onClick={() => {
          playHandler("vote");
        }}
      />
      <Randompick
        src={randompick}
        onClick={() => {
          playHandler("randompick");
        }}
      />
      <Photo
        src={photo}
        onClick={() => {
          playHandler("photo");
        }}
      />
    </PlayBarWrap>
  );
};

export default PlayBar;
