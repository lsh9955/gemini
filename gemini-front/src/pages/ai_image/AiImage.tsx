import React, { FC, useState, useEffect } from "react";
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

  // 장르 변수
  const [genre, setGenre] = useState("");

  const handleGenre = (genre: string) => {
    setGenre(genre);
    console.log("장르 전달");
  };

  // GenreSelectBox의 p 태그 내용을 변경하기 위한 상태값
  const [selectBoxText, setSelectBoxText] = useState("장르를 선택해주세요");

  // genre 값이 변경되면 GenreSelectBox의 p 태그 내용도 변경되도록 설정
  useEffect(() => {
    switch (genre) {
      case "Romance":
        setSelectBoxText("로맨스 판타지");
        break;
      default:
        setSelectBoxText("장르를 선택해주세요");
        break;
    }
  }, [genre]);

  return (
    <>
      <AiWrapper>
        <AiSelectWrapper>
          <AiSelectTitle>장르</AiSelectTitle>
          <GenreSelectBox onClick={handleGenreSelectBoxClick}>
            <p>{selectBoxText}</p>
          </GenreSelectBox>
        </AiSelectWrapper>
        <AiSampleWrapper>
          <AiCreateButton>제미니 생성하기</AiCreateButton>
          <AiSampleBox>
            {showGenreImage && <GenreImage handleGenre={handleGenre} />}
          </AiSampleBox>
        </AiSampleWrapper>
      </AiWrapper>
    </>
  );
};

export default AiImage;
