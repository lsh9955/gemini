import React, { FC } from "react";
import {
  HairColorBox,
  HairColorContainer,
  HairColorImage,
} from "./HairColor.style";

interface Data {
  tagId: number;
  koreanName: string;
  imgUrl: string;
}

interface Props {
  data: Data[];
  handleHairColor: (hairColor: Data) => void;
}

const HairColor: FC<Props> = ({ data, handleHairColor }) => {
  const handleHairColorClick = (item: Data) => {
    handleHairColor({
      tagId: item.tagId,
      imgUrl: item.imgUrl,
      koreanName: item.koreanName,
    });
  };
  return (
    <>
      <HairColorBox>
        {data?.map((item) => (
          <HairColorContainer
            key={item.tagId}
            onClick={() => handleHairColorClick(item)}
          >
            <HairColorImage src={item.imgUrl} alt={item.koreanName} />
          </HairColorContainer>
        ))}
      </HairColorBox>
    </>
  );
};

export default HairColor;
