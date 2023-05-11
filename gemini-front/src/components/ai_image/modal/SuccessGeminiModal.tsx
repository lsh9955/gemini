import React from "react";
import { Props as ParentProps } from "../modal/MakeGeminiModal";
import CompleteAiImage from "../../../assets/img/CompleteAiImage.png";

// styled-components
import {
  ModalContainer,
  Overlay,
  ModalForm,
  ModalBackground,
  OneConfirmButton,
  Interval,
  ModalTitle,
  First,
  SmallLetter,
} from "./ModalStyle";

interface SuccessGeminiModalProps extends ParentProps {
  onClose: () => void;
}

const SuccessGeminiModal: React.FC<SuccessGeminiModalProps> = ({ onClose }) => {
  return (
    <>
      <Overlay onClick={onClose} aria-hidden>
        <div aria-hidden onClick={(e) => e.stopPropagation()}>
          <ModalContainer>
            <ModalForm>
              <ModalTitle>
                <First>제미니가 당신을 만나러 옵니다</First>
                <SmallLetter>
                  제미니가 도착하면 알림을 통해 알려드립니다
                </SmallLetter>
              </ModalTitle>
              <Interval>
                <OneConfirmButton onClick={onClose}>확인</OneConfirmButton>
              </Interval>
            </ModalForm>
            <ModalBackground src={CompleteAiImage} alt="modal-background" />
          </ModalContainer>
        </div>
      </Overlay>
    </>
  );
};

export default SuccessGeminiModal;
