import React, { FC, useState } from "react";
import {
  SelectPairchildWrapper,
  FormLabel,
  TextInput,
  TextArea,
  CharacterContainer,
  CharacterImage,
} from "./SelectPairchildComp.styles";

const SelectPairchildComp: FC = () => {
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("");

  const handleSubmit = async () => {
    // axios POST 요청을 보내는 코드 작성
  };

  const validateNickname = (inputNickname: string) => {
    // 닉네임 정규표현식 검증 코드 작성
    const regex = /^[가-힣A-Za-z0-9_]{2,15}$/;
    return regex.test(inputNickname);
  };

  return (
    <>
      <SelectPairchildWrapper>
        <FormLabel htmlFor="nickname">닉네임:</FormLabel>
        <TextInput
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <FormLabel htmlFor="description">자기소개:</FormLabel>
        <TextArea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={255}
        />

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
        {/* 나머지 코드... */}
      </SelectPairchildWrapper>
    </>
  );
};

export default SelectPairchildComp;
