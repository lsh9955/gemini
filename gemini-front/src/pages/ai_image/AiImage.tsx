import React, { FC, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import axiosInstanceWithAccessToken from "../../utils/AxiosInstanceWithAccessToken";

import GenreImage from "../../components/ai_image/GenreImage";
import HairColor from "../../components/ai_image/HairColor";
import EyeColor from "../../components/ai_image/EyeColor";
import HairStyle from "../../components/ai_image/HairStyle";
import Preset from "../../components/ai_image/Preset";
import Gender from "../../components/ai_image/Gender";
import Emotion from "../../components/ai_image/Emotion";
import Costume from "../../components/ai_image/Costume";
import MaleHairStyle from "../../components/ai_image/MaleHairStyle";

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
import NeedStarModal from "../../components/ai_image/modal/NeedStarModal";

interface Tag {
  tagId: any;
  img: string;
  koreanName: string;
}

interface TagsResponse {
  tags: Tag[];
}
// const headers = {
//   "X-Username": "google_109918724409380589068",
// };

// 자식에서 보내주는 data의 타입
interface Data {
  tagId: any;
  imgUrl: string;
  koreanName: string;
}

interface TagIds {
  genreTagId: any;
  presetTagId: any;
  genderTagId: any;
  hairColorTagId: any;
  eyeColorTagId: any;
  hairStyleTagId: any;
  emotionTagId: any;
  costumeTagId: any;
}

// 갤러리에서 보내주는 갤러리pk 타입
interface GalleryLocationState {
  galleryPk: number;
}

interface GalleryTags {
  genre: { tagId: any; genreKorean: string };
  preset: { tagId: any; presetKorean: string };
  gender: { tagId: any; genderKorean: string };
  hairColor: { tagId: any; hairColorKorean: string };
  eyeColor: { tagId: any; eyeColorKorean: string };
  hairStyle: { tagId: any; hairStyleKorean: string };
  emotion: { tagId: any; emotionKorean: string };
  costume: { tagId: any; costumeKorean: string };
}

const AiImage: FC = () => {
  // 갤러리 디테일에서 넘어올 갤러리 pk값
  const location = useLocation<GalleryLocationState>();
  const galleryPk = location.state?.galleryPk;
  // 갤러리 pk를 통해 get으로 불러온 값
  const [galleryInfo, setGalleryInfo] = useState<any>([]);

  // usestate
  const [genreTagId, setGenreTagId] = useState(null);
  const [genreKorean, setGenreKorean] = useState("장르를 선택해주세요");

  const [presetTagId, setPresetTagId] = useState(null);
  const [presetKorean, setPresetKorean] = useState("프리셋을 선택해주세요");

  const [genderTagId, setGenderTagId] = useState(null);
  const [genderKorean, setGenderKorean] = useState("성별을 선택해주세요");

  const [hairColorTagId, setHairColorTagId] = useState(null);
  const [hairColorKorean, setHairColorKorean] =
    useState("머리카락 색상을 선택해주세요");

  const [eyeColorTagId, setEyeColorTagId] = useState(null);
  const [eyeColorKorean, setEyeColorKorean] =
    useState("눈동자 색상을 선택해주세요");

  const [hairStyleTagId, setHairStyleTagId] = useState(null);
  const [hairStyleKorean, setHairStyleKorean] =
    useState("머리 스타일을 선택해주세요");

  const [emotionTagId, setEmotionTagId] = useState(null);
  const [emotionKorean, setEmotionKorean] = useState("표정을 선택해주세요");

  const [costumeTagId, setCostumeTagId] = useState(null);
  const [costumeKorean, setCostumeKorean] = useState("의상을 선택해주세요");

  // url 만들어지면 수정하기
  useEffect(() => {
    if (galleryPk) {
      console.log("galleryPk 있나?");
      axiosInstanceWithAccessToken
        .get<GalleryTags>(`/user-service/generate/default/${galleryPk}`)
        .then((response) => {
          console.log(response.data);
          setGalleryInfo(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // 갤러리 디테일에서 가져온 태그값들을 담아줌
  useEffect(() => {
    if (galleryInfo.defaultSetting) {
      console.log(galleryInfo.defaultSetting);
      galleryInfo.defaultSetting.forEach((item: any) => {
        console.log("for문으로 들어왔나?");
        const { tagId, koreanName, categoryId } = item;
        if (categoryId === 1 && tagId !== null) {
          setGenreTagId(item.tagId);
          setGenreKorean(koreanName);
        } else if (categoryId === 2 && tagId !== null && koreanName !== null) {
          setPresetTagId(tagId);
          setPresetKorean(koreanName);
        } else if (categoryId === 3 && tagId !== null && koreanName !== null) {
          setGenderTagId(tagId);
          setGenderKorean(koreanName);
        } else if (categoryId === 4 && tagId !== null && koreanName !== null) {
          setHairColorTagId(tagId);
          setHairColorKorean(koreanName);
        } else if (categoryId === 5 && tagId !== null && koreanName !== null) {
          setEyeColorTagId(tagId);
          setEyeColorKorean(koreanName);
        } else if (categoryId === 6 && tagId !== null && koreanName !== null) {
          setHairStyleTagId(tagId);
          setHairStyleKorean(koreanName);
        } else if (categoryId === 7 && tagId !== null && koreanName !== null) {
          setEmotionTagId(tagId);
          setEmotionKorean(koreanName);
        } else if (categoryId === 8 && tagId !== null && koreanName !== null) {
          setCostumeTagId(tagId);
          setCostumeKorean(koreanName);
        } else if (categoryId === 9 && tagId !== null && koreanName !== null) {
          setHairStyleTagId(tagId);
          setHairStyleKorean(koreanName);
        }
      });
    }
  }, [galleryInfo.defaultSetting]);

  // DB에서 가져올 태그들의 데이터들
  const [data, setData] = useState<any>(null);

  // axios 보낼 카테고리
  const [categoryNum, setCategoryNum] = useState(1);

  // 태그 이미지 DB에서 가져오기
  useEffect(() => {
    if (categoryNum !== 0) {
      axiosInstanceWithAccessToken
        .get<TagsResponse>(
          // `http://192.168.31.73:8081/user-service/generate/${categoryNum}`,
          // `http://172.30.1.62:8081/user-service/generate/${categoryNum}`,
          `/user-service/generate/${categoryNum}`
          // {
          //   headers,
          // }
        )
        .then((response) => {
          console.log(response.data);
          setData(response.data.tags);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [categoryNum]);

  // useEffect(() => {
  //   if (categoryNum !== 0) {
  //     axios
  //       .get<TagsResponse>(
  //         `http://192.168.31.73:8081/user-service/generate/${categoryNum}`,
  //         // `http://172.30.1.62:8081/user-service/generate/${categoryNum}`,
  //         // `/user-service/generate/${categoryNum}`,
  //         {
  //           headers,
  //         }
  //       )
  //       .then((response) => {
  //         console.log(response.data);
  //         setData(response.data.tags);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [categoryNum]);

  //////////////////////////////////////////////////////////////////////////////////////////

  // 왼쪽 select 컴포넌트를 클릭했을 때, 오른쪽 이미지 컴포넌트를 보여줄 트리거
  // const [showNoneBox, setShowNoneBox] = useState(true);
  const [showGenreImage, setShowGenreImage] = useState(true);
  const [showPreset, setShowPreset] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const [showHairColor, setShowHairColor] = useState(false);
  const [showEyeColor, setShowEyeColor] = useState(false);
  const [showHairStyle, setShowHairStyle] = useState(false);
  const [showMaleHairStyle, setShowMaleHairStyle] = useState(false);
  const [showEmotion, setShowEmotion] = useState(false);
  const [showCostume, setShowCostume] = useState(false);

  //////////////////////////////////////////////////////////////////////////////////////////

  // 왼쪽 select 컴포넌트 클릭시 발생할 이벤트 모음

  // 장르
  const handleGenreSelectBoxClick = () => {
    // axios 요청을 바꿔줌
    // setShowNoneBox(false);
    setShowHairColor(false);
    setShowHairStyle(false);
    setShowEyeColor(false);
    setShowPreset(false);
    setShowGender(false);
    setShowEmotion(false);
    setShowCostume(false);
    setShowMaleHairStyle(false);
    setShowGenreImage(true);

    setCategoryNum(1);
  };

  // 프리셋
  const handlePresetSelectBoxClick = () => {
    // setShowNoneBox(false);
    setShowGenreImage(false);
    setShowHairColor(false);
    setShowEyeColor(false);
    setShowHairStyle(false);
    setShowGender(false);
    setShowEmotion(false);
    setShowCostume(false);
    setShowMaleHairStyle(false);
    setShowPreset(true);

    setCategoryNum(2);
  };

  // 성별
  const handleGenderSelectBoxClick = () => {
    // setShowNoneBox(false);
    setShowGenreImage(false);
    setShowHairColor(false);
    setShowEyeColor(false);
    setShowHairStyle(false);
    setShowPreset(false);
    setShowEmotion(false);
    setShowCostume(false);
    setShowMaleHairStyle(false);
    setShowGender(true);

    setCategoryNum(3);
  };

  // 머리색
  const handleHairColorSelectBoxClick = () => {
    // setShowNoneBox(false);
    setShowGenreImage(false);
    setShowPreset(false);
    setShowHairStyle(false);
    setShowGender(false);
    setShowEmotion(false);
    setShowCostume(false);
    setShowEyeColor(false);
    setShowMaleHairStyle(false);
    setShowHairColor(true);

    setCategoryNum(4);
  };

  // 눈동자색
  const handleEyeColorSelectBoxClick = () => {
    // setShowNoneBox(false);
    setShowGenreImage(false);
    setShowPreset(false);
    setShowHairStyle(false);
    setShowHairColor(false);
    setShowGender(false);
    setShowEmotion(false);
    setShowCostume(false);
    setShowMaleHairStyle(false);
    setShowEyeColor(true);

    setCategoryNum(5);
  };

  // 머리스타일
  const handleHairStyleSelectBoxClick = () => {
    // setShowNoneBox(false);
    setShowGenreImage(false);
    setShowHairColor(false);
    setShowEyeColor(false);
    setShowPreset(false);
    setShowGender(false);
    setShowEmotion(false);
    setShowCostume(false);
    // 남자일 때 혹은 여자일 때 헤어스타일을 true로 바꿔줌
    if (genderKorean == "남성") {
      setShowHairStyle(false);
      setShowMaleHairStyle(true);
      setCategoryNum(9);
    } else {
      setShowHairStyle(true);
      setShowMaleHairStyle(false);
      setCategoryNum(6);
    }
  };

  // 감정
  const handleEmotionSelectBoxClick = () => {
    // setShowNoneBox(false);
    setShowGenreImage(false);
    setShowHairColor(false);
    setShowEyeColor(false);
    setShowHairStyle(false);
    setShowPreset(false);
    setShowGender(false);
    setShowCostume(false);
    setShowMaleHairStyle(false);
    setShowEmotion(true);

    setCategoryNum(7);
  };

  // 의상
  const handleCostumeSelectBoxClick = () => {
    // setShowNoneBox(false);
    setShowGenreImage(false);
    setShowHairColor(false);
    setShowEyeColor(false);
    setShowHairStyle(false);
    setShowPreset(false);
    setShowGender(false);
    setShowEmotion(false);
    setShowMaleHairStyle(false);
    setShowCostume(true);

    setCategoryNum(8);
  };

  //////////////////////////////////////////////////////////////////////////////////////////

  // 자식 컴포넌트에서 부모에게 props를 보내줌
  // const [genreTagId, setGenreTagId] = useState(null);
  // const [genreKorean, setGenreKorean] = useState("장르를 선택해주세요");
  const handleGenre = (genre: Data) => {
    setGenreTagId(genre.tagId);
    setGenreKorean(genre.koreanName);
  };

  // const [presetTagId, setPresetTagId] = useState(null);
  // const [presetKorean, setPresetKorean] = useState("프리셋을 선택해주세요");
  const handlePreset = (preset: Data) => {
    setPresetTagId(preset.tagId);
    setPresetKorean(preset.koreanName);
  };

  // const [genderTagId, setGenderTagId] = useState(null);
  // const [genderKorean, setGenderKorean] = useState("성별을 선택해주세요");
  const handleGender = (gender: Data) => {
    setGenderTagId(gender.tagId);
    setGenderKorean(gender.koreanName);
  };

  // const [hairColorTagId, setHairColorTagId] = useState(null);
  // const [hairColorKorean, setHairColorKorean] =
  //   useState("머리카락 색상을 선택해주세요");
  const handleHairColor = (hairColor: Data) => {
    setHairColorTagId(hairColor.tagId);
    setHairColorKorean(hairColor.koreanName);
  };

  // const [eyeColorTagId, setEyeColorTagId] = useState(null);
  // const [eyeColorKorean, setEyeColorKorean] =
  //   useState("눈동자 색상을 선택해주세요");
  const handleEyeColor = (eyeColor: Data) => {
    setEyeColorTagId(eyeColor.tagId);
    setEyeColorKorean(eyeColor.koreanName);
  };

  // const [hairStyleTagId, setHairStyleTagId] = useState(null);
  // const [hairStyleKorean, setHairStyleKorean] =
  //   useState("머리 스타일을 선택해주세요");
  const handleHairStyle = (hairStyle: Data) => {
    setHairStyleTagId(hairStyle.tagId);
    setHairStyleKorean(hairStyle.koreanName);
  };

  const handleMaleHairStyle = (maleHairStyle: Data) => {
    setHairStyleTagId(maleHairStyle.tagId);
    setHairStyleKorean(maleHairStyle.koreanName);
  };

  // const [emotionTagId, setEmotionTagId] = useState(null);
  // const [emotionKorean, setEmotionKorean] = useState("표정을 선택해주세요");
  const handleEmotion = (emotion: Data) => {
    setEmotionTagId(emotion.tagId);
    setEmotionKorean(emotion.koreanName);
  };

  // const [costumeTagId, setCostumeTagId] = useState(null);
  // const [costumeKorean, setCostumeKorean] = useState("의상을 선택해주세요");
  const handleCostume = (costume: Data) => {
    setCostumeTagId(costume.tagId);
    setCostumeKorean(costume.koreanName);
  };

  const tagIds = {
    genreTagId,
    presetTagId,
    genderTagId,
    hairColorTagId,
    eyeColorTagId,
    hairStyleTagId,
    emotionTagId,
    costumeTagId,
  };
  /////////////////////////////////////////////////////////////////////

  // 별 개수에 따라서 다르게 모달이 뜸
  const [showGeminiModal, setShowGeminiModal] = useState(false);
  const [showNeedStarModal, setShowNeedStarModal] = useState(false);

  // const headers = {
  // "X-Username": "google_109918724409380589068",
  // };
  const openGeminiModal = () => {
    axiosInstanceWithAccessToken
      .get(`/user-service/generate`)
      // axios
      // .get("http://192.168.31.73:8081/user-service/gemini", {
      // headers,
      // })
      .then((response) => {
        console.log(response);
        if (response.data === 0) {
          setShowGeminiModal(false);
          setShowNeedStarModal(true);
        } else {
          setShowNeedStarModal(false);
          setShowGeminiModal(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeGeminiModal = () => {
    setShowGeminiModal(false);
  };

  const closeNeedStarModal = () => {
    setShowNeedStarModal(false);
  };

  return (
    <Background>
      <AiWrapper>
        <AiSelectWrapper>
          <AiSelectTitle>장르</AiSelectTitle>
          <GenreSelectBox onClick={handleGenreSelectBoxClick}>
            <p>{genreKorean}</p>
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
            <p>{hairColorKorean}</p>
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
          {showNeedStarModal && (
            <NeedStarModal tagIds={tagIds} onClose={closeNeedStarModal} />
          )}
          {showGeminiModal && (
            <MakeGeminiModal tagIds={tagIds} onClose={closeGeminiModal} />
          )}

          <AiSampleBox>
            {/* {showNoneBox && <NoneSampleBox />} */}
            {/* <GenreImage data={data} handleGenre={handleGenre} /> */}
            {showGenreImage && (
              <GenreImage data={data} handleGenre={handleGenre} />
            )}
            {showHairColor && (
              <HairColor data={data} handleHairColor={handleHairColor} />
            )}
            {showEyeColor && (
              <EyeColor data={data} handleEyeColor={handleEyeColor} />
            )}
            {showHairStyle && (
              <HairStyle data={data} handleHairStyle={handleHairStyle} />
            )}
            {showMaleHairStyle && (
              <MaleHairStyle
                data={data}
                handleMaleHairStyle={handleMaleHairStyle}
              />
            )}
            {showPreset && <Preset data={data} handlePreset={handlePreset} />}
            {showGender && <Gender data={data} handleGender={handleGender} />}
            {showEmotion && (
              <Emotion data={data} handleEmotion={handleEmotion} />
            )}
            {showCostume && (
              <Costume data={data} handleCostume={handleCostume} />
            )}
          </AiSampleBox>
          {(showEyeColor ||
            showEmotion ||
            showHairStyle ||
            showMaleHairStyle) && (
            <div style={{ width: "100%", height: "10vh" }}></div>
          )}
        </AiSampleWrapper>
      </AiWrapper>
    </Background>
  );
};

export default AiImage;
