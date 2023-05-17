import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";

// styled-component
import { Button, Span, IconWrapper } from "../button/OpenPayModalButtonStyle";

interface Props {
  openPayModal: () => void;
}

const OpenPayModalButton: React.FC<Props> = ({ openPayModal }) => {
  return (
    <>
      <Button onClick={openPayModal}>
        <Span>별조각 구매하기</Span>
        <IconWrapper>
          {" "}
          <StarIcon></StarIcon>
        </IconWrapper>
      </Button>
      {/* {openPayModal && <PayModal onClose={closePayModal} />} */}
    </>
  );
};

export default OpenPayModalButton;
