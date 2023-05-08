import React, { useState } from "react";
import PayModal from "../modal/PayModal";
import StarIcon from "@mui/icons-material/Star";

// styled-component
import { Button, Span, IconWrapper } from "../button/OpenPayModalButtonStyle";

const OpenPayModalButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button onClick={openModal}>
        <Span>별조각 구매하기</Span>
        <IconWrapper>
          {" "}
          <StarIcon></StarIcon>
        </IconWrapper>
      </Button>
      {showModal && <PayModal onClose={closeModal} />}
    </>
  );
};

export default OpenPayModalButton;
