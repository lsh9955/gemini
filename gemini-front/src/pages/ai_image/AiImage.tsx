import React, { FC, useState } from "react";
import GenreImage from "../../components/ai_image/GenreImage";
import {
  AiWrapper,
  AiSelectWrapper,
  AiSampleWrapper,
  GenreSelectBox,
  AiSelectTitle,
  AiCreateButton,
  AiSampleBox,
} from "./AiImage.styles";

const AiImage: FC = () => {
  // GenreImage 컴포넌트 보이기/숨기기 상태값
  const [showGenreImage, setShowGenreImage] = useState(false);

  // GenreSelectBox 클릭 시 GenreImage 컴포넌트 보이게 설정
  const handleGenreSelectBoxClick = () => {
    setShowGenreImage(true);
  };

  return (
    <>
      <AiWrapper>
        <AiSelectWrapper>
          <AiSelectTitle>장르</AiSelectTitle>
          <GenreSelectBox onClick={handleGenreSelectBoxClick}>
            <p>장르를 선택해주세요</p>
          </GenreSelectBox>
        </AiSelectWrapper>
        <AiSampleWrapper>
          <AiCreateButton>제미니 생성하기</AiCreateButton>
          <AiSampleBox>{showGenreImage && <GenreImage />}</AiSampleBox>
        </AiSampleWrapper>
      </AiWrapper>
    </>
  );
};

export default AiImage;
