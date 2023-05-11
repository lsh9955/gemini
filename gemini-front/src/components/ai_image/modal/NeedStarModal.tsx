import React, { useState } from "react";
import CompleteAiImage from "../../../assets/img/CompleteAiImage.png";

// styled-components
import {
  ModalContainer,
  Overlay,
  ModalForm,
  ModalBackground,
  ConfirmButton,
  CancelButton,
  Interval,
  ModalTitle,
  First,
} from "./ModalStyle";
import PayModal from "../../profile/pay/modal/PayModal";
import { Props as ParentProps } from "../modal/MakeGeminiModal";
import NeedPayModal from "./NeedPayModal";

interface NeedStarModalProps extends ParentProps {
  onClose: () => void;
}

const NeedStarModal: React.FC<NeedStarModalProps> = ({ onClose }) => {
  const [currentModal, setCurrentModal] = useState<React.ReactNode>("");
  const PayStar = () => {
    setCurrentModal(<NeedPayModal onClose={onClose} />);
  };

  return (
    <>
      {!currentModal && (
        <Overlay onClick={onClose} aria-hidden>
          <div aria-hidden onClick={(e) => e.stopPropagation()}>
            <ModalContainer>
              <ModalForm>
                <ModalTitle>
                  <First>별조각이 부족합니다</First>
                  <div>충전하시겠어요?</div>
                </ModalTitle>
                <Interval>
                  <ConfirmButton onClick={PayStar}>확인</ConfirmButton>
                  <CancelButton onClick={onClose}>취소</CancelButton>
                </Interval>
              </ModalForm>
              <ModalBackground src={CompleteAiImage} alt="modal-background" />
            </ModalContainer>
          </div>
        </Overlay>
      )}
      {currentModal}
    </>
  );
};

export default NeedStarModal;
