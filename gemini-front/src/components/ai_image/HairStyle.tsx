import React, { FC, useState } from "react";
import {
  HairStyleBox,
  HairStyleContainer,
  HairStyleImage,
  HairStyleText,
  PickedHairStyleContainer,
} from "./HairStyle.style";

// import LongCur from "../../assets/img/ai/hair/LongCur.png";
// import LongLowTwintail from "../../assets/img/ai/hair/LongLowTwintail.png";
// import LongOneEyeCover from "../../assets/img/ai/hair/LongOneEyeCover.png";
// import LongPonytail from "../../assets/img/ai/hair/LongPonytail.png";
// import LongStraight from "../../assets/img/ai/hair/LongStraight.png";
// import LongTwinBraides from "../../assets/img/ai/hair/LongTwinBraides.png";
// import LongTwintail from "../../assets/img/ai/hair/LongTwintail.png";
// import ShortCur from "../../assets/img/ai/hair/ShortCur.png";
// import ShortMessy from "../../assets/img/ai/hair/ShortMessy.png";
// import ShortOneEyeCover from "../../assets/img/ai/hair/ShortOneEyeCover.png";

// interface HairStyle {
//   name: string;
//   image: string;
//   koreanName: string;
//   hairlength: string;
//   hairstyle: string;
// }

// const hairStyles: HairStyle[] = [
//   {
//     name: "LongStraight",
//     image: LongStraight,
//     koreanName: "긴 생머리",
//     hairlength: "long",
//     hairstyle: "straight hair",
//   },
//   {
//     name: "LongOneEyeCover",
//     image: LongOneEyeCover,
//     koreanName: "한 쪽 눈 가린 긴머리",
//     hairlength: "long",
//     hairstyle: "one eye cover hair",
//   },
//   {
//     name: "LongCur",
//     image: LongCur,
//     koreanName: "긴 곱슬머리",
//     hairlength: "long",
//     hairstyle: "cur hair",
//   },
//   {
//     name: "LongPonytail",
//     image: LongPonytail,
//     koreanName: "포니테일 긴머리",
//     hairlength: "long",
//     hairstyle: "pony tail",
//   },
//   {
//     name: "LongTwintail",
//     image: LongTwintail,
//     koreanName: "트윈테일 긴머리",
//     hairlength: "long",
//     hairstyle: "twin tail",
//   },
//   {
//     name: "LongLowTwintail",
//     image: LongLowTwintail,
//     koreanName: "낮은 트윈테일 긴머리",
//     hairlength: "long",
//     hairstyle: "low twin tail",
//   },
//   {
//     name: "LongTwinBraides",
//     image: LongTwinBraides,
//     koreanName: "양갈래 땋은 머리",
//     hairlength: "long",
//     hairstyle: "twin braides",
//   },
//   {
//     name: "ShortOneEyeCover",
//     image: ShortOneEyeCover,
//     koreanName: "한 쪽 눈 가린 짧은머리",
//     hairlength: "short",
//     hairstyle: "one eye cover hair",
//   },
//   {
//     name: "ShortMessy",
//     image: ShortMessy,
//     koreanName: "헝클어진 짧은머리",
//     hairlength: "short",
//     hairstyle: "messy hair",
//   },
//   {
//     name: "ShortCur",
//     image: ShortCur,
//     koreanName: "짧은 곱슬머리",
//     hairlength: "short",
//     hairstyle: "cur hair",
//   },
// ];

// interface Props {
//   handleHairStyle: (HairStyle: {
//     name: string;
//     koreanName: string;
//     hairlength: string;
//     hairstyle: string;
//   }) => void;
// }

interface Data {
  tagId: number;
  koreanName: string;
  imgUrl: string;
}

interface Props {
  data: Data[];
  handleHairStyle: (hairStyle: Data) => void;
}

const HairStyle: FC<Props> = ({ data, handleHairStyle }) => {
  // const [clickHairStyle, setClickHairStyle] = useState<string>("");
  // const handleHairStyleClick = (hairStyle: HairStyle) => {
  //   handleHairStyle({
  //     name: hairStyle.name,
  //     koreanName: hairStyle.koreanName,
  //     hairlength: hairStyle.hairlength,
  //     hairstyle: hairStyle.hairstyle,
  //   });
  //   setClickHairStyle(hairStyle.name);
  // };
  const [pickedHair, setPickedHair] = useState<any>(null);
  const handleHairStyleClick = (item: Data) => {
    handleHairStyle({
      tagId: item.tagId,
      imgUrl: item.imgUrl,
      koreanName: item.koreanName,
    });
  };

  return (
    <>
      <HairStyleBox>
        {data?.map((item) =>
          pickedHair === item.koreanName ? (
            <PickedHairStyleContainer
              key={item.tagId}
              onClick={() => {
                handleHairStyleClick(item);
                setPickedHair(item.koreanName);
              }}
            >
              <HairStyleText>{item.koreanName}</HairStyleText>
              <HairStyleImage src={item.imgUrl} alt={item.koreanName} />
            </PickedHairStyleContainer>
          ) : (
            <HairStyleContainer
              key={item.tagId}
              onClick={() => {
                handleHairStyleClick(item);
                setPickedHair(item.koreanName);
              }}
            >
              <HairStyleText>{item.koreanName}</HairStyleText>
              <HairStyleImage src={item.imgUrl} alt={item.koreanName} />
            </HairStyleContainer>
          )
        )}
      </HairStyleBox>
    </>
  );
};

export default HairStyle;
