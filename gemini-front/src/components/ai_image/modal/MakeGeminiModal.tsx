import React from "react";
import CompleteAiImage from "../../../assets/img/CompleteAiImage.png";

// styled-components
import {
  ModalContainer,
  Overlay,
  ModalForm,
  ModalBackground,
  ConfirmButton,
  CancelButton,
} from "./ModalStyle";

interface Props {
  onClose: () => void;
}

const MakeGeminiModal: React.FC<Props> = ({ onClose }) => {
  return (
    <>
      <Overlay onClick={onClose} aria-hidden>
        <div aria-hidden onClick={(e) => e.stopPropagation()}>
          <ModalContainer>
            <ModalForm>
              <div>생성 시 별 1개가 차감됩니다</div>
              <div>결제하시겠어요?</div>
              <ConfirmButton>확인</ConfirmButton>
              <CancelButton>취소</CancelButton>
            </ModalForm>
            <ModalBackground src={CompleteAiImage} alt="modal-background" />
          </ModalContainer>
        </div>
      </Overlay>
    </>
  );
};

export default MakeGeminiModal;
