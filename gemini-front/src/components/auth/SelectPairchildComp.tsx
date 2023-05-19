import React, { FC, useEffect, useState } from "react";
import {
  SelectPairchildWrapper,
  FormLabel,
  TextInput,
  TextArea,
  InputWrapper,
  CharacterContainer,
  CharacterImage,
  SubmitButton,
  NicknameLabel,
  PairchildNameContainer,
  PairchildName,
  // Overlay,
} from "./SelectPairchildComp.styles";
import axiosInstanceWithAccessToken from "../../utils/AxiosInstanceWithAccessToken";
import { useHistory } from "react-router-dom";

const SelectPairchildComp: FC = () => {
  const history = useHistory();
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [showAriesName, setShowAriesName] = useState(false);
  const [showLeoName, setShowLeoName] = useState(false);

  const [characterUrls, setCharacterUrls] = useState<string[]>([]);
  const CharacterProfileUrls = [
    "https://mygemini.s3.ap-northeast-2.amazonaws.com/gemini/pairchild/odri.png",
    "https://mygemini.s3.ap-northeast-2.amazonaws.com/gemini/pairchild/adol.png",
  ]; // 진짜 아리에스, 아돌 프로필사진 url을 담을것임. 클릭하는 이미지랑 다르니까.
  const [urlsToSendProfileImg, setUrlsToSendProfileImg] = useState<string>("");
  useEffect(() => {
    //일단 임시로 고정 url. adol이 안나옴. 이후에 axios로 get해서 가져오는걸로 변경.
    const tempUrls = [
      "https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81r9Md-AaVpurl3lRMJMfPKAFqgvYZsLB2HKcV27uFa231aukM05iYc7KZL1n82Y15sjE99n4dNHpyd-wR5Sg3wpZGfifg=w1920-h969",
      "https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81pJK8rg6uSAUf8akO_F3nDZNs6YPma5pG6f273VhvQMBuXKPxd84Vh7ZJ6ttAdnQ-dLtwC2Y-xs0jNAYTfvUzQwpRDr=w1920-h969",
    ];
    setCharacterUrls(tempUrls);
  }, []);

  const handleSubmit = async () => {
    console.log("제출");
    console.log(nickname);
    console.log(description);

    console.log("선택했는지? 이 다음이 true여야.");
    console.log(selectedCharacter);

    console.log("보낼 url");
    console.log(urlsToSendProfileImg);
    // 닉네임과 캐릭터 선택 여부 확인
    if (!validateNickname(nickname) || !selectedCharacter) {
      alert("닉네임과 캐릭터를 정확하게 선택해 주세요.");
      return;
    }

    console.log("검증통과");
    // axiosInstanceWithAccessToken을 사용한 POST 요청
    try {
      const response = await axiosInstanceWithAccessToken.post(
        "/user-service/profile/select-pairchild",
        {
          nickname,
          description,
          profile_img_url: urlsToSendProfileImg,
        }
      );

      if (response.status === 201) {
        alert("가입 완료!");
        // 가입 완료 후 로직 작성
        history.push("/loginSuccess");
      }
    } catch (error) {
      console.error("가입 실패:", error);
    }
  };

  const validateNickname = (inputNickname: string) => {
    // 닉네임 정규표현식 검증 코드 작성
    const regex = /^[가-힣A-Za-z0-9_\s]{2,20}$/; // 한글, 알파벳, 숫자, _, 공백 허용 2~15글자
    console.log("정규표현식 검증시작");
    console.log(regex.test(inputNickname));
    return regex.test(inputNickname);
  };

  return (
    <>
      <SelectPairchildWrapper>
        <InputWrapper>
          <NicknameLabel htmlFor="nickname">닉네임</NicknameLabel>
          <TextInput
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임은 2~15글자 한글, 영어, 숫자만 입력 가능합니다."
          />
        </InputWrapper>

        <InputWrapper>
          <FormLabel htmlFor="description">자기소개</FormLabel>
          <TextArea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={255}
          />
        </InputWrapper>

        <FormLabel htmlFor="description">기본 캐릭터 선택</FormLabel>

        <CharacterContainer>
          <CharacterImage
            src={characterUrls[0]}
            alt="Aries"
            isSelected={selectedCharacter === characterUrls[0]}
            onMouseEnter={() => setShowAriesName(true)}
            onMouseLeave={() => {
              if (selectedCharacter !== characterUrls[0]) {
                setShowAriesName(false);
              }
            }}
            onClick={() => {
              setSelectedCharacter(characterUrls[0]);
              setUrlsToSendProfileImg(CharacterProfileUrls[0]);
              setShowLeoName(false);
            }}
          />
          <PairchildName
            style={{ visibility: showAriesName ? "visible" : "hidden" }}
          >
            {"아리에스\n페어차일드"}
          </PairchildName>
          <CharacterImage
            src={characterUrls[1]}
            alt="Leo"
            isSelected={selectedCharacter === characterUrls[1]}
            onMouseEnter={() => setShowLeoName(true)}
            onMouseLeave={() => {
              if (selectedCharacter !== characterUrls[1]) {
                setShowLeoName(false);
              }
            }}
            onClick={() => {
              setSelectedCharacter(characterUrls[1]);
              setUrlsToSendProfileImg(CharacterProfileUrls[1]);
              setShowAriesName(false);
            }}
          />
          <PairchildName
            style={{ visibility: showLeoName ? "visible" : "hidden" }}
          >
            {"레오\n페어차일드"}
          </PairchildName>
        </CharacterContainer>

        <SubmitButton onClick={handleSubmit}>가입완료</SubmitButton>
      </SelectPairchildWrapper>
    </>
  );
};

export default SelectPairchildComp;
