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
  // Overlay,
} from "./SelectPairchildComp.styles";
import axiosInstanceWithAccessToken from "../../utils/AxiosInstanceWithAccessToken";
import { useHistory } from "react-router-dom";

const SelectPairchildComp: FC = () => {
  const history = useHistory();
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [characterUrls, setCharacterUrls] = useState<string[]>([]);

  useEffect(() => {
    //일단 임시로 고정 url. adol이 안나옴. 이후에 axios로 get해서 가져오는걸로 변경.
    const tempUrls = [
      "https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81r9Md-AaVpurl3lRMJMfPKAFqgvYZsLB2HKcV27uFa231aukM05iYc7KZL1n82Y15sjE99n4dNHpyd-wR5Sg3wpZGfifg=w1920-h969",
      "https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81pJK8rg6uSAUf8akO_F3nDZNs6YPma5pG6f273VhvQMBuXKPxd84Vh7ZJ6ttAdnQ-dLtwC2Y-xs0jNAYTfvUzQwpRDr=w1920-h969",
    ];
    setCharacterUrls(tempUrls);
  }, []);

  const handleSubmit = async () => {
    // 닉네임과 캐릭터 선택 여부 확인
    if (!validateNickname(nickname) || !selectedCharacter) {
      alert("닉네임과 캐릭터를 정확하게 선택해 주세요.");
      return;
    }

    // axiosInstanceWithAccessToken을 사용한 POST 요청
    try {
      const response = await axiosInstanceWithAccessToken.post(
        "/user-service/select-pairchild",
        {
          nickname,
          description,
          profile_img_url: selectedCharacter,
        }
      );

      if (response.status === 201) {
        alert("가입 완료!");
        // 가입 완료 후 로직 작성
        history.push("/");
      }
    } catch (error) {
      console.error("가입 실패:", error);
    }
  };

  const validateNickname = (inputNickname: string) => {
    // 닉네임 정규표현식 검증 코드 작성
    const regex = /^[가-힣A-Za-z0-9_]{2,15}$/;
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
            onClick={() => setSelectedCharacter(characterUrls[0])}
          />

          <CharacterImage
            src={characterUrls[1]}
            alt="Adol"
            isSelected={selectedCharacter === characterUrls[1]}
            onClick={() => setSelectedCharacter(characterUrls[1])}
          />
          {/* <CharacterImage
            backgroundImage={characterUrls[0]}
            // alt="Aries"
            isSelected={selectedCharacter === characterUrls[0]}
            onClick={() => setSelectedCharacter(characterUrls[0])}
          >
            <Overlay
              backgroundImage={characterUrls[0].replace(".png", "-mask.png")}
              isSelected={selectedCharacter === characterUrls[0]}
            />
          </CharacterImage>
          <CharacterImage
            backgroundImage={characterUrls[1]}
            // alt="Adol"
            isSelected={selectedCharacter === characterUrls[1]}
            onClick={() => setSelectedCharacter(characterUrls[1])}
          >
            <Overlay
              backgroundImage={characterUrls[1].replace(".png", "-mask.png")}
              isSelected={selectedCharacter === characterUrls[1]}
            />
          </CharacterImage> */}
        </CharacterContainer>
        <SubmitButton onClick={handleSubmit}>가입완료</SubmitButton>
      </SelectPairchildWrapper>
    </>
  );
};

export default SelectPairchildComp;
