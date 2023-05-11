import React, { FC, useEffect } from "react";
import axios from "axios";
import {
  GenreSampleImageBox,
  GenreSampleImage,
  GenreSampleImageLock,
} from "./GenreImage.style";
import BoyManga from "../../assets/img/ai/BoyManga.png";
import GameGraphic from "../../assets/img/ai/GameGraphic.png";
import Illustration from "../../assets/img/ai/Illustration.png";
import Romance from "../../assets/img/ai/Romance.png";

interface Props {
  handleGenre: (genre: string) => void;
}

const GenreImage: FC<Props> = ({ handleGenre }) => {
  const handleImageClick = (genre: string) => {
    handleGenre(genre);
  };

  const headers = {
    "X-Username": "google_109918724409380589068",
  };

  // 장르 이미지 DB에서 가져오기
  const GetGenre = () => {
    // 제미니 생성 post axios 하고 백서버에선 별개수를 반환해준다.
    // axios 성공시에 아래 성공 모달을 집어 넣는다. 그리고 반환된 별개수를 리덕스에 저장한다.
    axios
      .get("http://192.168.31.73:8081/user-service/gemini/1", {
        headers,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetGenre();
  }, []);

  return (
    <>
      <GenreSampleImageBox>
        <GenreSampleImage
          src={Romance}
          alt="Romance"
          onClick={() => handleImageClick("Romance")}
        />
        <GenreSampleImageLock src={Illustration} alt="Illustration" />
        <GenreSampleImageLock src={GameGraphic} alt="GameGraphic" />
        <GenreSampleImageLock src={BoyManga} alt="BoyManga" />
      </GenreSampleImageBox>
    </>
  );
};

export default GenreImage;
