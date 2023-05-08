import React, { FC } from "react";
import {
  HairStyleBox,
  HairContainer,
  HairStyleImage,
} from "./AiSampleImage.styles";

import LongCur from "../../assets/img/ai/hair/LongCur.png";
import LongLowTwintail from "../../assets/img/ai/hair/LongLowTwintail.png";
import LongOneEyeCover from "../../assets/img/ai/hair/LongOneEyeCover.png";
import LongPonytail from "../../assets/img/ai/hair/LongPonytail.png";
import LongStraight from "../../assets/img/ai/hair/LongStraight.png";
import LongTwinBraides from "../../assets/img/ai/hair/LongTwinBraides.png";
import LongTwintail from "../../assets/img/ai/hair/LongTwintail.png";
import ShortCur from "../../assets/img/ai/hair/ShortCur.png";
import ShortMessy from "../../assets/img/ai/hair/ShortMessy.png";
import ShortOneEyeCover from "../../assets/img/ai/hair/ShortOneEyeCover.png";

interface HairStyle {
  name: string;
  image: string;
  koreanName: string;
  hairlength: string;
  hairstyle: string;
}

const hairStyles: HairStyle[] = [
  {
    name: "LongStraight",
    image: LongStraight,
    koreanName: "긴 생머리",
    hairlength: "long",
    hairstyle: "straight hair",
  },
  {
    name: "LongOneEyeCover",
    image: LongOneEyeCover,
    koreanName: "한 쪽 눈 가린 긴머리",
    hairlength: "long",
    hairstyle: "one eye cover hair",
  },
  {
    name: "LongCur",
    image: LongCur,
    koreanName: "긴 곱슬머리",
    hairlength: "long",
    hairstyle: "cur hair",
  },
  {
    name: "LongPonytail",
    image: LongPonytail,
    koreanName: "포니테일 긴머리",
    hairlength: "long",
    hairstyle: "pony tail",
  },
  {
    name: "LongTwintail",
    image: LongTwintail,
    koreanName: "트윈테일 긴머리",
    hairlength: "long",
    hairstyle: "twin tail",
  },
  {
    name: "LongLowTwintail",
    image: LongLowTwintail,
    koreanName: "낮은 트윈테일 긴머리",
    hairlength: "long",
    hairstyle: "low twin tail",
  },
  {
    name: "LongTwinBraides",
    image: LongTwinBraides,
    koreanName: "양갈래 땋은 머리",
    hairlength: "long",
    hairstyle: "twin braides",
  },
  {
    name: "ShortOneEyeCover",
    image: ShortOneEyeCover,
    koreanName: "한 쪽 눈 가린 짧은머리",
    hairlength: "short",
    hairstyle: "one eye cover hair",
  },
  {
    name: "ShortMessy",
    image: ShortMessy,
    koreanName: "헝클어진 짧은머리",
    hairlength: "short",
    hairstyle: "messy hair",
  },
  {
    name: "ShortCur",
    image: ShortCur,
    koreanName: "짧은 곱슬머리",
    hairlength: "short",
    hairstyle: "cur hair",
  },
];

interface Props {
  handleHairStyle: (HairStyle: {
    name: string;
    koreanName: string;
    hairlength: string;
    hairstyle: string;
  }) => void;
}

const HairStyle: FC<Props> = ({ handleHairStyle }) => {
  const handleHairStyleClick = (hairStyle: HairStyle) => {
    handleHairStyle({
      name: hairStyle.name,
      koreanName: hairStyle.koreanName,
      hairlength: hairStyle.hairlength,
      hairstyle: hairStyle.hairstyle,
    });
  };
  return (
    <>
      <HairStyleBox>
        {hairStyles.map((hairStyle) => (
          <HairContainer
            key={hairStyle.name}
            onClick={() => handleHairStyleClick(hairStyle)}
          >
            <HairStyleImage src={hairStyle.image} alt={hairStyle.name} />
          </HairContainer>
        ))}
      </HairStyleBox>
    </>
  );
};

export default HairStyle;
