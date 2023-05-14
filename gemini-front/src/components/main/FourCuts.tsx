import React from "react";
import Adol1by1Dummy from "../../assets/img/Adol1by1Dummy.png";

//styled-components
import { Container, Image } from "../main/FourCutsStyle";

const FourCuts: React.FC = () => {
  return (
    <>
      <Container>
        <Image image={Adol1by1Dummy} />
        <Image image={Adol1by1Dummy} />
        <Image image={Adol1by1Dummy} />
        <Image image={Adol1by1Dummy} />
      </Container>
      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>MyGemini</div>
    </>
  );
};

export default FourCuts;
