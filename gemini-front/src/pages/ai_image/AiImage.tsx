import React, { FC, useState, useEffect } from "react";
import GenreImage from "../../components/ai_image/GenreImage";
import ColorSelect from "../../components/ai_image/ColorSelect";
import HairStyle from "../../components/ai_image/HairStyle";
import Preset from "../../components/ai_image/Preset";
import Gender from "../../components/ai_image/Gender";
import Emotion from "../../components/ai_image/Emotion";
import Costume from "../../components/ai_image/Costume";

import {
  Background,
  AiWrapper,
  AiSelectWrapper,
  AiSampleWrapper,
  GenreSelectBox,
  AiSelectTitle,
  AiCreateButton,
  AiSampleBox,
  NoneSampleBox,
} from "./AiImage.styles";
import MakeGeminiModal from "../../components/ai_image/modal/MakeGeminiModal";

const AiImage: FC = () => {
  // 요소가 아무것도 없을 때 빈 박스를 보여줌
  const [showNoneBox, setShowNoneBox] = useState(true);

  // 장르 변수(axios할 때 값으로 넘겨줄 수 있음)
  const [genre, setGenre] = useState("");

  // GenreImage 컴포넌트 보이기/숨기기 상태값
  const [showGenreImage, setShowGenreImage] = useState(false);

  // GenreSelectBox 클릭 시 GenreImage 컴포넌트 보이게 설정
  const handleGenreSelectBoxClick = () => {
    setShowNoneBox(false);
    setShowColor(false);
    setShowHairStyle(false);
    setShowPreset(false);
    setShowGender(false);
    setShowEmotion(false);
    setShowCostume(false);
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

  const [parentId, setParentId] = useState("");
  // 헤어
  // 헤어컬러 변수(axios할 때 값으로 넘겨줄 수 있음)
  const [hairColor, setHairColor] = useState("");
  const [harirColorKorean, setHairColorKorean] =
    useState("머리카락 색상을 선택해주세요");

  // 눈
  // 눈동자컬러 변수(axios할 때 값으로 넘겨줄 수 있음)
  const [eyeColor, setEyeColor] = useState("");
  const [eyeColorKorean, setEyeColorKorean] =
    useState("눈동자 색상을 선택해주세요");

  // 자식 컴포에서 보내주는 컬러값을 받을 수 있음
  const handleColor = (
    color: { name: string; koreanName: string },
    parentId: string
  ) => {
    if (parentId === "hair") {
      setHairColor(color.name);
      setHairColorKorean(color.koreanName);
      console.log("머리카락 색 전달");
    } else if (parentId === "eye") {
      setEyeColor(color.name);
      setEyeColorKorean(color.koreanName);
      console.log("눈동자 색 전달");
    }
  };

  // 헤어 컬러 컴포넌트 보이기/숨기기 상태값
  const [showColor, setShowColor] = useState(false);

  // 헤어 컬러 옵션 박스 선택시에 샘플 컬러가 보이게 함
  const handleHairColorSelectBoxClick = () => {
    setShowNoneBox(false);
    setShowGenreImage(false);
    setShowPreset(false);
    setShowHairStyle(false);
    setShowGender(false);
    setShowEmotion(false);
    setShowCostume(false);
    setShowColor(true);
    setParentId("hair");
  };

  const handleEyeColorSelectBoxClick = () => {
    setShowNoneBox(false);
    setShowGenreImage(false);
    setShowPreset(false);
    setShowHairStyle(false);
    setShowGender(false);
    setShowEmotion(false);
    setShowCostume(false);
    setShowColor(true);
    setParentId("eye");
  };

  // 헤어 스타일 컴포넌트 보이기/숨기기 상태값
  const [showHairStyle, setShowHairStyle] = useState(false);
  // 프롬프트 헤어스타일
  const [hairStyle, setHairStyle] = useState("");
  // 헤어 길이
  const [hairLength, setHairLength] = useState("");
  // 헤어스타일 한국어
  const [hairStyleKorean, setHairStyleKorean] =
    useState("머리 스타일을 선택해주세요");

  const handleHairStyleSelectBoxClick = () => {
    setShowNoneBox(false);
    setShowGenreImage(false);
    setShowColor(false);
    setShowPreset(false);
    setShowGender(false);
    setShowEmotion(false);
    setShowCostume(false);
    setShowHairStyle(true);
  };

  const handleHairStyle = (hairStyle: {
    name: string;
    koreanName: string;
    hairlength: string;
    hairstyle: string;
  }) => {
    setHairStyle(hairStyle.hairstyle);
    setHairLength(hairStyle.hairlength);
    setHairStyleKorean(hairStyle.koreanName);
  };

  /////////////////////////////////////////////////////////////////////

  // 프리셋 컴포넌트 보이기/숨기기 상태값
  const [showPreset, setShowPreset] = useState(false);
  const [preset, setPreset] = useState("");
  const [presetKorean, setPresetKorean] = useState("프리셋을 선택해주세요");

  const handlePresetSelectBoxClick = () => {
    setShowNoneBox(false);
    setShowGenreImage(false);
    setShowColor(false);
    setShowHairStyle(false);
    setShowGender(false);
    setShowEmotion(false);
    setShowCostume(false);
    setShowPreset(true);
  };

  const handlePreset = (preset: { name: string; koreanName: string }) => {
    setPresetKorean(preset.koreanName);
    setPreset(Preset.name);
  };

  /////////////////////////////////////////////////////////////////////

  const [showGender, setShowGender] = useState(false);
  const [gender, setGender] = useState("");
  const [genderKorean, setGenderKorean] = useState("성별을 선택해주세요");

  const handleGenderSelectBoxClick = () => {
    setShowNoneBox(false);
    setShowGenreImage(false);
    setShowColor(false);
    setShowHairStyle(false);
    setShowPreset(false);
    setShowEmotion(false);
    setShowCostume(false);
    setShowGender(true);
  };

  const handleGender = (gender: { name: string; koreanName: string }) => {
    setGenderKorean(gender.koreanName);
    setGender(gender.name);
  };

  /////////////////////////////////////////////////////////////////////

  const [showEmotion, setShowEmotion] = useState(false);
  const [emotion, setEmotion] = useState("");
  const [emotionKorean, setEmotionKorean] = useState("표정을 선택해주세요");

  const handleEmotionSelectBoxClick = () => {
    setShowNoneBox(false);
    setShowGenreImage(false);
    setShowColor(false);
    setShowHairStyle(false);
    setShowPreset(false);
    setShowGender(false);
    setShowCostume(false);
    setShowEmotion(true);
  };

  const handleEmotion = (emotion: { name: string; koreanName: string }) => {
    setEmotion(emotion.name);
    setEmotionKorean(emotion.koreanName);
  };

  /////////////////////////////////////////////////////////////////////

  const [showCostume, setShowCostume] = useState(false);
  const [costume, setCostume] = useState("");
  const [costumeKorean, setCostumeKorean] = useState("의상을 선택해주세요");

  const handleCostumeSelectBoxClick = () => {
    setShowNoneBox(false);
    setShowGenreImage(false);
    setShowColor(false);
    setShowHairStyle(false);
    setShowPreset(false);
    setShowGender(false);
    setShowEmotion(false);
    setShowCostume(true);
  };

  const handleCostume = (costume: { name: string; koreanName: string }) => {
    setCostume(costume.name);
    setCostumeKorean(costume.koreanName);
  };

  // gemini 생성 모달
  const [showGeminiModal, setShowGeminiModal] = useState(false);

  const openGeminiModal = () => {
    setShowGeminiModal(true);
  };

  const closeGeminiModal = () => {
    setShowGeminiModal(false);
  };

  return (
    <Background>
      <AiWrapper>
        <AiSelectWrapper>
          <AiSelectTitle>장르</AiSelectTitle>
          <GenreSelectBox onClick={handleGenreSelectBoxClick}>
            <p>{selectBoxText}</p>
          </GenreSelectBox>

          <AiSelectTitle>프리셋</AiSelectTitle>
          <GenreSelectBox onClick={handlePresetSelectBoxClick}>
            <p>{presetKorean}</p>
          </GenreSelectBox>

          <AiSelectTitle>성별</AiSelectTitle>
          <GenreSelectBox onClick={handleGenderSelectBoxClick}>
            <p>{genderKorean}</p>
          </GenreSelectBox>

          <AiSelectTitle>머리카락 색상</AiSelectTitle>
          <GenreSelectBox onClick={handleHairColorSelectBoxClick}>
            <p>{harirColorKorean}</p>
          </GenreSelectBox>

          <AiSelectTitle>눈동자 색상</AiSelectTitle>
          <GenreSelectBox onClick={handleEyeColorSelectBoxClick}>
            <p>{eyeColorKorean}</p>
          </GenreSelectBox>

          <AiSelectTitle>머리 스타일</AiSelectTitle>
          <GenreSelectBox onClick={handleHairStyleSelectBoxClick}>
            <p>{hairStyleKorean}</p>
          </GenreSelectBox>

          <AiSelectTitle>표정</AiSelectTitle>
          <GenreSelectBox onClick={handleEmotionSelectBoxClick}>
            <p>{emotionKorean}</p>
          </GenreSelectBox>

          <AiSelectTitle>의상</AiSelectTitle>
          <GenreSelectBox onClick={handleCostumeSelectBoxClick}>
            <p>{costumeKorean}</p>
          </GenreSelectBox>
        </AiSelectWrapper>

        <AiSampleWrapper>
          <AiCreateButton onClick={openGeminiModal}>
            제미니 생성하기
          </AiCreateButton>
          {showGeminiModal && <MakeGeminiModal onClose={closeGeminiModal} />}

          <AiSampleBox>
            {showNoneBox && <NoneSampleBox />}
            {showGenreImage && <GenreImage handleGenre={handleGenre} />}
            {showColor && (
              <ColorSelect parentId={parentId} handleColor={handleColor} />
            )}
            {showHairStyle && <HairStyle handleHairStyle={handleHairStyle} />}
            {showPreset && <Preset handlePreset={handlePreset} />}
            {showGender && <Gender handleGender={handleGender} />}
            {showEmotion && <Emotion handleEmotion={handleEmotion} />}
            {showCostume && <Costume handleCostume={handleCostume} />}
          </AiSampleBox>
        </AiSampleWrapper>
      </AiWrapper>
    </Background>
  );
};

export default AiImage;