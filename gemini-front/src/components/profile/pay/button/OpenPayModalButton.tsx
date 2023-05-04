import React, { useState } from "react";
import PayModal from "../modal/PayModal";

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
      <button onClick={openModal}>구매창 열기</button>
      {showModal && <PayModal onClose={closeModal} />}
    </>
  );
};

export default OpenPayModalButton;
