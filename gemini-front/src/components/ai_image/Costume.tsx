import React, { FC } from "react";
import {
  HairStyleBox,
  CostumeContainer,
  HairStyleImage,
} from "./AiSampleImage.styles";

import Hanbok from "../../assets/img/ai/costume/Hanbok.png";
import Kimono from "../../assets/img/ai/costume/Kimono.png";
import MaidUniform from "../../assets/img/ai/costume/MaidUniform.png";
import PlateArmor from "../../assets/img/ai/costume/PlateArmor.png";
import Spacesuit from "../../assets/img/ai/costume/Spacesuit.png";

interface Costume {
  name: string;
  image: string;
  koreaName: string;
}

const costumes: Costume[] = [
  { name: "hanbok", image: Hanbok, koreaName: "한복" },
  { name: "kimono", image: Kimono, koreaName: "기모노" },
  { name: "maid uniform", image: MaidUniform, koreaName: "메이드복" },
  { name: "plate armor", image: PlateArmor, koreaName: "갑옷" },
  { name: "spacesuit", image: Spacesuit, koreaName: "우주인복" },
];

interface Props {
  handleCostume: (Costume: {
    name: string;
    image: string;
    koreanName: string;
  }) => void;
}

const Costume: FC<Props> = ({ handleCostume }) => {
  const handleCostumeClick = (costume: Costume) => {
    handleCostume({
      name: costume.name,
      image: costume.image,
      koreanName: costume.koreaName,
    });
  };
  return (
    <>
      <HairStyleBox>
        {costumes.map((costume) => (
          <CostumeContainer
            key={costume.name}
            onClick={() => handleCostumeClick(costume)}
          >
            <HairStyleImage src={costume.image} alt={costume.name} />
          </CostumeContainer>
        ))}
      </HairStyleBox>
    </>
  );
};

export default Costume;
