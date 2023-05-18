import React, { FC, useState } from "react";
import {
  EyeColorBox,
  EyeColorContainer,
  EyeColorImage,
  EyeColorText,
  PickedEyeColorContainer,
} from "./EyeColor.style";

interface Data {
  tagId: number;
  koreanName: string;
  imgUrl: string;
}

interface Props {
  data: Data[];
  handleEyeColor: (eyeColor: Data) => void;
}

const EyeColor: FC<Props> = ({ data, handleEyeColor }) => {
  const [pickedEye, setPickedEye] = useState<any>(null);
  const handleEyeColorClick = (item: Data) => {
    handleEyeColor({
      tagId: item.tagId,
      imgUrl: item.imgUrl,
      koreanName: item.koreanName,
    });
  };
  return (
    <>
      <EyeColorBox>
        {data?.map((item) =>
          pickedEye === item.koreanName ? (
            <PickedEyeColorContainer
              key={item.tagId}
              onClick={() => {
                handleEyeColorClick(item);
                setPickedEye(item.koreanName);
              }}
            >
              <EyeColorText>{item.koreanName}</EyeColorText>
              <EyeColorImage src={item.imgUrl} alt={item.koreanName} />
            </PickedEyeColorContainer>
          ) : (
            <EyeColorContainer
              key={item.tagId}
              onClick={() => {
                handleEyeColorClick(item);
                setPickedEye(item.koreanName);
              }}
            >
              <EyeColorText>{item.koreanName}</EyeColorText>
              <EyeColorImage src={item.imgUrl} alt={item.koreanName} />
            </EyeColorContainer>
          )
        )}
      </EyeColorBox>
    </>
  );
};

export default EyeColor;
