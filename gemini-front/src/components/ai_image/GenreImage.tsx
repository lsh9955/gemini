import React, { FC, useState } from "react";
import {
  GenreSampleImageBox,
  GenreSampleImage,
  GenreSampleImageLock,
} from "./AiSampleImage.styles";
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
