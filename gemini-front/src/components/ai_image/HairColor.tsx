import React, { FC, useState } from "react";
import {
  HairColorBox,
  HairColorImage,
  ColorContainer,
  ColorText,
} from "./AiSampleImage.styles";
import Black from "../../assets/img/ai/color/black.png";
import Blue from "../../assets/img/ai/color/blue.png";
import Brown from "../../assets/img/ai/color/brown.png";
import Gold from "../../assets/img/ai/color/gold.png";
import Green from "../../assets/img/ai/color/green.png";
import Grey from "../../assets/img/ai/color/grey.png";
import Orange from "../../assets/img/ai/color/orange.png";
import Pink from "../../assets/img/ai/color/pink.png";
import Puple from "../../assets/img/ai/color/puple.png";
import Red from "../../assets/img/ai/color/red.png";
import White from "../../assets/img/ai/color/white.png";
import yellow from "../../assets/img/ai/color/yellow.png";

interface Props {
  handleHairColor: (color: string) => void;
}

const HairColor: FC<Props> = ({ handleHairColor }) => {
  const handleHairColorClick = (color: string) => {
    handleHairColor(color);
  };

  // 호버했을 때 텍스트가 보임

  // 흰색
  const [isWhiteHovered, setIsWhiteHovered] = useState(false);
  const handleWhiteMouseEnter = () => {
    setIsWhiteHovered(true);
  };
  const handleWhiteMouseLeave = () => {
    setIsWhiteHovered(false);
  };

  // 회색
  const [isGreyHovered, setIsGreyHovered] = useState(false);
  const handleGreyMouseEnter = () => {
    setIsGreyHovered(true);
  };
  const handleGreyMouseLeave = () => {
    setIsGreyHovered(false);
  };

  // 검은색
  const [isBlackHovered, setIsBlackHovered] = useState(false);
  const handleBlackMouseEnter = () => {
    setIsBlackHovered(true);
  };
  const handleBlackMouseLeave = () => {
    setIsBlackHovered(false);
  };

  // 파란색
  const [isBlueHovered, setIsBlueHovered] = useState(false);
  const handleBlueMouseEnter = () => {
    setIsBlueHovered(true);
  };
  const handleBlueMouseLeave = () => {
    setIsBlueHovered(false);
  };

  // 갈색
  const [isBrownHovered, setIsBrownHovered] = useState(false);
  const handleBrownMouseEnter = () => {
    setIsBrownHovered(true);
  };
  const handleBrownMouseLeave = () => {
    setIsBrownHovered(false);
  };

  // 황금색
  const [isGoldHovered, setIsGoldHovered] = useState(false);
  const handleGoldMouseEnter = () => {
    setIsGoldHovered(true);
  };
  const handleGoldMouseLeave = () => {
    setIsGoldHovered(false);
  };

  // 분홍색
  const [isPinkHovered, setIsPinkHovered] = useState(false);
  const handlePinkMouseEnter = () => {
    setIsPinkHovered(true);
  };
  const handlePinkMouseLeave = () => {
    setIsPinkHovered(false);
  };

  // 보라색
  const [isPurpleHovered, setIsPurpleHovered] = useState(false);
  const handlePurpleMouseEnter = () => {
    setIsPurpleHovered(true);
  };
  const handlePurpleMouseLeave = () => {
    setIsPurpleHovered(false);
  };

  // 빨간색
  const [isRedHovered, setIsRedHovered] = useState(false);
  const handleRedMouseEnter = () => {
    setIsRedHovered(true);
  };
  const handleRedMouseLeave = () => {
    setIsRedHovered(false);
  };

  // 노란색
  const [isYellowHovered, setIsYellowHovered] = useState(false);
  const handleYellowMouseEnter = () => {
    setIsYellowHovered(true);
  };
  const handleYellowMouseLeave = () => {
    setIsYellowHovered(false);
  };

  // 초록색
  const [isGreenHovered, setIsGreenHovered] = useState(false);
  const handleGreenMouseEnter = () => {
    setIsGreenHovered(true);
  };
  const handleGreenMouseLeave = () => {
    setIsGreenHovered(false);
  };

  // 주황색
  const [isOrangeHovered, setIsOrangeHovered] = useState(false);
  const handleOrangeMouseEnter = () => {
    setIsOrangeHovered(true);
  };
  const handleOrangeMouseLeave = () => {
    setIsOrangeHovered(false);
  };

  return (
    <>
      <HairColorBox>
        <ColorContainer>
          <HairColorImage
            src={White}
            alt="White"
            onClick={() => handleHairColorClick("White")}
            onMouseEnter={handleWhiteMouseEnter}
            onMouseLeave={handleWhiteMouseLeave}
          />
          {isWhiteHovered && <ColorText>흰색</ColorText>}
        </ColorContainer>

        <ColorContainer>
          <HairColorImage
            src={Grey}
            alt="Grey"
            onClick={() => handleHairColorClick("Grey")}
            onMouseEnter={handleGreyMouseEnter}
            onMouseLeave={handleGreyMouseLeave}
          />
          {isGreyHovered && <ColorText>회색</ColorText>}
        </ColorContainer>

        <ColorContainer>
          <HairColorImage
            src={Black}
            alt="Black"
            onClick={() => handleHairColorClick("Black")}
            onMouseEnter={handleBlackMouseEnter}
            onMouseLeave={handleBlackMouseLeave}
          />
          {isBlackHovered && <ColorText>검정색</ColorText>}
        </ColorContainer>

        <ColorContainer>
          <HairColorImage
            src={Brown}
            alt="Brown"
            onClick={() => handleHairColorClick("Brown")}
            onMouseEnter={handleBrownMouseEnter}
            onMouseLeave={handleBrownMouseLeave}
          />
          {isBrownHovered && <ColorText>갈색</ColorText>}
        </ColorContainer>

        <ColorContainer>
          <HairColorImage
            src={Orange}
            alt="Orange"
            onClick={() => handleHairColorClick("Orange")}
            onMouseEnter={handleOrangeMouseEnter}
            onMouseLeave={handleOrangeMouseLeave}
          />
          {isOrangeHovered && <ColorText>주황색</ColorText>}
        </ColorContainer>

        <ColorContainer>
          <HairColorImage
            src={Gold}
            alt="Gold"
            onClick={() => handleHairColorClick("Gold")}
            onMouseEnter={handleGoldMouseEnter}
            onMouseLeave={handleGoldMouseLeave}
          />
          {isGoldHovered && <ColorText>황금색</ColorText>}
        </ColorContainer>

        <ColorContainer>
          <HairColorImage
            src={yellow}
            alt="yellow"
            onClick={() => handleHairColorClick("Yellow")}
            onMouseEnter={handleYellowMouseEnter}
            onMouseLeave={handleYellowMouseLeave}
          />
          {isYellowHovered && <ColorText>노란색</ColorText>}
        </ColorContainer>

        <ColorContainer>
          <HairColorImage
            src={Red}
            alt="Red"
            onClick={() => handleHairColorClick("Red")}
            onMouseEnter={handleRedMouseEnter}
            onMouseLeave={handleRedMouseLeave}
          />
          {isRedHovered && <ColorText>빨간색</ColorText>}
        </ColorContainer>

        <ColorContainer>
          <HairColorImage
            src={Pink}
            alt="Pink"
            onClick={() => handleHairColorClick("Pink")}
            onMouseEnter={handlePinkMouseEnter}
            onMouseLeave={handlePinkMouseLeave}
          />
          {isPinkHovered && <ColorText>분홍색</ColorText>}
        </ColorContainer>

        <ColorContainer>
          <HairColorImage
            src={Puple}
            alt="Puple"
            onClick={() => handleHairColorClick("Puple")}
            onMouseEnter={handlePurpleMouseEnter}
            onMouseLeave={handlePurpleMouseLeave}
          />
          {isPurpleHovered && <ColorText>보라색</ColorText>}
        </ColorContainer>

        <ColorContainer>
          <HairColorImage
            src={Blue}
            alt="Blue"
            onClick={() => handleHairColorClick("Blue")}
            onMouseEnter={handleBlueMouseEnter}
            onMouseLeave={handleBlueMouseLeave}
          />
          {isBlueHovered && <ColorText>파란색</ColorText>}
        </ColorContainer>

        <ColorContainer>
          <HairColorImage
            src={Green}
            alt="Green"
            onClick={() => handleHairColorClick("Green")}
            onMouseEnter={handleGreenMouseEnter}
            onMouseLeave={handleGreenMouseLeave}
          />
          {isGreenHovered && <ColorText>초록색</ColorText>}
        </ColorContainer>
      </HairColorBox>
    </>
  );
};

export default HairColor;
