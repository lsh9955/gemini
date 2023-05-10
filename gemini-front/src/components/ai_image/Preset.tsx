import React, { FC } from "react";
import { PresetBox, PresetContainer, PresetImage } from "./Preset.style";

import Ari from "../../assets/img/ai/preset/Ari.png";
import Elric from "../../assets/img/ai/preset/Elric.png";
import Hosino from "../../assets/img/ai/preset/Hosino.png";
import Jinx from "../../assets/img/ai/preset/Jinx.png";
import NoneSelect from "../../assets/img/ai/preset/NoneSelect.png";

interface Preset {
  name: string;
  image: string;
  koreanName: string;
}

const presets: Preset[] = [
  {
    name: "ahri_league_of_legends",
    image: Ari,
    koreanName: "아리(리그오브레전드)",
  },
  {
    name: "jinx_league_of_legends",
    image: Jinx,
    koreanName: "징크스(리그오브레전드)",
  },
  {
    name: "Edward Elric Fullmetal Alchemist",
    image: Elric,
    koreanName: "에드워드 엘릭(강철의 연금술사)",
  },
  {
    name: "ai hoshino",
    image: Hosino,
    koreanName: "호시노 아이(최애의 아이)",
  },
  { name: "", image: NoneSelect, koreanName: "선택하지 않기" },
];

interface Props {
  handlePreset: (Preset: {
    name: string;
    image: string;
    koreanName: string;
  }) => void;
}

const Preset: FC<Props> = ({ handlePreset }) => {
  const handlePresetClick = (preset: Preset) => {
    handlePreset({
      name: preset.name,
      image: preset.image,
      koreanName: preset.koreanName,
    });
  };
  return (
    <>
      <PresetBox>
        {presets.map((preset) => (
          <PresetContainer
            key={preset.name}
            onClick={() => handlePresetClick(preset)}
          >
            <PresetImage src={preset.image} alt={preset.name} />
          </PresetContainer>
        ))}
      </PresetBox>
    </>
  );
};

export default Preset;
