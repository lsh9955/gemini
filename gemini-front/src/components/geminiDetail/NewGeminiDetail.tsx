import { FC, useEffect, useState } from "react";
import {
  ButtonWrapper,
  DescBlockWrapper,
  FormLabel,
  GeminiDetailImgWrapper,
  GeminiDetialInfoWrapper,
  NameInputWrapper,
  TagArea,
  TagBlockWrapper,
  Tags,
  ToggleButtonCircle,
  ToggleButtonContainer,
  ToggleText,
  ToggleWrapper,
} from "./UserGeminiDetail.styles";

import {
  DescInput,
  EnrollButton,
  NewGeminFlipContainer,
  NewGeminiFlipContainerWrapper,
  TextInput,
} from "./NewGeminiDetail.styles";
import { EditButtonWrapper } from "./MyGeminiDetail.styles";
import axiosInstanceWithAccessToken from "../../utils/AxiosInstanceWithAccessToken";

interface MyGeminiDetailProps {
  closeModal: () => void;
  selectedImagePk: number | null; // geminiPk
}

const NewGeminiDetail: FC<MyGeminiDetailProps> = ({
  closeModal,
  selectedImagePk,
}) => {
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [tagContents, setTagContents] = useState<string[]>([
    "인간",
    "여성",
    "빨강머리",
    "기모노",
    "에메랄드 눈동자",
    "묶은 머리",
    "무사",
  ]);
  console.log("잘왔나?", selectedImagePk);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [geminiName, setGeminiName] = useState<string>("새로운 제미니 이름");
  const [desc, setDesc] = useState<string>("소개글을 입력해주세요.");
  const [geminiImg, setGeminiImg] = useState<string>(
    ""
    // "https://mygemini.s3.amazonaws.com/gemini/20230508_132357723467_TestUser.png"
  );

  const handleClick = () => {
    setIsPublic(!isPublic);
  };

  const contractGemini = async () => {
    console.log(
      `바디로 들어오는거. ${selectedImagePk} ${geminiName} ${desc} ${isPublic}`
    );
    const contractRes = await axiosInstanceWithAccessToken.post(
      "/user-service/alarms/gemini",
      {
        geminiNo: selectedImagePk,
        name: geminiName,
        description: desc,
        isPublic: isPublic,
      }
    );
    // header에 X-username 토큰을 통해서 들어감.
    closeModal();
    if (contractRes.status === 200) {
      return contractRes.data;
    } else {
      return null;
    }
    // 생성해서 알람이 온 시점에 이미 제미니는 생성되어있음.
    // 정보만 update 해주면 된다.
    // isPublic 공개상태에 따라서 gallery에 등록할지 안할지 분기처리.
  };

  const deleteGemini = () => {};

  useEffect(() => {
    // 처음에 알람이 왔을때 클릭을 하면 prop이용, geminiPk로 줄것임.
    // 마지막 버튼에 patch요청 보내서 갤러리에 생성을 하면 됨.
    const fetchNewGeminiInfo = async () => {
      console.log(`${selectedImagePk}번 제미니pk로 요청보냄. 계약해달라고!`);
      const geminiRes = await axiosInstanceWithAccessToken.get(
        `/user-service/gallery/gemini/${selectedImagePk}`
      );
      const geminiInfoData = geminiRes.data;
      console.log(geminiRes);
      setGeminiImg(geminiInfoData.geminiImage);
      setGeminiName("");
      setDesc("");
      setIsPublic(true); // 기본은 공개임. display 되는건 !isPublic
      if (geminiInfoData.tags) {
        setTagContents(geminiInfoData.tags);
      }

      // const res = await fetch(/* your API endpoint */);
      // const data = await res.json();
      // setTagContents(data.tags); // Set the state with the fetched tags
      // setDesc(data.desc)
      // setGeminiImg(data.imgUrl)
    };
    fetchNewGeminiInfo();
    // setTagContents(res); // 이걸 바탕으로..
  }, []);

  // 모달 밖을 눌러서 닫는 액션을 취하면 안됨 (버그의 원인. 빈 정보의 제미니가 나옴.)
  return (
    <>
      <NewGeminiFlipContainerWrapper>
        <NewGeminFlipContainer
          isFlipped={false}
          onClick={(e) => e.stopPropagation()}
        >
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
              {/* isPublic의 반대값을 줘야함. BE와 통신할때는 true로 보내는데, toggle로 보여지는 상태는 false */}
              <ToggleButtonContainer onClick={handleClick} isOn={!isPublic}>
                <ToggleButtonCircle isOn={!isPublic} />
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
              {/* <DescInput onInput={(e) => setDesc(e.currentTarget.innerText)}>
                {desc}
              </DescInput> */}
              <DescInput
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="GEMINI의 소개를 입력해주세요."
              >
                {desc}
              </DescInput>
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
              <EditButtonWrapper>
                <EnrollButton onClick={contractGemini}>계약하기</EnrollButton>
                <EnrollButton onClick={closeModal}>놓아주기</EnrollButton>
              </EditButtonWrapper>
            </ButtonWrapper>
          </GeminiDetialInfoWrapper>
        </NewGeminFlipContainer>
      </NewGeminiFlipContainerWrapper>
    </>
  );
};

export default NewGeminiDetail;
