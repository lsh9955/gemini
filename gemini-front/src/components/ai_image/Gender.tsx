import React, { FC } from "react";
import { GenderBox, GenderContainer, GenderImage } from "./Gender.style";

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
      <GenderBox>
        {genders.map((gender) => (
          <GenderContainer
            key={gender.name}
            onClick={() => handleGenderClick(gender)}
          >
            <GenderImage src={gender.image} alt={gender.name} />
          </GenderContainer>
        ))}
      </GenderBox>
    </>
  );
};

export default Gender;
