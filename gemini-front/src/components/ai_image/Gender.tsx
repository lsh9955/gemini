import React, { FC } from "react";
import {
  HairStyleBox,
  GenderContainer,
  HairStyleImage,
} from "./AiSampleImage.styles";

import Female from "../../assets/img/ai/gender/Female.png";
import Male from "../../assets/img/ai/gender/Male.png";

interface Gender {
  name: string;
  image: string;
  koreanName: string;
}

const genders: Gender[] = [
  { name: "girl", image: Female, koreanName: "여성" },
  { name: "boy", image: Male, koreanName: "남성" },
];

interface Props {
  handleGender: (Gender: {
    name: string;
    image: string;
    koreanName: string;
  }) => void;
}

const Gender: FC<Props> = ({ handleGender }) => {
  const handleGenderClick = (gender: Gender) => {
    handleGender({
      name: gender.name,
      image: gender.image,
      koreanName: gender.koreanName,
    });
  };
  return (
    <>
      <HairStyleBox>
        {genders.map((gender) => (
          <GenderContainer
            key={gender.name}
            onClick={() => handleGenderClick(gender)}
          >
            <HairStyleImage src={gender.image} alt={gender.name} />
          </GenderContainer>
        ))}
      </HairStyleBox>
    </>
  );
};

export default Gender;
