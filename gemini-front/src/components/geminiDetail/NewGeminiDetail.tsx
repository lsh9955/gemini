import { FC, useEffect, useState } from "react";
import {
  ButtonWrapper,
  DescBlockWrapper,
  FormLabel,
  GeminiDetailImgWrapper,
  GeminiDetialInfoWrapper,
  GeminiDetialWrapper,
  GeminiInfoButton,
  HeartIcon,
  LikeCount,
  LikeNicknameWrapper,
  LikeWrapper,
  LinkProfileWrapper,
  NameInputWrapper,
  TagArea,
  TagBlockWrapper,
  Tags,
  ToggleButtonCircle,
  ToggleButtonContainer,
  ToggleText,
  ToggleWrapper,
} from "./UserGeminiDetail.styles";

import { DescInput, EnrollButton, TextInput } from "./NewGeminiDetail.styles";
import {
  EditButton,
  EditButtonWrapper,
  LinkImg,
} from "./MyGeminiDetail.styles";

const NewGeminiDetail: FC = () => {
  const [isOn, setIsOn] = useState<boolean>(false);
  const [tagContents, setTagContents] = useState<string[]>([
    "인간",
    "여성",
    "빨강머리",
    "기모노",
    "에메랄드 눈동자",
    "묶은 머리",
    "무사",
  ]);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [geminiName, setGeminiName] = useState<string>("나나키타 미즈키");
  const [desc, setDesc] = useState<string>(
    "나나키타 미즈키의 설명을 입력해주세요."
  );
  const [geminiImg, setGeminiImg] = useState<string>(
    "https://mygemini.s3.amazonaws.com/gemini/20230508_132357723467_TestUser.png"
  );

  const handleClick = () => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    const fetchTags = async () => {
      // const res = await fetch(/* your API endpoint */);
      // const data = await res.json();
      // setTagContents(data.tags); // Set the state with the fetched tags
      // setDesc(data.desc)
      // setGeminiImg(data.imgUrl)
    };
    // setTagContents(res); // 이걸 바탕으로..
  }, []);

  return (
    <>
      <GeminiDetialWrapper>
        <GeminiDetailImgWrapper backgroundImage={geminiImg}>
          {/* <LikeNicknameWrapper>
            <LinkProfileWrapper>
              <LinkImg></LinkImg>
            </LinkProfileWrapper>
            <LikeWrapper>
              <HeartIcon>❤️</HeartIcon>
              <LikeCount>{likeCount}개의 좋아요</LikeCount>
            </LikeWrapper>
          </LikeNicknameWrapper> */}
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
              value={geminiName}
              onChange={(e) => setGeminiName(e.target.value)}
              placeholder="15글자 이하 한글, 영어, 숫자만 입력가능"
            ></TextInput>
          </NameInputWrapper>
          <DescBlockWrapper>
            <FormLabel>소개</FormLabel>
            <DescInput>{desc}</DescInput>
          </DescBlockWrapper>
          <TagBlockWrapper>
            <FormLabel>키워드</FormLabel>
            <TagArea>
              {tagContents.map((tag, index) => (
                <Tags key={index}>{tag}</Tags>
              ))}
            </TagArea>
          </TagBlockWrapper>
          <ButtonWrapper>
            <EditButtonWrapper>
              <EnrollButton>계약하기</EnrollButton>
              <EnrollButton>놓아주기</EnrollButton>
            </EditButtonWrapper>
          </ButtonWrapper>
        </GeminiDetialInfoWrapper>
      </GeminiDetialWrapper>
    </>
  );
};

export default NewGeminiDetail;
