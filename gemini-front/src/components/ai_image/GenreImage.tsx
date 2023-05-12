import React, { FC } from "react";

import BoyManga from "../../assets/img/ai/BoyManga.png";
import GameGraphic from "../../assets/img/ai/GameGraphic.png";
import Illustration from "../../assets/img/ai/Illustration.png";

import {
  GenreSampleImageBox,
  GenreSampleImage,
  GenreSampleImageLock,
} from "./GenreImage.style";

interface Data {
  tagId: number;
  koreanName: string;
  imgUrl: string;
}

interface Props {
  data: Data[];
  handleGenre: (genre: Data) => void;
}

const GenreImage: FC<Props> = ({ data, handleGenre }) => {
  const handleGenreClick = (item: Data) => {
    handleGenre({
      tagId: item.tagId,
      imgUrl: item.imgUrl,
      koreanName: item.koreanName,
    });
  };
  return (
    <>
      <GenreSampleImageBox>
        {data
          ?.filter((item: any) => item.tagId === 1)
          .map((item) => {
            return (
              <GenreSampleImage
                key={item.tagId}
                src={item.imgUrl}
                alt={item.koreanName}
                onClick={() => handleGenreClick(item)}
              />
            );
          })}
        <GenreSampleImageLock src={Illustration} alt="Illustration" />
        <GenreSampleImageLock src={GameGraphic} alt="GameGraphic" />
        <GenreSampleImageLock src={BoyManga} alt="BoyManga" />
      </GenreSampleImageBox>
    </>
  );
};

export default GenreImage;
