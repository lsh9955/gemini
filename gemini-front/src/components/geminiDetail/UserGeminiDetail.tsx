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
  Nickname,
  ProfileImg,
  ProfileWrapper,
  TagArea,
  TagBlockWrapper,
  Tags,
  TextInputDiv,
  ToggleButtonCircle,
  ToggleButtonContainer,
  ToggleText,
  ToggleWrapper,
} from "./UserGeminiDetail.styles";
import { LinkImg } from "./MyGeminiDetail.styles";

const UserGeminiDetail: FC = () => {
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
  const [desc, setDesc] = useState<string>("방랑무사 나나키타 미즈키입니다. ");
  const [geminiImg, setGeminiImg] = useState<string>(
    "https://mygemini.s3.amazonaws.com/gemini/20230508_132357723467_TestUser.png"
  );

  const [userProfileImg, setuserProfileImg] = useState<string>(
    "https://mygemini.s3.amazonaws.com/gemini/20230508_132357723467_TestUser.png"
  );
  const [userNickname, setUserNickname] = useState<string>("이세계 공주");

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
            <ProfileWrapper>
              <ProfileImg backgroundImage={userProfileImg}></ProfileImg>
              <Nickname>{userNickname}</Nickname>
            </ProfileWrapper>
            <LikeWrapper>
              <HeartIcon>❤️</HeartIcon>
              <LikeCount>{likeCount}개의 좋아요</LikeCount>
            </LikeWrapper>
          </LikeNicknameWrapper>
        </GeminiDetailImgWrapper>
        <GeminiDetialInfoWrapper>
          <ToggleWrapper hideToggle={true}>
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
          <DescBlockWrapper hideToggle={true}>
            <FormLabel>소개</FormLabel>
            <DescArea>{desc}</DescArea>
          </DescBlockWrapper>
          <TagBlockWrapper hideToggle={true}>
            <FormLabel>키워드</FormLabel>
            <TagArea>
              {/* <Tags>화이팅</Tags>
              <Tags>좀만 더 힘내자</Tags>
              <Tags>조금 더 다듬어봤다.</Tags>
              <Tags>이거 기반으로 세쌍둥이 컴포넌트 ㄱㄱ</Tags>
              <Tags>태그가</Tags>
              <Tags>스크롤바 넣고 hidden으로 숨김</Tags>
              <Tags>레이아웃 무너집니까?</Tags>
              <Tags>레이아웃 무너집니까?</Tags>
              <Tags>응 예외처리하세요</Tags> */}
              {tagContents.map((tag, index) => (
                <Tags key={index}>{tag}</Tags>
              ))}
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

export default UserGeminiDetail;
