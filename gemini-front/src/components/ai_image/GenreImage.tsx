import React, { FC, useState } from "react";
import { GenreSampleImageBox, GenreSampleImage } from "./AiSampleImage.styles";
import BoyManga from "../../assets/img/ai/BoyManga.png";
import GameGraphic from "../../assets/img/ai/GameGraphic.png";
import Illustration from "../../assets/img/ai/Illustration.png";
import Romance from "../../assets/img/ai/Romance.png";

const GenreImage: FC = () => {
  return (
    <>
      <GenreSampleImageBox>
        <GenreSampleImage src={Romance} alt="Romance" />
        <GenreSampleImage src={Illustration} alt="Illustration" />
        <GenreSampleImage src={GameGraphic} alt="GameGraphic" />
        <GenreSampleImage src={BoyManga} alt="BoyManga" />
      </GenreSampleImageBox>
    </>
  );
};

export default GenreImage;
