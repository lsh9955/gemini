import { Component, FC, useEffect, useRef, useState } from "react";
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
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { FiHeart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import HeartAnimation from "../../assets/animation-effect/HeartAnimation.json";
import { useHistory } from "react-router";
import axiosInstanceWithAccessToken from "../../utils/AxiosInstanceWithAccessToken";

interface UserGeminiDetailProps {
  closeModal: () => void;
  selectedImagePk: number | null;
}

const UserGeminiDetail: FC<UserGeminiDetailProps> = ({
  closeModal,
  selectedImagePk,
}) => {
  const history = useHistory();
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
    const fetchGeminiInfo = async () => {
      const res = axiosInstanceWithAccessToken.get(`/user-service/gallery/{}`); // 수정 필요😀
      // const res = await fetch(/* your API endpoint */);
      // const data = await res.json();
      // setTagContents(data.tags); // Set the state with the fetched tags
      // setDesc(data.desc)
      // setGeminiImg(data.imgUrl)
    };
    // setTagContents(res); // 이걸 바탕으로..
    fetchGeminiInfo();
  }, []);

  // ❤ 하트 세번째시도
  const [animationVisible, setAnimationVisible] = useState(false);
  const lottieRef = useRef<Player | null>(null);
  const handleComponentClick = () => {
    if (!isLike) {
      setIsLike(!isLike);
      if (lottieRef.current) {
        setAnimationVisible(true);
        lottieRef.current.play();
      }
    } else {
      setIsLike(!isLike);
    }
  };
  const onAnimationComplete = () => {
    setAnimationVisible(false);
  };

  // 현재 like여부에 따라 하트 채워지고.. 달라짐.
  const [isLike, setIsLike] = useState(false);

  return (
    <>
      <GeminiDetialWrapper>
        <Player
          ref={lottieRef}
          src={HeartAnimation}
          background="transparent"
          speed={1.1} // 속도 조정 가능
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: animationVisible ? "block" : "none",
          }}
          autoplay={false}
          loop={false}
          onEvent={(event) => {
            if (event === "complete") onAnimationComplete();
          }}
        />

        <GeminiDetailImgWrapper backgroundImage={geminiImg}>
          <LikeNicknameWrapper>
            <ProfileWrapper
              onClick={() => history.push(`/userprofile/${userNickname}`)}
            >
              <ProfileImg backgroundImage={userProfileImg}></ProfileImg>
              <Nickname>{userNickname}</Nickname>
            </ProfileWrapper>
            <LikeWrapper onClick={handleComponentClick}>
              <HeartIcon>{isLike ? <FaHeart /> : <FiHeart />}</HeartIcon>
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
            <TextInputDiv>{geminiName}</TextInputDiv>
          </NameInputWrapper>
          <DescBlockWrapper hideToggle={true}>
            <FormLabel>소개</FormLabel>
            <DescArea>{desc}</DescArea>
          </DescBlockWrapper>
          <TagBlockWrapper hideToggle={true}>
            <FormLabel>키워드</FormLabel>
            <TagArea>
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
