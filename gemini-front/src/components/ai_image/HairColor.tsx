import React, { FC, useState } from "react";
import {
  HairColorBox,
  HairColorContainer,
  HairColorImage,
  HairColorText,
  PickedHairColorContainer,
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
  const [pickColor, setPickColor] = useState<any>(null);
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
        {data?.map((item) =>
          pickColor === item.koreanName ? (
            <PickedHairColorContainer
              key={item.tagId}
              onClick={() => {
                handleHairColorClick(item);
                setPickColor(item.koreanName);
              }}
            >
              <HairColorText>{item.koreanName}</HairColorText>
              <HairColorImage src={item.imgUrl} alt={item.koreanName} />
            </PickedHairColorContainer>
          ) : (
            <HairColorContainer
              key={item.tagId}
              onClick={() => {
                handleHairColorClick(item);
                setPickColor(item.koreanName);
              }}
            >
              <HairColorText>{item.koreanName}</HairColorText>
              <HairColorImage src={item.imgUrl} alt={item.koreanName} />
            </HairColorContainer>
          )
        )}
      </HairColorBox>
    </>
  );
};

export default HairColor;
