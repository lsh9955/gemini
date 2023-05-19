import React, { FC, useState } from "react";
import {
  ColorWrapper,
  ColorContainer,
  ColorImage,
  ColorText,
  ClickedColorContainer,
} from "./ColorSelect.styles";

// 색상 종류
import BlackColor from "../../assets/img/ai/color/black.png";
import BlueColor from "../../assets/img/ai/color/blue.png";
import BrownColor from "../../assets/img/ai/color/brown.png";
import GoldColor from "../../assets/img/ai/color/gold.png";
import GreenColor from "../../assets/img/ai/color/green.png";
import GreyColor from "../../assets/img/ai/color/grey.png";
import OrangeColor from "../../assets/img/ai/color/orange.png";
import PinkColor from "../../assets/img/ai/color/pink.png";
import PurpleColor from "../../assets/img/ai/color/puple.png";
import RedColor from "../../assets/img/ai/color/red.png";
import WhiteColor from "../../assets/img/ai/color/white.png";
import YellowColor from "../../assets/img/ai/color/yellow.png";

interface Color {
  name: string;
  image: string;
  koreanName: string;
}

const colors: Color[] = [
  { name: "white", image: WhiteColor, koreanName: "흰색" },
  { name: "grey", image: GreyColor, koreanName: "회색" },
  { name: "black", image: BlackColor, koreanName: "검정색" },
  { name: "brown", image: BrownColor, koreanName: "갈색" },
  { name: "orange", image: OrangeColor, koreanName: "주황색" },
  { name: "gold", image: GoldColor, koreanName: "황금색" },
  { name: "yellow", image: YellowColor, koreanName: "노란색" },
  { name: "red", image: RedColor, koreanName: "빨간색" },
  { name: "pink", image: PinkColor, koreanName: "분홍색" },
  { name: "purple", image: PurpleColor, koreanName: "보라색" },
  { name: "blue", image: BlueColor, koreanName: "파란색" },
  { name: "green", image: GreenColor, koreanName: "녹색" },
];

interface Props {
  handleColor: (
    color: { name: string; koreanName: string },
    parentId: string
  ) => void;
  parentId: string;
}

const ColorSelect: FC<Props> = ({ handleColor, parentId }) => {
  const [pickColor, setPickColor] = useState<any>(null);

  const handleColorClick = (color: Color) => {
    handleColor({ name: color.name, koreanName: color.koreanName }, parentId);
  };
  return (
    <>
      <ColorWrapper>
        {colors.map((color) => {
          return color.koreanName === pickColor ? (
            <ClickedColorContainer
              key={color.name}
              onClick={() => {
                handleColorClick(color);
                setPickColor(color.koreanName);
                console.log(color.koreanName);
              }}
            >
              <ColorText>{color.koreanName}</ColorText>
              <ColorImage src={color.image} alt={color.name} />
            </ClickedColorContainer>
          ) : (
            <ColorContainer
              key={color.name}
              onClick={() => {
                handleColorClick(color);
                setPickColor(color.koreanName);
                console.log(color.koreanName);
              }}
            >
              <ColorText>{color.koreanName}</ColorText>
              <ColorImage src={color.image} alt={color.name} />
            </ColorContainer>
          );
        })}
      </ColorWrapper>
    </>
  );
};

export default ColorSelect;
