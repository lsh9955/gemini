import React, { FC, useState, useEffect } from "react";
import GenreImage from "../../components/ai_image/GenreImage";
import HairColor from "../../components/ai_image/HairColor";
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
  // 장르 변수(axios할 때 값으로 넘겨줄 수 있음)
  const [genre, setGenre] = useState("");

  // GenreImage 컴포넌트 보이기/숨기기 상태값
  const [showGenreImage, setShowGenreImage] = useState(false);

  // GenreSelectBox 클릭 시 GenreImage 컴포넌트 보이게 설정
  const handleGenreSelectBoxClick = () => {
    setShowHairColor(false);
    setShowGenreImage(true);
  };

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

  /////////////////////////////////////////////////////////////////////

  // 헤어컬러 변수(axios할 때 값으로 넘겨줄 수 있음)
  const [hairColor, setHairColor] = useState("");

  // 헤어 컬러 컴포넌트 보이기/숨기기 상태값
  const [showHairColor, setShowHairColor] = useState(false);

  // 헤어 컬러 옵션 박스 선택시에 샘플 컬러가 보이게 함
  const handleHairColorSelectBoxClick = () => {
    setShowGenreImage(false);
    setShowHairColor(true);
  };

  const handleHairColor = (color: string) => {
    setHairColor(color);
    console.log("헤어컬러 전달");
  };

  // 헤어컬러의 p 태그 내용을 변경하기 위한 상태값
  const [selectHairColor, setSelectHairColor] =
    useState("머리카락 색상을 선택해주세요");

  // genre 값이 변경되면 GenreSelectBox의 p 태그 내용도 변경되도록 설정
  useEffect(() => {
    switch (hairColor) {
      case "White":
        setSelectHairColor("흰색");
        break;
      case "Grey":
        setSelectHairColor("회색");
        break;
      case "Black":
        setSelectHairColor("검정색");
        break;
      case "Brown":
        setSelectHairColor("갈색");
        break;
      case "Orange":
        setSelectHairColor("주황색");
        break;
      case "Gold":
        setSelectHairColor("황금색");
        break;
      case "Red":
        setSelectHairColor("빨간색");
        break;
      case "Pink":
        setSelectHairColor("분홍색");
        break;
      case "Puple":
        setSelectHairColor("보라색");
        break;
      case "Blue":
        setSelectHairColor("파란색");
        break;
      case "Green":
        setSelectHairColor("초록색");
        break;
      case "Yellow":
        setSelectHairColor("노란색");
        break;
      default:
        setSelectHairColor("머리카락 색상을 선택해주세요");
        break;
    }
  }, [hairColor]);

  /////////////////////////////////////////////////////////////////////

  // 눈동자컬러 변수(axios할 때 값으로 넘겨줄 수 있음)
  const [eyeColor, setEyeColor] = useState("");

  return (
    <>
      <AiWrapper>
        <AiSelectWrapper>
          <AiSelectTitle>장르</AiSelectTitle>
          <GenreSelectBox onClick={handleGenreSelectBoxClick}>
            <p>{selectBoxText}</p>
          </GenreSelectBox>

          <AiSelectTitle>헤어 컬러</AiSelectTitle>
          <GenreSelectBox onClick={handleHairColorSelectBoxClick}>
            <p>{selectHairColor}</p>
          </GenreSelectBox>
        </AiSelectWrapper>

        <AiSampleWrapper>
          <AiCreateButton>제미니 생성하기</AiCreateButton>
          <AiSampleBox>
            {showGenreImage && <GenreImage handleGenre={handleGenre} />}
            {showHairColor && <HairColor handleHairColor={handleHairColor} />}
          </AiSampleBox>
        </AiSampleWrapper>
      </AiWrapper>
    </>
  );
};

export default AiImage;
