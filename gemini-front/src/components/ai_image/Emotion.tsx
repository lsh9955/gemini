import React, { FC, useState } from "react";
import {
  EmotionBox,
  EmotionContainer,
  EmotionImage,
  EmotionText,
  PickedEmotionContainer,
} from "./Emotion.styles";

// import AngryFace from "../../assets/img/ai/emotion/AngryFace.png";
// import BrightSmileFace from "../../assets/img/ai/emotion/BrightSmileFace.png";
// import ShamefulFace from "../../assets/img/ai/emotion/ShamefulFace.png";
// import DespairFace from "../../assets/img/ai/emotion/DespairFace.png";
// import EcstasyFace from "../../assets/img/ai/emotion/EcstasyFace.png";
// import EvillFace from "../../assets/img/ai/emotion/EvilFace.png";
// import SadFace from "../../assets/img/ai/emotion/SadFace.png";
// import SeriousFace from "../../assets/img/ai/emotion/SeriousFace.png";
// import SleepyFace from "../../assets/img/ai/emotion/SleepyFace.png";

// interface Emotion {
//   name: string;
//   image: string;
//   koreanName: string;
// }

// const emotions: Emotion[] = [
//   {
//     name: "bright smile face",
//     image: BrightSmileFace,
//     koreanName: "해맑은 미소",
//   },
//   {
//     name: "sleepy face",
//     image: SleepyFace,
//     koreanName: "졸린 표정",
//   },
//   {
//     name: "shameful face",
//     image: ShamefulFace,
//     koreanName: "부끄러운 표정",
//   },
//   {
//     name: "angry face",
//     image: AngryFace,
//     koreanName: "화난 표정",
//   },
//   {
//     name: "sad face",
//     image: SadFace,
//     koreanName: "슬픈 표정",
//   },
//   {
//     name: "serious face",
//     image: SeriousFace,
//     koreanName: "심각한 표정",
//   },
//   {
//     name: "evil face",
//     image: EvillFace,
//     koreanName: "사악한 표정",
//   },
//   {
//     name: "despair face",
//     image: DespairFace,
//     koreanName: "절망한 표정",
//   },
//   {
//     name: "ecstasy face",
//     image: EcstasyFace,
//     koreanName: "황홀한 표정",
//   },
// ];

// interface Props {
//   handleEmotion: (Emotion: {
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
  handleEmotion: (emotion: Data) => void;
}
const Emotion: FC<Props> = ({ data, handleEmotion }) => {
  // const handleEmotionClick = (emotion: Emotion) => {
  //   handleEmotion({
  //     name: emotion.name,
  //     image: emotion.image,
  //     koreanName: emotion.koreanName,
  //   });
  // };
  const [pickedEmo, setPickedEmo] = useState<any>(null);
  const handleEmotionClick = (item: Data) => {
    handleEmotion({
      tagId: item.tagId,
      imgUrl: item.imgUrl,
      koreanName: item.koreanName,
    });
  };
  return (
    <>
      <EmotionBox>
        {data?.map((item) =>
          pickedEmo === item.koreanName ? (
            <PickedEmotionContainer
              key={item.tagId}
              onClick={() => {
                handleEmotionClick(item);
                setPickedEmo(item.koreanName);
              }}
            >
              <EmotionText>{item.koreanName}</EmotionText>
              <EmotionImage src={item.imgUrl} alt={item.koreanName} />
            </PickedEmotionContainer>
          ) : (
            <EmotionContainer
              key={item.tagId}
              onClick={() => {
                handleEmotionClick(item);
                setPickedEmo(item.koreanName);
              }}
            >
              <EmotionText>{item.koreanName}</EmotionText>
              <EmotionImage src={item.imgUrl} alt={item.koreanName} />
            </EmotionContainer>
          )
        )}
      </EmotionBox>
    </>
  );
};

export default Emotion;
