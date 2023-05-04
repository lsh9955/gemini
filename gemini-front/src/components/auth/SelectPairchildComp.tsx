import React, { FC, useState } from "react";
import {
  SelectPairchildWrapper,
  FormLabel,
  TextInput,
  TextArea,
  InputWrapper,
  CharacterContainer,
  CharacterImage,
} from "./SelectPairchildComp.styles";
import axiosInstanceWithAccessToken from "../../utils/AxiosInstanceWithAccessToken";

const SelectPairchildComp: FC = () => {
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("");

  const handleSubmit = async () => {
    // 닉네임과 캐릭터 선택 여부 확인
    if (!validateNickname(nickname) || !selectedCharacter) {
      alert("닉네임과 캐릭터를 정확하게 선택해 주세요.");
      return;
    }

    // axiosInstanceWithAccessToken을 사용한 POST 요청
    try {
      const response = await axiosInstanceWithAccessToken.post(
        "/api/register",
        {
          nickname,
          description,
          character: selectedCharacter,
        }
      );

      if (response.status === 201) {
        alert("가입 완료!");
        // 가입 완료 후 로직 작성
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
          <FormLabel htmlFor="nickname">닉네임</FormLabel>

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

        <CharacterContainer>
          <CharacterImage
            src="character1.png"
            alt="아리에스"
            isSelected={selectedCharacter === "아리에스"}
            onClick={() => setSelectedCharacter("아리에스")}
          />
          <CharacterImage
            src="character2.png"
            alt="두번째 캐릭터"
            isSelected={selectedCharacter === "두번째 캐릭터"}
            onClick={() => setSelectedCharacter("두번째 캐릭터")}
          />
        </CharacterContainer>
        <button onClick={handleSubmit}>가입완료</button>
      </SelectPairchildWrapper>
    </>
  );
};

export default SelectPairchildComp;
