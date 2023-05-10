import React, { useState, useRef } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import {
  MusicInput,
  MusicTitle,
  MusicWrap,
  SizeButton,
} from "./MusicPlayerStyle";

const MusicPlayer = ({
  playTarget,
  playHandler,
}: {
  playTarget: any;
  playHandler: any;
}) => {
  const [inputURL, setInputURL] = useState<string>("");
  const [playerStyle, setPlayerStyle] = useState<boolean>(false);
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "200",
    width: "350",
    playerVars: {
      // https://developers.google.com/youtube/AIzaSyC7AAmkoIgAxFoTnOPl2dFMJO7QfLGbHvQ
      autoplay: 1,
    },
  };
  const inputHandler = (e: any) => {
    const inputArr = e.target.value.split("&");
    let videoId = "";
    for (let i = 0; i < inputArr.length; i++) {
      if (inputArr[i].indexOf("v=") !== -1) {
        videoId = inputArr[i].split("v=")[1];
        break;
      }
    }
    setInputURL(videoId);
  };

  const sizeHandler = () => {
    playHandler("");
  };
  return (
    <MusicWrap playerStyle={playTarget !== "music"}>
      <MusicTitle>노래 URL을 넣어주세요</MusicTitle>
      <MusicInput onChange={inputHandler} />
      <YouTube
        videoId={inputURL}
        opts={opts}
        onReady={onPlayerReady}
        style={{ display: `${!inputURL ? "none" : ""}` }}
      />
      <SizeButton onClick={sizeHandler}>플레이어 최소화</SizeButton>
    </MusicWrap>
  );
};

export default MusicPlayer;
