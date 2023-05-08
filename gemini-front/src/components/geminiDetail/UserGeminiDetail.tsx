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
  NameInputWrapper,
  TagArea,
  TextInput,
  ToggleButtonCircle,
  ToggleButtonContainer,
  ToggleText,
  ToggleWrapper,
} from "./UserGeminiDetail.styles";

const UserGeminiDetail: FC = () => {
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
            <ToggleText>공개</ToggleText>
            <ToggleButtonContainer onClick={handleClick} isOn={isOn}>
              <ToggleButtonCircle isOn={isOn} />
            </ToggleButtonContainer>
            <ToggleText>비공개</ToggleText>
          </ToggleWrapper>
          <NameInputWrapper>
            <FormLabel>이름</FormLabel>
            <TextInput
              type="text"
              id="nickname"
              // value={nickname}
              // onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임은 2~15글자 한글, 영어, 숫자만 입력 가능합니다."
            ></TextInput>
          </NameInputWrapper>
          <FormLabel>소개</FormLabel>

          <div>
            <TagArea>{"Tags"}</TagArea>
          </div>
        </GeminiDetialInfoWrapper>
        <GeminiInfoButton></GeminiInfoButton>
      </GeminiDetialWrapper>
    </>
  );
};

export default UserGeminiDetail;
