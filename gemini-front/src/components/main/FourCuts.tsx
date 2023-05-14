import React from "react";
import Adol1by1Dummy from "../../assets/img/Adol1by1Dummy.png";

//styled-components
import { Container, Image } from "../main/FourCutsStyle";

// forcuts 컴포넌트는 transform: "scaleY(-1)" 를 사용해서 다 뒤집어 놓기
const FourCuts: React.FC = () => {
  // 나중에 get 받고 map해서 이미지 빼기
  return (
    <>
      <div
        style={{
          textAlign: "center",
          marginBottom: "1rem",
          transform: "scaleY(-1)",
        }}
      >
        MyGemini
      </div>
      <Container>
        <Image image={Adol1by1Dummy} />
        <Image image={Adol1by1Dummy} />
        <Image image={Adol1by1Dummy} />
        <Image image={Adol1by1Dummy} />
      </Container>
    </>
  );
};

export default FourCuts;
