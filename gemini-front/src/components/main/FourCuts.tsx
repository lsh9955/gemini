import React, { useEffect, useState } from "react";
import Adol1by1Dummy from "../../assets/img/Adol1by1Dummy.png";

//styled-components
import {
  Container,
  Image,
  MyGeminiText,
  ContainerWrapper,
} from "../main/FourCutsStyle";
import axiosInstanceWithAccessToken from "../../utils/AxiosInstanceWithAccessToken";
// forcuts 컴포넌트는 transform: "scaleY(-1)" 를 사용해서 다 뒤집어 놓기

interface Image {
  url: String;
}

interface FourCutsProps {
  backModal: () => void;
  emotions: string[];
}

const FourCuts: React.FC<FourCutsProps> = ({ backModal, emotions }) => {
  const [emotionCuts, setEmotionCuts] = useState<Image[]>([]);
  const handleClick = () => {
    backModal(); // 모달 닫기 함수 호출
  };
  useEffect(() => {
    axiosInstanceWithAccessToken.get("").then().catch();
    return;
  });
  // 나중에 get 받고 map해서 이미지 빼기
  return (
    <ContainerWrapper onClick={handleClick}>
      <MyGeminiText>MyGemini</MyGeminiText>
      <Container>
        <Image image={emotions ? emotions[0] : Adol1by1Dummy} />
        <Image image={emotions ? emotions[1] : Adol1by1Dummy} />
        <Image image={emotions ? emotions[2] : Adol1by1Dummy} />
        <Image image={emotions ? emotions[3] : Adol1by1Dummy} />
      </Container>
    </ContainerWrapper>
  );
};

export default FourCuts;
