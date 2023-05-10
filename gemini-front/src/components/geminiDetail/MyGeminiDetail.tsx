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
  HeartIcon,
  LikeCount,
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
import {
  EditButton,
  EditButtonWrapper,
  LinkImg,
} from "./MyGeminiDetail.styles";

interface MyGeminiDetailProps {
  closeModal: () => void;
  selectedImagePk: number | null;
}

const MyGeminiDetail: FC<MyGeminiDetailProps> = ({
  closeModal,
  selectedImagePk,
}) => {
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
  const [desc, setDesc] = useState<string>("소개글");
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
          <LikeNicknameWrapper>
            <LinkProfileWrapper>
              <LinkImg></LinkImg>
            </LinkProfileWrapper>
            <LikeWrapper>
              <HeartIcon>❤️</HeartIcon>
              <LikeCount>{likeCount}개의 좋아요</LikeCount>
            </LikeWrapper>
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
              {geminiName}
            </TextInputDiv>
          </NameInputWrapper>
          <DescBlockWrapper>
            <FormLabel>소개</FormLabel>
            <DescArea>{desc}</DescArea>
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
            <GeminiInfoButton>이 레시피 사용하기</GeminiInfoButton>
            <EditButtonWrapper>
              <EditButton>수정</EditButton>
              <EditButton>저장</EditButton>
            </EditButtonWrapper>
          </ButtonWrapper>
        </GeminiDetialInfoWrapper>
      </GeminiDetialWrapper>
    </>
  );
};

export default MyGeminiDetail;
