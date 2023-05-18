import React, { FC, useState } from "react";
import {
  CostumeBox,
  CostumeContainer,
  CostumeImage,
  CostumeText,
  PickedCostumeContainer,
} from "./Costume.styles";

// import Hanbok from "../../assets/img/ai/costume/Hanbok.png";
// import Kimono from "../../assets/img/ai/costume/Kimono.png";
// import MaidUniform from "../../assets/img/ai/costume/MaidUniform.png";
// import PlateArmor from "../../assets/img/ai/costume/PlateArmor.png";
// import Spacesuit from "../../assets/img/ai/costume/Spacesuit.png";

// interface Costume {
//   name: string;
//   image: string;
//   koreanName: string;
// }

// const costumes: Costume[] = [
//   { name: "hanbok", image: Hanbok, koreanName: "한복" },
//   { name: "kimono", image: Kimono, koreanName: "기모노" },
//   { name: "maid uniform", image: MaidUniform, koreanName: "메이드복" },
//   { name: "plate armor", image: PlateArmor, koreanName: "갑옷" },
//   { name: "spacesuit", image: Spacesuit, koreanName: "우주인복" },
// ];

// interface Props {
//   handleCostume: (Costume: {
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
  handleCostume: (costume: Data) => void;
}

const Costume: FC<Props> = ({ data, handleCostume }) => {
  const [pickedCostume, setPickedCostume] = useState<any>(null);

  const handleCostumeClick = (item: Data) => {
    handleCostume({
      tagId: item.tagId,
      imgUrl: item.imgUrl,
      koreanName: item.koreanName,
    });
  };
  return (
    <>
      <CostumeBox>
        {data?.map((item) =>
          pickedCostume === item.koreanName ? (
            <PickedCostumeContainer
              key={item.tagId}
              onClick={() => {
                handleCostumeClick(item);
                setPickedCostume(item.koreanName);
              }}
            >
              <CostumeText>{item.koreanName}</CostumeText>
              <CostumeImage src={item.imgUrl} alt={item.koreanName} />
            </PickedCostumeContainer>
          ) : (
            <CostumeContainer
              key={item.tagId}
              onClick={() => {
                handleCostumeClick(item);
                setPickedCostume(item.koreanName);
              }}
            >
              <CostumeText>{item.koreanName}</CostumeText>
              <CostumeImage src={item.imgUrl} alt={item.koreanName} />
            </CostumeContainer>
          )
        )}
      </CostumeBox>
    </>
  );
};

export default Costume;
