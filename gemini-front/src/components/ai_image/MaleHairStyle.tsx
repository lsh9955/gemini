import React, { FC } from "react";
import {
  MaleHairStyleBox,
  MaleHairStyleContainer,
  MaleHairStyleImage,
  MaleHairStyleText,
} from "./MaleHairStyle.style";

interface Data {
  tagId: number;
  koreanName: string;
  imgUrl: string;
}

interface Props {
  data: Data[];
  handleMaleHairStyle: (maleHairStyle: Data) => void;
}

const MaleHairStyle: FC<Props> = ({ data, handleMaleHairStyle }) => {
  const handleMaleHairStyleClick = (item: Data) => {
    handleMaleHairStyle({
      tagId: item.tagId,
      imgUrl: item.imgUrl,
      koreanName: item.koreanName,
    });
  };

  return (
    <>
      <MaleHairStyleBox>
        {data?.map((item) => (
          <MaleHairStyleContainer
            key={item.tagId}
            onClick={() => handleMaleHairStyleClick(item)}
          >
            <MaleHairStyleText>{item.koreanName}</MaleHairStyleText>
            <MaleHairStyleImage src={item.imgUrl} alt={item.koreanName} />
          </MaleHairStyleContainer>
        ))}
      </MaleHairStyleBox>
    </>
  );
};

export default MaleHairStyle;
