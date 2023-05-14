import React from "react";
import Adol1by1Dummy from "../../assets/img/Adol1by1Dummy.png";

//styled-components
import {
  Container,
  Image,
  MyGeminiText,
  ContainerWrapper,
} from "../main/FourCutsStyle";
// forcuts 컴포넌트는 transform: "scaleY(-1)" 를 사용해서 다 뒤집어 놓기
interface FourCutsProps {
  backModal: () => void;
}

const FourCuts: React.FC<FourCutsProps> = ({ backModal }) => {
  const handleClick = () => {
    backModal(); // 모달 닫기 함수 호출
  };
  // 나중에 get 받고 map해서 이미지 빼기
  return (
    <ContainerWrapper>
      <div onClick={handleClick}>
        <MyGeminiText onClick={handleClick}>MyGemini</MyGeminiText>
        <Container>
          <Image image={Adol1by1Dummy} />
          <Image image={Adol1by1Dummy} />
          <Image image={Adol1by1Dummy} />
          <Image image={Adol1by1Dummy} />
        </Container>
      </div>
    </ContainerWrapper>
  );
};

export default FourCuts;
