import React, { FC, useState } from "react";
import {
  GenderBox,
  GenderContainer,
  GenderImage,
  GenderText,
  PickedGenderContainer,
} from "./Gender.style";

// import Female from "../../assets/img/ai/gender/Female.png";
// import Male from "../../assets/img/ai/gender/Male.png";

// interface Gender {
//   name: string;
//   image: string;
//   koreanName: string;
// }

// const genders: Gender[] = [
//   { name: "girl", image: Female, koreanName: "여성" },
//   { name: "boy", image: Male, koreanName: "남성" },
// ];

// interface Props {
//   handleGender: (Gender: {
//     name: string;
//     image: string;
//     koreanName: string;
//   }) => void;
// }

interface Data {
  tagId: number;
  koreanName: string;
  imgUrl: string;
}

interface Props {
  data: Data[];
  handleGender: (gender: Data) => void;
}

const Gender: FC<Props> = ({ data, handleGender }) => {
  const [genClick, setGenClick] = useState<any>(null);
  const handleGenderClick = (item: Data) => {
    handleGender({
      tagId: item.tagId,
      imgUrl: item.imgUrl,
      koreanName: item.koreanName,
    });
  };
  return (
    <>
      <GenderBox>
        {data?.map((item) =>
          genClick === item.koreanName ? (
            <PickedGenderContainer
              key={item.tagId}
              onClick={() => {
                handleGenderClick(item);

                setGenClick(item.koreanName);
              }}
            >
              <GenderText>{item.koreanName}</GenderText>
              <GenderImage src={item.imgUrl} alt={item.koreanName} />
            </PickedGenderContainer>
          ) : (
            <GenderContainer
              key={item.tagId}
              onClick={() => {
                handleGenderClick(item);

                setGenClick(item.koreanName);
              }}
            >
              <GenderText>{item.koreanName}</GenderText>
              <GenderImage src={item.imgUrl} alt={item.koreanName} />
            </GenderContainer>
          )
        )}
      </GenderBox>
    </>
  );
};

export default Gender;
