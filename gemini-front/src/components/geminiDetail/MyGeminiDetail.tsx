import { FC, useState } from "react";
import {
  FormLabel,
  GeminiDetailImgWrapper,
  GeminiDetialInfoWrapper,
  GeminiDetialWrapper,
  GeminiInfoButton,
  LikeNicknameWrapper,
  LikeWrapper,
  LinkProfileWrapper,
  TagArea,
  TextInput,
  ToggleButtonCircle,
  ToggleButtonContainer,
  ToggleText,
  ToggleWrapper,
} from "./UserGeminiDetail.styles";

const MyGeminiDetail: FC = () => {
  const [isOn, setIsOn] = useState<boolean>(false);

  const handleClick = () => {
    setIsOn(!isOn);
  };

  return (
    <>
      <GeminiDetialWrapper>
        <GeminiDetailImgWrapper backgroundImage="asd">
          <LikeNicknameWrapper>
            <LinkProfileWrapper></LinkProfileWrapper>
            <LikeWrapper></LikeWrapper>
          </LikeNicknameWrapper>
        </GeminiDetailImgWrapper>
        <GeminiDetialInfoWrapper>
          <ToggleWrapper>
            <ToggleText></ToggleText>
            <ToggleButtonContainer onClick={handleClick} isOn={isOn}>
              <ToggleButtonCircle isOn={isOn} />
            </ToggleButtonContainer>
            <ToggleText></ToggleText>
          </ToggleWrapper>
          <div>
            <FormLabel></FormLabel>
            <TextInput></TextInput>
          </div>

          <div>
            <TagArea>{"Tags"}</TagArea>
          </div>
        </GeminiDetialInfoWrapper>
        <GeminiInfoButton></GeminiInfoButton>
      </GeminiDetialWrapper>
    </>
  );
};

export default MyGeminiDetail;
