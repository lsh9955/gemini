import { FC, useEffect, useState } from "react";
import {
  ButtonWrapper,
  DescArea,
  DescBlockWrapper,
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
  TagBlockWrapper,
  Tags,
  TextInput,
  TextInputDiv,
  ToggleButtonCircle,
  ToggleButtonContainer,
  ToggleText,
  ToggleWrapper,
} from "./UserGeminiDetail.styles";

const MyGeminiDetail: FC = () => {
  const [isOn, setIsOn] = useState<boolean>(false);
  const [tagContents, setTagContents] = useState<string[]>([]);

  const handleClick = () => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    const fetchTags = () => {};
    const res = fetchTags();
    // setTagContents(res);
  }, []);

  return (
    <>
      <GeminiDetialWrapper>
        <GeminiDetailImgWrapper backgroundImage="https://mygemini.s3.amazonaws.com/gemini/20230508_132357723467_TestUser.png">
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
            <TextInputDiv
            // type="text"
            // id="nickname"
            // value={nickname}
            // onChange={(e) => setNickname(e.target.value)}
            >
              닉네임
            </TextInputDiv>
          </NameInputWrapper>
          <DescBlockWrapper>
            <FormLabel>소개</FormLabel>
            <DescArea>
              {"나는 목에 애벌레가 있는 슬픈 짐승이야 글자 크기는 좀 줄이자."}
            </DescArea>
          </DescBlockWrapper>
          <TagBlockWrapper>
            <FormLabel>키워드</FormLabel>
            <TagArea>
              <Tags>화이팅</Tags>
              <Tags>좀만 더 힘내자</Tags>
              <Tags>조금 더 다듬어봤다.</Tags>
              <Tags>이거 기반으로 세쌍둥이 컴포넌트 ㄱㄱ</Tags>
              <Tags>태그가</Tags>
              <Tags>스크롤바 넣고 hidden으로 숨김</Tags>
              <Tags>레이아웃 무너집니까?</Tags>
              <Tags>레이아웃 무너집니까?</Tags>
              <Tags>응 예외처리하세요</Tags>
            </TagArea>
          </TagBlockWrapper>
          <ButtonWrapper>
            <GeminiInfoButton>이 레시피 사용하기</GeminiInfoButton>
          </ButtonWrapper>
        </GeminiDetialInfoWrapper>
      </GeminiDetialWrapper>
    </>
  );
};

export default MyGeminiDetail;
