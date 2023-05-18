import React, { FC } from "react";
import {
  PresetBox,
  PresetContainer,
  PresetImage,
  PresetText,
} from "./Preset.style";

// import Ari from "../../assets/img/ai/preset/Ari.png";
// import Elric from "../../assets/img/ai/preset/Elric.png";
// import Hosino from "../../assets/img/ai/preset/Hosino.png";
// import Jinx from "../../assets/img/ai/preset/Jinx.png";
// import NoneSelect from "../../assets/img/ai/preset/NoneSelect.png";

// interface Preset {
//   name: string;
//   image: string;
//   koreanName: string;
// }

// const presets: Preset[] = [
//   {
//     name: "ahri_league_of_legends",
//     image: Ari,
//     koreanName: "아리(리그오브레전드)",
//   },
//   {
//     name: "jinx_league_of_legends",
//     image: Jinx,
//     koreanName: "징크스(리그오브레전드)",
//   },
//   {
//     name: "Edward Elric Fullmetal Alchemist",
//     image: Elric,
//     koreanName: "에드워드 엘릭(강철의 연금술사)",
//   },
//   {
//     name: "ai hoshino",
//     image: Hosino,
//     koreanName: "호시노 아이(최애의 아이)",
//   },
//   { name: "", image: NoneSelect, koreanName: "선택하지 않기" },
// ];

// interface Props {
//   handlePreset: (Preset: {
//     name: string;
//     image: string;
//     koreanName: string;
//   }) => void;
// }

interface Data {
  tagId: number;
  koreanName: string;
  imgUrl: string;
}

interface Props {
  data: Data[];
  handlePreset: (preset: Data) => void;
}

const Preset: FC<Props> = ({ data, handlePreset }) => {
  const handlePresetClick = (item: Data) => {
    handlePreset({
      tagId: item.tagId,
      imgUrl: item.imgUrl,
      koreanName: item.koreanName,
    });
  };
  return (
    <>
      <PresetBox>
        {data?.map((item) => (
          <PresetContainer
            key={item.tagId}
            onClick={() => handlePresetClick(item)}
          >
            <PresetText>{item.koreanName}</PresetText>
            <PresetImage src={item.imgUrl} alt={item.koreanName} />
          </PresetContainer>
        ))}
      </PresetBox>
    </>
  );
};

export default Preset;
