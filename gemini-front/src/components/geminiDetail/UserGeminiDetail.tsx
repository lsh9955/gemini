import { Component, FC, useEffect, useRef, useState } from "react";
import {
  ButtonWrapper,
  DescArea,
  DescBlockWrapper,
  FlipContainer,
  Flipper,
  FormLabel,
  GeminiDetailImgWrapper,
  GeminiDetialInfoWrapper,
  GeminiDetialWrapper,
  GeminiDetialWrapperCanFlip,
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
  FlipContainerWrapper,
  HeartImg,
} from "./UserGeminiDetail.styles";
import { LinkImg } from "./MyGeminiDetail.styles";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { FiHeart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import HeartAnimation from "../../assets/animation-effect/HeartAnimation.json";
import { useHistory } from "react-router";
import axiosInstanceWithAccessToken from "../../utils/AxiosInstanceWithAccessToken";
import { Background } from "../../pages/ai_image/AiImage.styles";
import FourCuts from "../main/FourCuts";
import { CgPolaroid } from "react-icons/cg";
import HeartAnime from "../../assets/img/HeartAnime.gif";
import HeartCssEffect from "./HeartCssEffect";

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
  const [geminiName, setGeminiName] = useState<string>("제미니 이름");
  const [desc, setDesc] = useState<string>("소개글");
  const [geminiImg, setGeminiImg] = useState<string>("");
  // "https://mygemini.s3.amazonaws.com/gemini/20230508_132357723467_TestUser.png"

  const [userProfileImg, setuserProfileImg] = useState<string>(
    "https://mygemini.s3.amazonaws.com/gemini/20230508_132357723467_TestUser.png"
  );
  const [userNickname, setUserNickname] = useState<string>("이세계 공주");

  const handleClick = () => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    const fetchGeminiInfo = async () => {
      const galleryRes = await axiosInstanceWithAccessToken.get(
        `/user-service/gallery/${selectedImagePk}`
      ); // 수정 필요😀
      const galleryInfoData = galleryRes.data;
      setGeminiImg(galleryInfoData.geminiImage);
      setuserProfileImg(galleryInfoData.profileImage);
      setUserNickname(galleryInfoData.nickname);
      setGeminiName(galleryInfoData.geminiName);
      setDesc(galleryInfoData.geminiDescription);
      // setTagContents(galleryInfoData.tags);
      setLikeCount(galleryInfoData.totalLike);
      setIsLike(galleryInfoData.isLiked);
      if (galleryInfoData.tags) {
        setTagContents(galleryInfoData.tags);
      }
    };
    fetchGeminiInfo();
  }, []);

  // ❤ 하트 세번째시도
  const [animationVisible, setAnimationVisible] = useState(false); // 상태명을 animationVisible로 변경
  // const lottieRef = useRef<Player | null>(null);
  // 현재 like여부에 따라 하트 채워지고.. 달라짐.
  const [isLike, setIsLike] = useState(false);

  // 하트 클릭에 따른 함수발동
  const likeImage = async () => {
    const res = await axiosInstanceWithAccessToken.post(
      "/user-service/gallery",
      { gallery_no: selectedImagePk }
    );
    // if (lottieRef.current) {
    setAnimationVisible(true);
    // lottieRef.current.play();
    // }
    setIsLike(!isLike);
    return res.data;
  };

  const unlikeImage = async () => {
    const res = await axiosInstanceWithAccessToken.delete(
      `/user-service/gallery/${selectedImagePk}`
    );
    setAnimationVisible(false);
    setIsLike(!isLike);
    return res.data;
  };

  const handleHeartClick = async () => {
    const newLikeCount = isLike ? await unlikeImage() : await likeImage();
    if (newLikeCount !== "fail") {
      setLikeCount(newLikeCount);
      // setLikeCount(1);
    } else {
      // Handle failure case
    }
  };
  // 하트 클릭에 따른 함수발동

  useEffect(() => {
    console.log("animationVisible:", animationVisible); // animationVisible 상태 로깅
  }, [animationVisible]);

  // useEffect(() => {
  //   return () => {
  //     if (lottieRef.current) {
  //       lottieRef.current.stop();
  //       lottieRef.current = null;
  //     }
  //   };
  // }, []);

  const onAnimationComplete = () => {
    setAnimationVisible(false);
    // lottieRef.current = null;
  };

  // flip관련
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const flip = () => setIsFlipped(!isFlipped);

  // flip 된 상태에서 원래대로 돌아가기
  const backModal = () => {
    setIsFlipped(false);
  };

  // history.push 통해서 데이터보내기.
  const useThisRecipeHandler = async () => {
    const geminiNoRes = await axiosInstanceWithAccessToken.get(
      `/user-service/generate/default/gemini/${selectedImagePk}`
    ); // 갤러리PK를 이용, 제미니PK를 얻을 수 있는 요청
    const geminiNo = geminiNoRes.data;

    history.push({
      pathname: "/aiImage",
      state: { galleryPk: geminiNo },
    });
  };

  return (
    <>
      <FlipContainerWrapper onClick={closeModal}>
        <FlipContainer isFlipped={false} onClick={(e) => e.stopPropagation()}>
          <Flipper isFront={true}>
            <GeminiDetailImgWrapper backgroundImage={geminiImg} onClick={flip}>
              <LikeNicknameWrapper>
                <ProfileWrapper
                  onClick={(event) => {
                    event.stopPropagation();
                    window.scrollTo(0, 0); // 무한스크롤 버그 잡기 위해서 해두었습니다. 😥
                    history.push(`/userprofile/${userNickname}`);
                  }}
                >
                  <ProfileImg backgroundImage={userProfileImg}></ProfileImg>
                  <Nickname>{userNickname}</Nickname>
                </ProfileWrapper>
                <LikeWrapper
                  onClick={(event) => {
                    event.stopPropagation();
                    handleHeartClick();
                  }}
                >
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
                <GeminiInfoButton onClick={useThisRecipeHandler}>
                  이 레시피 사용하기
                </GeminiInfoButton>
              </ButtonWrapper>
            </GeminiDetialInfoWrapper>
          </Flipper>
        </FlipContainer>
      </FlipContainerWrapper>
    </>
  );
};

export default UserGeminiDetail;
