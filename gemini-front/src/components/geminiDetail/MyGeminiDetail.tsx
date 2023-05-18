import { FC, useEffect, useState } from "react";
import {
  ButtonWrapper,
  DescArea,
  DescBlockWrapper,
  FlipContainerWrapper,
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
  ProfileChangeButton,
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
  MyGeminFlipContainer,
  MyGeminiFlipContainerWrapper,
  MyLikeWrapper,
} from "./MyGeminiDetail.styles";
import axiosInstanceWithAccessToken from "../../utils/AxiosInstanceWithAccessToken";
import { updateHeaderProfileImg } from "../../store/UserSlice";

interface MyGeminiDetailProps {
  closeModal: () => void;
  selectedImagePk: number | null;
  setProfileImg: (imgUrl: string) => void;
}

const MyGeminiDetail: FC<MyGeminiDetailProps> = ({
  closeModal,
  selectedImagePk,
  setProfileImg,
}) => {
  const [isPublic, setIsPublic] = useState<boolean>(false);
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
    setIsPublic(!isPublic);
  };

  const profileImgUpdate = async () => {
    try {
      const profileUpdateRes = await axiosInstanceWithAccessToken.post(
        `/user-service/profile/profileImage`,
        { geminiPk: selectedImagePk }
      );
      setProfileImg(geminiImg);
      updateHeaderProfileImg(geminiImg);
    } catch (error) {
      console.error(error);
      // 오류 처리
    }
  };

  const updateGalleryOnPublic = async () => {
    // const GalleryPublicRes = await axiosInstanceWithAccessToken.post(
    //   `user-service/gallery/enrollment`,
    //   { geminiPk: selectedImagePk, isPublic: isPublic }
    // );

    // console.log(
    //   "업데이트 되었나? geminiPk와 isPublic을 body에 담는데, userInfo 확인해서 유효성 검사하고. true로 보낸다면-> 갤러리에 해당 geminipk가 있는지 조회하고, 있으면 그대로 두고, 없을시 신설. false로 보낼시, 있는지 조회하고 있으면 삭제."
    // );
    // console.log(GalleryPublicRes);
    // alert("변경사항이 반영되었습니다.");
    // closeModal();
    try {
      console.log(
        `보낸다 ${{ geminiPk: selectedImagePk, isPublic: isPublic }}`
      );
      console.log(selectedImagePk);
      console.log(isPublic);
      const GalleryPublicRes = await axiosInstanceWithAccessToken.post(
        `/user-service/gallery/enrollment`,
        { geminiPk: selectedImagePk, isPublic: isPublic }
      );
      console.log(GalleryPublicRes);

      const { method, updated } = GalleryPublicRes.data;

      if (updated) {
        // ${method}.
        alert(`변경사항이 정상적으로 반영되었습니다.`);
      } else {
        // alert(`No action was performed. The gallery was already ${method === "created" ? "public" : "private"}.`); // 변경사항 없으면 그냥 닫음.
      }

      closeModal();
    } catch (error) {
      console.error("An error occurred:", error);
      alert("변경사항이 반영되지 않았습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    const fetchGeminiInfo = async () => {
      // const res = await fetch(/* your API endpoint */);
      // const data = await res.json();
      const geminiRes = await axiosInstanceWithAccessToken.get(
        `/user-service/gallery/gemini/${selectedImagePk}`
      );
      const geminiInfoData = geminiRes.data;
      setGeminiImg(geminiInfoData.geminiImage);
      setGeminiName(geminiInfoData.geminiName);
      setDesc(geminiInfoData.geminiDescription);
      setLikeCount(geminiInfoData.totalLike);
      setIsPublic(geminiInfoData.isPublic);
      if (geminiInfoData.tags) {
        setTagContents(geminiInfoData.tags);
      }
    };
    // setTagContents(res); // 이걸 바탕으로..

    fetchGeminiInfo();
  }, []);

  return (
    <>
      <MyGeminiFlipContainerWrapper onClick={closeModal}>
        <MyGeminFlipContainer
          isFlipped={false}
          onClick={(e) => e.stopPropagation()}
        >
          <GeminiDetailImgWrapper backgroundImage={geminiImg}>
            <LikeNicknameWrapper>
              <LinkProfileWrapper>
                <LinkImg></LinkImg>
              </LinkProfileWrapper>
              <MyLikeWrapper>
                <HeartIcon>❤️</HeartIcon>
                <LikeCount>{likeCount}개의 좋아요</LikeCount>
                <ProfileChangeButton onClick={profileImgUpdate}>
                  프로필사진 변경
                </ProfileChangeButton>
              </MyLikeWrapper>
            </LikeNicknameWrapper>
          </GeminiDetailImgWrapper>
          <GeminiDetialInfoWrapper>
            <ToggleWrapper>
              <ToggleText>공개</ToggleText>
              <ToggleButtonContainer onClick={handleClick} isOn={isPublic}>
                <ToggleButtonCircle isOn={isPublic} />
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
                {tagContents?.map((tag, index) => (
                  <Tags key={index}>{tag}</Tags>
                ))}
              </TagArea>
            </TagBlockWrapper>
            <ButtonWrapper>
              <GeminiInfoButton>이 레시피 사용하기</GeminiInfoButton>
              <EditButtonWrapper>
                <EditButton>수정</EditButton>
                <EditButton onClick={updateGalleryOnPublic}>저장</EditButton>
              </EditButtonWrapper>
            </ButtonWrapper>
          </GeminiDetialInfoWrapper>
        </MyGeminFlipContainer>
      </MyGeminiFlipContainerWrapper>
    </>
  );
};

export default MyGeminiDetail;
