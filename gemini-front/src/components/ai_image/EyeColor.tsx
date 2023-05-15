import React, { FC } from "react";
import {
  EyeColorBox,
  EyeColorContainer,
  EyeColorImage,
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
        {data?.map((item) => (
          <EyeColorContainer
            key={item.tagId}
            onClick={() => handleEyeColorClick(item)}
          >
            <EyeColorImage src={item.imgUrl} alt={item.koreanName} />
          </EyeColorContainer>
        ))}
      </EyeColorBox>
    </>
  );
};

export default EyeColor;
